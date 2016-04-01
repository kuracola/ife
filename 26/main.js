window.onload=function(){
	
	/*	
	 *	JSON格式
	 *	{
			'cmd':'run'/'destroy'/'stop'
	 *	} 
	 *
	 *
	 *
	 */
	/*	
	 *	配置参数
	 */
	 var config={
		spacecraft:{
			flySpeed:1,
			energyConsumedPerSecond:0.25,
			energyChargedPerSecond:0.1,
		}
	 };
	
	/*	
	 *	global变量
	 */	 
	var cmd;
	var planet;
	var craftList=[];
	var speed;
	var trackRadius=[0,250,200,150];
	var nowID=0;
	

	/*	
	 *	飞船类定义
	 */
	function Craft(tracki){
		this.id=nowID++;
		this.track=tracki;
		this.energy= 100;
		this.state= 'stop';
		this.distanceByPx=0;
		this.distanceByDeg=0;
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
	}
	Craft.prototype.move=function(){
		if(this.state=='run' && this.energy>config.spacecraft.energyConsumedPerSecond)
		{
	
			this.distanceByPx+=config.spacecraft.flySpeed;
			this.distanceByDeg=(180*(this.distanceByPx/trackRadius[this.track]))/3.1415;
			this.energy-=config.spacecraft.energyConsumedPerSecond;
			
			this.spirit.style.webkitTransform='rotateZ('+this.distanceByDeg+'deg)';
			
		}
	};
	Craft.prototype.charge=function(){
		if(this.energy<100)
			this.energy+=config.spacecraft.energyChargedPerSecond;
	};
	Craft.prototype.destroy=function(){
		this.spirit.outerHTML='';
		this.ctrl.outerHTML='';
		var that = this;
		craftList = craftList.filter(function(item,index,array){
			return item.id!=that.id;
		});
		//console.log(craftList);
	
	};
	Craft.prototype.toggleState=function(){
		if(this.state='run')
		{
			this.state='stop';
		}
		else{
			this.state='run';
		}	
	}
	Craft.prototype.receiveMsg=function(json){
		var msg=JSON.parse(json);
		if(msg['ID']==this.id)
		{
			switch(msg['cmd']){
				case 'stop':
					this.state='stop';
					break;
				case 'run':
					this.state='run';
					break;
				case 'destroy':
					this.destroy();
					break;
				default:
					break;
			}
		}
		
	}
			
			
	/*	
	 * 指挥官类定义
	 */
	function Commander(){
		
	}
	Commander.prototype.PostMsg=function(msg){
		Mediator.prototype.put(JSON.stringify(msg));
	}
	/*	
	 *  信道类定义
	 */
	function Mediator(){
		
	}
	Mediator.prototype.put=function(json){
		var isFailed=(Math.random()>0.7);
		setTimeout(function(){document.getElementById('last-cmd').innerHTML='last command failed?---['+isFailed+']'},1000);
		if(!isFailed){
	
			setTimeout(function(){Mediator.prototype.out(json);},1000);
		}
	}
	Mediator.prototype.out=function(json){
		//数据到达各个飞船
		craftList.forEach(function(c){
			c.receiveMsg(json);
		});
	}

	/*	
	 *	初始化
	 */	
	function init(){
		document.getElementById('newCraft').onclick=function(){
			
			if(new RegExp("[1-3]").test(document.getElementById('NewCraftTrack').value))
			{	
				if(craftList.length<4)
					new Craft(document.getElementById('NewCraftTrack').value);
				else{
					console.log("飞船数量多于4个");
				}
			}else{
				console.log('请输入1-3的数字');
			}
		};
		
		setInterval(function(){tick();},50);
	}
	

	/*	
	 *	按时刷新数据
	 */	
	function tick(){
		
		craftList.forEach(function(craft){
			
			craft.move();
			craft.charge();
			craft.spirit.children[0].innerHTML=Math.round(craft.energy);
		});
	}

	init();
}