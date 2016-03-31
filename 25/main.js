window.onload=function(){
	var selected=undefined;
	var tree=document.getElementById('tree');
	function proc(div){
		div.setAttribute('open','false');
		div.innerHTML=div.attributes['con'].nodeValue+div.innerHTML;
		if(div.children.length!=0)
			div.innerHTML='<div class="image-box"></div>'+div.innerHTML;
		div.innerHTML='<div class="dot-line">--</div>'+div.innerHTML;
		
		div.onmouseover=function(e){e.stopPropagation();if(e.currentTarget.getAttribute('select')!='true'){e.currentTarget.style.background='pink';}};
		div.onmouseout=function(e){if(this.getAttribute('select')!='true'){this.style.background='transparent';}};
		div.onclick=function(e){
			if(e.target.className=='image-box')
				return;
			e.stopPropagation();
			if(e.target.getAttribute('select')!='true')
			{
				e.currentTarget.setAttribute('select','true');
				e.currentTarget.style.background='green';
				if(selected!=undefined){
					selected.style.background='transparent';
					selected.setAttribute('select','false');
				}
				selected=e.currentTarget;
			}
			else{
				e.currentTarget.setAttribute('select','false');
				e.currentTarget.style.background='transparent';
				selected=undefined;
			}
			
		};
	}
	function init(){
		[].forEach.call(tree.getElementsByClassName('index'),proc);
	}
	function render(){
		[].forEach.call(tree.getElementsByClassName('index'),function(div){
			if(div.attributes['open'].nodeValue=='false'){
				[].forEach.call(div.children,function(node){
					if(node.className=='index')
						node.style.display='none';
				});
			}
			else{
				[].forEach.call(div.children,function(node){
					if(node.className=='index')
						node.style.display='block';
				});
			}
		});
	
	}
	function imgIni(){
		var imageBoxes=document.getElementsByClassName('image-box');
		[].forEach.call(imageBoxes,function(div){
			div.style.background='url("./plus.jpg") 0% 50% / 20px 20px no-repeat';
			div.onclick=function(){
				
				if(div.parentNode.getAttribute('open')=='false')
				{
					div.style.background='url("./minus.jpg") 0% 50% / 20px 20px no-repeat';
					div.parentNode.attributes['open'].nodeValue='true';
					render();
				}
				else{
					div.style.background='url("./plus.jpg") 0% 50% / 20px 20px no-repeat';
					div.parentNode.attributes['open'].nodeValue='false';
					render();
				}
			};
		});
	}
	init()
	imgIni();
	render();	

	document.getElementById('del').onclick=function(){
		selected.outerHTML='';
	}
	document.getElementById('add').onclick=function(){
		var newNode =document.createElement('div');
		newNode.className='index';
		newNode.setAttribute('con',	document.getElementById('add-input').value);
		proc(newNode);
		selected.appendChild(newNode);		
	}
};

