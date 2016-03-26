window.onload=function(){
	var strList=[];
	
	function leftIn(){
		if(document.getElementById('num-input').value.length==0)
			return;
		var text=document.getElementById('num-input').value;
		var list=text.replace(/[^\d\u4e00-\u9fa5a-zA-Z]+/g," ").split(" ");
		list.reverse();
		list.forEach(function(e){strList.unshift(e);});
		render();
	}
	function rightIn(){
		if(document.getElementById('num-input').value.length==0)
			return;
		var text=document.getElementById('num-input').value;
		var list=text.replace(/[^\d\u4e00-\u9fa5a-zA-Z]+/g," ").split(" ");
		list.forEach(function(e){strList.push(e);});
		render();
	}
	function leftOut(){
		alert(strList.shift());
		render();
	}
	function rightOut(){
		alert(strList.pop());
		render();
	}
	function clickHandler(e){
		
		if(e.target.nodeName=='DIV')
		{
			console.log(2);
			 strList.splice(e.target.index,1);
			 render();
		}
	}
	function check(){
		var reg=new RegExp(document.getElementById('keyword-input').value+'+');
		[].forEach.call(document.getElementsByClassName('queue-wrap')[0].childNodes,function(div){
			if(reg.test(div.innerHTML))
				div.style.background='green';
		});
	}
	function render(){
		var canvas= document.getElementsByClassName('queue-wrap')[0];
		var node='';
		for(var i=0;i<strList.length;i++){
			node+="<div index="+i+", class='block'>"+strList[i]+"</div>";
		}
		canvas.innerHTML=node;
	}
	document.getElementById('left-in').onclick=leftIn;
	document.getElementById('right-in').onclick=rightIn;
	document.getElementById('left-out').onclick=leftOut;
	document.getElementById('right-out').onclick=rightOut;
	document.getElementById('check').onclick=check;
	document.getElementsByClassName('queue-wrap')[0].onclick=clickHandler;
	
	
};