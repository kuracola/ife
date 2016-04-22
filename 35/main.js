


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
		block.setAttribute('posX',((x+parseInt(block.getAttribute('posX')))>=600||(x+parseInt(block.getAttribute('posX')))<=0)?parseInt(block.getAttribute('posX')):x+parseInt(block.getAttribute('posX')));
		block.setAttribute('posY',((y+parseInt(block.getAttribute('posY')))>=600||(y+parseInt(block.getAttribute('posY')))<=0)?parseInt(block.getAttribute('posY')):y+parseInt(block.getAttribute('posY')));
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
		if(cmd=='GO')
			return true;
		if(params.length>3)
			return false;
		if(params.length==2){
			if(params[0]=='GO')
				if(params[1]>0 )
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
				if(params[0]!='GO')
					CMDswitcher(cmd);
				if(params[0]=='GO')
					for(var i=0;i<params[1];i++){
						CMDswitcher(params[0]);
					}
			}
			if(params.length==3)
				for(var i=0;i<params[2];i++){
					CMDswitcher(params[0]+' '+params[1]);
				}
			CMDswitcher(params[0]);
		}
		
		function CMDswitcher(cmd){
			var block = document.getElementsByClassName('block')[0];
			switch(cmd){
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
					var x= block.getAttribute('dir')==90?60:block.getAttribute('dir')==270?-60:0;
					var y= block.getAttribute('dir')==0?-60:block.getAttribute('dir')==180?60:0;
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