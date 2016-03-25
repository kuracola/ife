window.onload=function(){
	var numQueue=[];
	function leftIn(){
		if(document.getElementById('num-input').value.length==0)
			return;
		numQueue.unshift(document.getElementById('num-input').value);
		render();
	}
	function rightIn(){
		if(document.getElementById('num-input').value.length==0)
			return;
		numQueue.push(document.getElementById('num-input').value);
		render();
	}
	function leftOut(){
		alert(numQueue.shift());
		render();
	}
	function rightOut(){
		alert(numQueue.pop());
		render();
	}
	function clickHandler(e){
		
		if(e.target.nodeName=='DIV')
		{
			console.log(2);
			 numQueue.splice(e.target.index,1);
			 render();
		}
	}
	function render(){
		var canvas= document.getElementsByClassName('queue-wrap')[0];
		var node='';
		for(var i=0;i<numQueue.length;i++){
			node+="<div index="+i+", class='block'>"+numQueue[i]+"</div>";
		}
		canvas.innerHTML=node;
	}
	document.getElementById('left-in').onclick=leftIn;
	document.getElementById('right-in').onclick=rightIn;
	document.getElementById('left-out').onclick=leftOut;
	document.getElementById('right-out').onclick=rightOut;
	document.getElementsByClassName('queue-wrap')[0].onclick=clickHandler;
	
	
};