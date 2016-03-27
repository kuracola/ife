window.onload=function(){
	var taglist=[];
	var likelist=[];
	function render(){
		document.getElementsByClassName('tag-view')[0].innerHTML='';
		for(var i=0;i<taglist.length;i++){
			var text = document.createTextNode(taglist[i]);
			var box = document.createElement('div');
			box.appendChild(text);
			box.className='block';
			box.onmouseover=delBlock1;
			box.onmouseout=delBlock2;
			box.onclick=delBlockTrue;
			document.getElementsByClassName('tag-view')[0].appendChild(box);
			
		}
	}
	function newTag(value){
		for(var i=0;i<taglist.length;i++)
		{
			if(taglist[i]==value)
			{
				return ;
			}
			
		}
		if(taglist.length<=10){
			taglist.push(value);
		}else{
			taglist.shift();
			taglist.push(value);
		}
		render();

	}
	function keydownHandler(e){
		if(e.keyCode==13 || e.keyCode==188 ||e.keyCode==32){
			newTag(e.target.value);
			e.target.value='';
			e.preventDefault();
		}
	}
	function delBlock1(e){
		e.target.innerHTML='点击删除'+e.target.innerHTML;
		e.target.style.background='green';
	}
	function delBlock2(e){
		e.target.innerHTML=e.target.innerHTML.slice(4);
		e.target.style.background='pink';
	}
	function delBlockTrue(e){
		for(var i=0;i<taglist.length;i++){
			if(taglist[i]==e.target.innerHTML.slice(4))
				taglist.splice(i,1);
		}
		e.target.outerHTML='';
	}
	function delBlockTrue2(e){
		for(var i=0;i<likelist.length;i++){
			if(likelist[i]==e.target.innerHTML.slice(4))
				likelist.splice(i,1);
		}
		e.target.outerHTML='';
	}
	function render2(){
		document.getElementsByClassName('likes-view')[0].innerHTML='';
		for(var i=0;i<likelist.length;i++){
			var text = document.createTextNode(likelist[i]);
			var box = document.createElement('div');
			box.appendChild(text);
			box.className='block';
			box.onmouseover=delBlock1;
			box.onmouseout=delBlock2;
			box.onclick=delBlockTrue2;
			document.getElementsByClassName('likes-view')[0].appendChild(box);
			
		}
	}
	function newLike(value){
		for(var i=0;i<likelist.length;i++)
		{
			if(likelist[i]==value)
			{
				return ;
			}
		}
		if(likelist.length<=10){
			likelist.push(value);
		}else{
			likelist.shift();
			likelist.push(value);
		}
	

	}
	function addLike(){
		var txt=document.getElementById('likes').value;
		var list=txt.replace(/[^\d\u4e00-\u9fa5a-zA-Z]+/g," ").split(' ');
		for(var i=0;i<list.length;i++){
			newLike(list[i]);
	
		}
		render2();
		
	}
	document.getElementById('tag-input').onkeydown=keydownHandler;
	document.getElementById('add-btn').onclick=addLike;
	
};