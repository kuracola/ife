


window.onload=function(){
	for(var i=1;i<11;i++){
		var newLine = document.createElement('div');
		newLine.className='line-X';
		newLine.style.top=i*60+'px';
		document.getElementsByClassName('border')[0].appendChild(newLine);
		var newAxis = document.createElement('div');
		newAxis.className='axis-X';
		newAxis.innerHTML=i;
		newAxis.style.left=i*60+'px';
		document.getElementsByClassName('axis')[0].appendChild(newAxis);
	}
	for(var i=1;i<11;i++){
		var newLine = document.createElement('div');
		newLine.className='line-Y';
		newLine.style.left=i*60+'px';
		document.getElementsByClassName('border')[0].appendChild(newLine);
		var newAxis = document.createElement('div');
		newAxis.className='axis-Y';
		newAxis.innerHTML=i;
		newAxis.style.top=i*60+'px';
		document.getElementsByClassName('axis')[0].appendChild(newAxis);
	}
	function changeDIR(deg){
		var block = document.getElementsByClassName('block')[0];
		block.setAttribute('dir',(parseInt(block.getAttribute('dir'))+deg));
		block.style.transform='translate('+block.getAttribute('posX')+'px,'+block.getAttribute('posY')+'px) rotate('+block.getAttribute('dir')+"deg)";
	}
	function changeDIRto(deg){
		var block = document.getElementsByClassName('block')[0];
		var nowDEG=parseInt(block.getAttribute('dir'));
		var base = Math.floor(nowDEG/360.0);
		block.setAttribute('dir',base*360+deg);
		block.style.transform='translate('+block.getAttribute('posX')+'px,'+block.getAttribute('posY')+'px) rotate('+block.getAttribute('dir')+"deg)";
	}
	function changePOS(x,y){

		var block = document.getElementsByClassName('block')[0];
		var destX=((x+parseInt(block.getAttribute('posX')))>=600||(x+parseInt(block.getAttribute('posX')))<=0)?parseInt(block.getAttribute('posX')):x+parseInt(block.getAttribute('posX'));
		var destY=((y+parseInt(block.getAttribute('posY')))>=600||(y+parseInt(block.getAttribute('posY')))<=0)?parseInt(block.getAttribute('posY')):y+parseInt(block.getAttribute('posY'));
		console.log(destX);
		console.log(destY);
		if(wallMap[destX/60][destY/60]!=undefined)
		{
			console.log('ERR 05:所移动的位置有墙');
			return;
		}		
		block.setAttribute('posX',destX);
		block.setAttribute('posY',destY);
		block.style.transform='translate('+block.getAttribute('posX')+'px,'+block.getAttribute('posY')+'px) rotate('+block.getAttribute('dir')+"deg)";
	}
	document.getElementById('cli').onscroll=function(e){	
		document.getElementById('lineNumber').scrollTop=e.target.scrollTop;
	};
	document.getElementById('cli').onkeydown=function(e){	

		setTimeout(genNum,10);
	};
	function genNum(){
			var str=document.getElementById('cli').value;
			var cmds=str.split('\n');
			var lineCount=cmds.length;
			var lis='';
			for(var i=0;i<lineCount;i++){
				
				if(checkCMD(cmds[i]))
					lis+='<li></li>';
				else
					lis+='<li class="wrong"></li>'
			}
			document.getElementById('number').innerHTML=lis;
	}
	
	var ValidCMD1={'MOVE':1,'TRA':2,'TUN':3};
	var ValidCMD2={'TOP':1,'BOT':2,'LEF':3,'RIG':4};
	function checkCMD(cmd){
		var params=cmd.split(' ');
		if(cmd=='GO' ||cmd=='BUILD' || params[0]=='BRU')
			return true;
		if(params.length>3)
			return false;
		if(params.length==2){
			if(params[0]=='GO')
				if(params[1]>0 )
					return true;
			if(cmd=='TUN BAC')
				return true;
			if(ValidCMD1[params[0]]>0)
				if(ValidCMD2[params[1]]>0)
					return true;
			return false;
		}
		if(params.length==3){
			if(ValidCMD1[params[0]]>0)
				if(ValidCMD2[params[1]]>0)
					if(params[2]>0)
						return true;
			
			return false;
		}
		return false;
	}
	var wallMap=[];
	for(var i =0;i<10;i++)
		wallMap[i]=new Array(10);
	function getOppAxis(){
		var block = document.getElementsByClassName('block')[0];
		var x=parseInt(block.getAttribute('posX'));
		var y=parseInt(block.getAttribute('posY'));
		var offsetX=block.getAttribute('dir')%360==90?60:block.getAttribute('dir')%360==270?-60:0;
		var offsetY=block.getAttribute('dir')%360==0?-60:block.getAttribute('dir')%360==180?60:0;	
		x=x+offsetX;
		y=y+offsetY;
		x=x/60;
		y=y/60;
		return [x,y];
	}
	function paintWall(color){
		var x=getOppAxis()[0];
		var y=getOppAxis()[1];
		if( x>=0&& x<=9 && y>=0 && y<=9){
			if(wallMap[x][y]==undefined)
			{
				console.log('ERR 04:指定粉刷的位置没有墙')
			}
			else{
				wallMap[x][y].style.background=color;
			}
		}
		else{
			console.log('ERR 03:指定粉刷的位置超过边界');
		}
		
	}
	function genWall(){
		for(var i=0;i<20;i++){
			var wall=document.createElement('div');
			wall.className='wall';
	
			var x=Math.floor(Math.random()*10);
			var y=Math.floor(Math.random()*10);
			if(x== document.getElementsByClassName('block')[0].getAttribute('posX')&&y== document.getElementsByClassName('block')[0].getAttribute('posY'))
				break;
			wall.style.left=x*60+'px';
			wall.style.top=y*60+'px';
			wallMap[x][y]=wall;
			document.getElementsByClassName('border')[0].appendChild(wall);
		}
	}
	function buildWall(){
		var x=getOppAxis()[0];
		var y=getOppAxis()[1];
		if( x>=0&& x<=9 && y>=0 && y<=9){
			var wall=document.createElement('div');
			wall.className='wall';
			wall.style.left=x*60+'px';
			wall.style.top=y*60+'px';
			if(wallMap[x]==undefined)
				wallMap[x]=[];
			if(wallMap[x][y]!=undefined)
			{
				console.log('ERR 01:指定修墙的位置已经有墙');
				return;
			}
			wallMap[x][y]=wall;
			document.getElementsByClassName('border')[0].appendChild(wall);
		}
		else{
			console.log('ERR 02:指定修墙的位置超过边界墙');
		}
	};
	var path=[];
	function isOpen(x,y){
		if( x>=0&& x<=9 && y>=0 && y<=9){
			if(wallMap[x][y]!=undefined)
				return true;
		}
		return false;
	}
	function childPath(range){
		var son=[];
		
	}
	function moveTO(dstX,dstY){
		var block = document.getElementsByClassName('block')[0];
		var x=block.getAttribute('posX');
		var y=block.getAttribute('posY');
		var range=[[x,y-1],[x+1,y],[x,y+1].[x-1,y]];
		
		
		

	}
	document.getElementById('genWall').onclick=genWall;
	document.getElementById('command').onclick=function(e){
		var cmd=document.getElementById('cli').value;	
		var cmds=cmd.split('\n');
	
		var time=0;
		cmds.forEach(function(cmd){
			setTimeout(function(){
				doCMD(cmd);
			},time+=500);
		});
		
		function doCMD(cmd){
			var params=cmd.split(' ');
		
			if(params.length==2)
			{
				if(params[0]=='BRU')
					CMDswitcher(params[0],params[1]);
				if(params[0]=='GO')
					for(var i=0;i<params[1];i++){
						CMDswitcher(params[0]);
					}	
				CMDswitcher(cmd);
				return;
			}
			if(params.length==3)
			{
				for(var i=0;i<params[2];i++){
					CMDswitcher(params[0]+' '+params[1]);
				}
				return;
			}
				
			CMDswitcher(params[0]);
		}
		
		function CMDswitcher(cmd,param1){
			var block = document.getElementsByClassName('block')[0];
			switch(cmd){
				case 'BRU':{
					paintWall(param1);
					}
					break;
				case 'BUILD':{
					buildWall();
					}	
					break;
				case 'TRA LEF':
					var x= -60;
					var y= 0;
					changePOS(x,y);
					break;
				case 'TRA TOP':
					var x= 0;
					var y= -60;
					changePOS(x,y);
					break;
				case 'TRA RIG':
					var x= 60;
					var y= 0;
					changePOS(x,y);
					break;
				case 'TRA BOT':
					var x= 0;
					var y= 60;
					changePOS(x,y);
					break;
				case 'GO':
					var x= block.getAttribute('dir')%360==90?60:block.getAttribute('dir')%360==270?-60:0;
					var y= block.getAttribute('dir')%360==0?-60:block.getAttribute('dir')%360==180?60:0;
					changePOS(x,y);
					break;
				case 'TUN LEF':
					changeDIR(-90);
					break;
				case 'TUN RIG':
					changeDIR(90);
					break;
				case 'TUN BAC':
					changeDIR(180);
					break;
				case 'MOVE LEF':
					changeDIRto(270);
					changePOS(-60,0);
					break;
				case 'MOVE TOP':
					changeDIRto(0);
					changePOS(0,-60);
					break;
				case 'MOVE RIG':
					changeDIRto(90);
					changePOS(60,0);
					break;
				case 'MOVE BOT':
					changeDIRto(180);
					changePOS(0,60);
					break;				
				default:
					break;
			}
		}
		
	}
};