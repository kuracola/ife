


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
	
	document.getElementById('command').onclick=function(e){
		var cmd=e.target.previousElementSibling.value;
		var block = document.getElementsByClassName('block')[0];
		
		switch(cmd){
			case 'GO':
			var x= block.getAttribute('dir')==90?60:block.getAttribute('dir')==270?-60:0;
			var y= block.getAttribute('dir')==0?-60:block.getAttribute('dir')==180?60:0;
			block.setAttribute('posX',((x+parseInt(block.getAttribute('posX')))>=600||(x+parseInt(block.getAttribute('posX')))<=0)?parseInt(block.getAttribute('posX')):x+parseInt(block.getAttribute('posX')));
			block.setAttribute('posY',((y+parseInt(block.getAttribute('posY')))>=600||(y+parseInt(block.getAttribute('posY')))<=0)?parseInt(block.getAttribute('posY')):y+parseInt(block.getAttribute('posY')));
			block.style.transform='translate('+block.getAttribute('posX')+'px,'+block.getAttribute('posY')+'px) rotate('+block.getAttribute('dir')+"deg)";
			break;
			case 'TUN LEF':
			block.setAttribute('dir',(block.getAttribute('dir')-90)%360);
			block.style.transform='translate('+block.getAttribute('posX')+'px,'+block.getAttribute('posY')+'px) rotate('+block.getAttribute('dir')+"deg)";
			break;
			case 'TUN RIG':
			block.setAttribute('dir',(block.getAttribute('dir')+90)%360);
			block.style.transform='translate('+block.getAttribute('posX')+'px,'+block.getAttribute('posY')+'px) rotate('+block.getAttribute('dir')+"deg)";
			break;
			case 'TUN BAC':
			block.setAttribute('dir',(block.getAttribute('dir')+180)%360);
			block.style.transform='translate('+block.getAttribute('posX')+'px,'+block.getAttribute('posY')+'px) rotate('+block.getAttribute('dir')+"deg)";
			
			break;
			default:
			break;
		}
	}
};