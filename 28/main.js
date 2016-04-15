window.onload=function(){
	
	/*	
	 *	JSON格式
	 *	{
	 *		'ID':0;
	 *		'cmd':'run'/'destroy'/'stop';
	 *	} 
	 *
	 */
	 
	/*	
	 *	配置参数
	 */
	 var config={
		spacecraft:{
			flySpeed:[1,2,3],
			energyConsumedPerSecond:[0.25,0.5,0.75],
			energyChargedPerSecond:[0.1,0.2,0.3],
		}
	 };
	/*	
	 *	日志输出函数
	 */
	function log(txt){
		document.getElementsByClassName('log')[0].innerHTML+='<p> >'+txt+'</p>';
		document.getElementsByClassName('log')[0].scrollTop = 	document.getElementsByClassName('log')[0].scrollHeight;
	}
	/*	
	 *	global变量
	 */	 

	var craftList=[];
	var trackRadius=[0,250,200,150];
	
	/*	
	 *	飞船类定义
	 */
	function Craft(tracki,enginei,poweri){
		//分配目前最小的非占用id
		for(var i=0;i<4;i++)
		{
			var f=1;
			craftList.forEach(function(c){
				if(c.id==i)
				{
					f=0;
				}
			});
			if(f==1)
			{
				this.id=i;
				break;
			}
			
		}
		this.track=tracki;
		this.energy= 100;
		this.stat= 'stop';
		this.distanceByPx=0;
		this.distanceByDeg=0;
		this.engine=enginei;
		this.power=poweri;
		this.adapter=new Adapter_for_Bus(this);
	
		//创建spirit
		var ele=document.createElement('div');
		ele.innerHTML='<div>'+this.energy+'</div>';
		ele.className='craft';
		document.getElementsByClassName('circle'+tracki)[0].appendChild(ele);
		this.spirit=ele;
		craftList.push(this);
		//创建控制面板单元 
		var controller = document.createElement('div');
		controller.innerHTML="Do somthing to spaceCraft "+this.id+" <button>Stop</button> <button>Run</button><button>Destroy</button> <br/>";
		var that=this;
		controller.getElementsByTagName('button')[0].onclick=function(){Commander.prototype.PostMsg({ID:that.id,cmd:'stop'});};
		controller.getElementsByTagName('button')[1].onclick=function(){Commander.prototype.PostMsg({ID:that.id,cmd:'run'});};
		controller.getElementsByTagName('button')[2].onclick=function(){Commander.prototype.PostMsg({ID:that.id,cmd:'destroy'});};
		document.getElementsByClassName('cmd')[0].appendChild(controller);
		this.ctrl=controller;
		//创建监视器
		var monitor= document.createElement('tr');
		monitor.id='sp'+this.id;
		monitor.innerHTML='<td>'+this.id+'</td><td>'+this.engine+'</td><td>'+this.power+'</td><td>'+this.stat+'</td><td>'+this.energy+'</td>';
		//console.log(monitor);
		document.getElementsByClassName('monitor')[0].getElementsByTagName('table')[0].appendChild(monitor);
		this.monit=monitor;
		log('spacecraft['+this.id+'] was created');
	
	}
	Craft.prototype.move=function(){
		if(this.stat=='run' && this.energy>config.spacecraft.energyConsumedPerSecond[this.engine])
		{
	
			this.distanceByPx+=config.spacecraft.flySpeed[this.engine];
			this.distanceByDeg=(180*(this.distanceByPx/trackRadius[this.track]))/3.1415;
			this.energy-=config.spacecraft.energyConsumedPerSecond[this.engine];
			this.spirit.style.webkitTransform='rotateZ('+this.distanceByDeg+'deg)';
		
		}
	};
	Craft.prototype.charge=function(){
		if(this.energy<100)
			this.energy+=config.spacecraft.energyChargedPerSecond[this.power];
	};
	Craft.prototype.destroy=function(){
		this.spirit.outerHTML='';
		this.ctrl.outerHTML='';
		this.monit.outerHTML='';
		var that = this;
		craftList = craftList.filter(function(item,index,array){
			return item.id!=that.id;
		});
	};
	Craft.prototype.togglestat=function(){
		if(this.stat='run')
		{
			this.stat='stop';
		}
		else{
			this.stat='run';
		}	
	};
	function Adapter_for_Bus(own){
		this.owner=own;
		this.sessions={};
	}
	Adapter_for_Bus.prototype.rawSend=function(content){
		Channel.prototype.put(content);
	}
	Adapter_for_Bus.prototype.receiveMsg=function(baseSignal){
		
		var msg=BaseBand_Bus.prototype.deParse(baseSignal);
			if(baseSignal.length==8 && msg.ID == this.owner.id)
			{
				this.owner.adapter.rawSend('1111'+baseSignal.substring(0,4)+'11');
				log('!Command ['+msg['cmd']+'] is received by spacecraft ['+msg['ID']+']'	);
				switch(msg['cmd']){
					case 'stop':
						this.owner.stat='stop';
						break;
					case 'run':
						this.owner.stat='run';
						break;
					case 'destroy':
						this.owner.destroy();
						break;
					default:
						break;
				}
			}
			if(baseSignal.length==10 && msg.ID == this.owner.id){
				
				log('Ack from SpaceCraft'+msg.src+' is received. Stop sending.');
				//停止发送
				console.log(this);
				console.log(this.sessions);
				clearInterval(this.sessions[baseSignal.substring(4,8)]);
			}
			
			if(baseSignal.length==16 && this.owner.id==1111 ){
				this.owner.refresh(msg);
			}

	};
	Adapter_for_Bus.prototype.sendStat=function(){
		var json={'ID':this.owner.id,'stat':this.owner.stat,'energy':Math.round(this.owner.energy)};
		Channel.prototype.put(BaseBand_Bus.prototype.parse(json));
	};		
	Adapter_for_Bus.prototype.sendCMD=function(msg){
		//var json={'ID':id,'cmd':cmd};
		var baseSignal=BaseBand_Bus.prototype.parse(msg);
		
		this.sessions[baseSignal.substring(0,4)]=setInterval(function(){Channel.prototype.put(BaseBand_Bus.prototype.parse(msg));console.log('channel put');},700);
		console.log(this);
		console.log(this.sessions);
	}
	/*	
	 * 指挥官类定义
	 */
	function Commander(){
		this.id=1111;
		this.adapter=new Adapter_for_Bus(this);
		
		
	}
	commander=new Commander();
	Commander.prototype.refresh=function(json){
	
		document.getElementById('sp'+json['ID']).innerHTML='<td>'+json['ID']+'</td><td>'+craftList[json['ID']].engine+'</td><td>'+craftList[json['ID']].power+'</td><td>'+json['stat']+'</td><td>'+json['energy']+'</td>';
	}
	Commander.prototype.PostMsg=function(msg){
		log('!Command ['+msg['cmd']+'] is given by commander, target is spaceCraft['+msg['ID']+']'	);
		commander.adapter.sendCMD(msg);
		//var t=setTimeout(function(){commander.adapter.prototype.sendCMD(msg);},400);
		
		//Mediator.prototype.put(msg,BaseBand_Bus);
	};
	Commander.prototype.receiveMsg=function(msg){
		
	}
	//基带信号
	function BaseBand_Bus(){
		
	}
	BaseBand_Bus.prototype.parse=function(json){
	
		if(Object.keys(json).length==2 && json['ID']!=undefined && json['cmd'])
		{
			
			var base=(1<<json['ID']).toString(2);
			
			while(base.length<4){
				base='0'+base;
			}
			switch(json['cmd']){
				case 'stop':
				base+='0010';
				break;
				case 'run':
				base+='0001';
				break;
				case 'destroy':
				base+='1100';
				break;
				default:
				break;
			}
			return base;
		}
		if(Object.keys(json).length==3 && json['ID']!=undefined &&json['stat'] && json['energy']!=undefined){
			var idString= (1<<json['ID']).toString(2);
			while(idString.length<4){
				idString='0'+idString;
			}
				
			var statString='';
			switch(json['stat']){
				case 'stop':
				statString='0010';
				break;
				case 'run':
				statString='0001';
				break;
				case 'destroy':
				statString='1100';
				break;
				default:
				break;
			}
			
			var energyString = (Math.round(json['energy'])).toString(2);
			while(energyString.length<8){
				energyString='0'+energyString;
			}
			var baseSignal=idString+statString+energyString;
			return baseSignal;
		}
		if(Object.keys(json).length==2 && json['ID']!=undefined && json['ACK']=='OK')
		{
			var idString= (1<<json['ID']).toString();
			while(idString.length<4){
				idString='0'+idString;
			}			
			var baseSignal=idString+'11';
			
			return	baseSignal;
		}
	};
	BaseBand_Bus.prototype.deParse=function(baseSignal){
		
		if(baseSignal.length==8){
			var id=0;
			while( baseSignal.charAt(3-id)=='0')
			{
				id++;
			}
		
			var cmd=baseSignal.substring(4,8);
			switch(cmd){
				case '0010':
				cmd='stop';
				break;
				case '0001':
				cmd='run';
				break;
				case '1100':
				cmd='destroy';
				break;
				default:
				break;
			}
			return {'ID':id,'cmd':cmd};			
		}
		if(baseSignal.length==10){
			var id=0;
			while( baseSignal.substring(4,8).charAt(3-id)=='0')
			{
				id++;
			}
			
			var ack=baseSignal.substring(8,10);
			switch(ack){
				case '11':
				ack='OK';
				break;
				default:
				break;
			}
			return {'ID':1111,'src':id,'ack':ack};			
		}
		if(baseSignal.length==16){
			var id=0;
			while( baseSignal.charAt(3-id)=='0')
			{
				id++;
			}
			var stat=baseSignal.substring(4,8);
			switch(stat){
				case '0010':
				stat='stop';
				break;
				case '0001':
				stat='run';
				break;
				case '1100':
				stat='destroy';
				break;
				default:
				break;
			}
			return {'ID':id,'stat':stat,'energy':parseInt(baseSignal.substring(8,16),2)};			
		}
	};
	/*	
	 *  信道传输
	 */
	function Channel(){
		
			
	}
	Channel.prototype.put=function(base){
		var isFailed=(Math.random()>0.9);
		
		if(!isFailed){
			
			setTimeout(function(){Channel.prototype.out(base);},300);
			
		}
		// else{
			// Channel.prototype.put(base);
		// }
		//else{
			//setTimeout(function(){log('-channel transition failed,resending');},300);
			//Channel.prototype.put(base);
		//}
	}
	Channel.prototype.out=function(baseSignal){
		//log('-signal went through channel successfully!');
		craftList.forEach(function(c){
			
			//log('-New Msg. Adapter is dealing with baseBand signal');
			c.adapter.receiveMsg(baseSignal);
		});
		commander.adapter.receiveMsg(baseSignal);
	}
	/*	
	 *  通信抽象接口 Mediator:
				
			Commander   				do command
				|		  					|
			baseBand	baseBand ->spaceCraft.adapter (Adapter_for_Bus
				|		  |	
				->Channel->
	 */
	// function Mediator(){
		
	// }
	// Mediator.prototype.put=function(json,baseBand){
		// var base = baseBand.prototype.parse(json);
		// log('-BaseBand signal generated，now into channel');
		// Channel.prototype.put(base);
	// }
	// Mediator.prototype.out=function(base,adapter){

	// };

	/*	
	 *	初始化
	 */	
	function init(){
		document.getElementById('newCraft').onclick=function(){
			
			if(new RegExp("[1-3]").test(document.getElementById('NewCraftTrack').value))
			{	
				if(craftList.length<4 && new RegExp("[0-2]").test(document.getElementById('NewCraftEngine').value) && new RegExp("[0-2]").test(document.getElementById('NewCraftPower').value))
					new Craft(document.getElementById('NewCraftTrack').value,document.getElementById('NewCraftEngine').value,document.getElementById('NewCraftPower').value);
				else{
					log("#Incorrect input");
				}
			}else{
				console.log('Incorrect input');
			}
			
		};
		setInterval(function(){tick();},50);
	}
	/*	
	 *	按时刷新数据
	 */	
	function tick(){
		craftList.forEach(function(craft){
			craft.adapter.sendStat();
			craft.move();
			craft.charge();
			craft.spirit.children[0].innerHTML=Math.round(craft.energy);
		});
	}

	init();
}