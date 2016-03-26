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
	function generate(){
		numQueue=[];
		var len= Math.round(Math.random()*30);
		if(len<10){
			generate();
			return;
		}
		for(var i=0;i<len;i++){
			numQueue[i]=10+Math.round(Math.random()*90);
		}
		
		render();
		
	}
	function render(){
		var canvas= document.getElementsByClassName('queue-wrap')[0];
		var node='';
		for(var i=0;i<numQueue.length;i++){
			node+="<div index="+i+", class='block'>"+numQueue[i]+"</div>";
		}
		canvas.innerHTML=node;
		document.getElementsByClassName('chart-wrap')[0].innerHTML='';
		for(var i=0;i<numQueue.length;i++){
			var stripe=document.createElement('div');
			stripe.style.height=2*numQueue[i]+'px';
			stripe.style.width='30px';
			stripe.innerHTML=numQueue[i];
			stripe.color='white';
			stripe.style.marginLeft='2px';
			//stripe.style.background='#'+(Math.random() * 0xffffff<<0).toString(16);
			stripe.style.background='pink';
			document.getElementsByClassName('chart-wrap')[0].appendChild(stripe);
		}
	}
	function compareTwo(i1,i2){
		[].forEach.call(document.getElementsByClassName('chart-wrap')[0].childNodes,function(div){div.style.background='pink';});
		for(var i=numQueue.length-j;i<numQueue.length;i++){
			document.getElementsByClassName('chart-wrap')[0].childNodes[i].style.background='blue';
		}
		var node1=document.getElementsByClassName('chart-wrap')[0].childNodes[i1];
		var node2=document.getElementsByClassName('chart-wrap')[0].childNodes[i2];
		node1.style.background='green';
		node2.style.background='green';
		// setTimeout(function(){
		// node1.style.background='pink';
		// node2.style.background='pink';}, 1000);
		if(numQueue[i1]>numQueue[i2])
			return 1;
		return 0;
	}
	function switchTwo(i1,i2){
		var node1=document.getElementsByClassName('chart-wrap')[0].childNodes[i1];
		var node2=document.getElementsByClassName('chart-wrap')[0].childNodes[i2];
	
		var height=numQueue[i1];
		numQueue[i1]=numQueue[i2];
		numQueue[i2]=height;
		
		node1.style.height=2*numQueue[i1]+'px';
		node2.style.height=2*numQueue[i2]+'px';
		node1.innerHTML=numQueue[i1];
		node2.innerHTML=numQueue[i2];
	}
	function bubbleSort(){
		j=0,i=0;
		t = setInterval(function(){if(compareTwo(i,i+1))
					{
						switchTwo(i,i+1);
					}
					i++;
					if(i>=numQueue.length-j-1)
					{
						document.getElementsByClassName('chart-wrap')[0].childNodes[i].style.background='blue';
						i=0;
						j++;
						if(j==numQueue.length)
							clearInterval(t);
					}
					},500);
			
		// for(var j=0;j<numQueue.length;j++)
			// for(var i=0;i<numQueue.length-j-1;i++){
				// if(compareTwo(i,i+1))
					// {
						// switchTwo(i,i+1);
					// }
				// setTimeout((function(i1){
					// if(compareTwo(i1,i1+1))
					// {
						// switchTwo(i1,i1+1);
					// }
				// })(i),i*(j+1)*600);
			// }
		}
	// }
	document.getElementById('left-in').onclick=leftIn;
	document.getElementById('right-in').onclick=rightIn;
	document.getElementById('left-out').onclick=leftOut;
	document.getElementById('right-out').onclick=rightOut;
	document.getElementsByClassName('queue-wrap')[0].onclick=clickHandler;
	document.getElementById('ramdom-generate').onclick=generate;
	document.getElementById('bubble-sort').onclick=bubbleSort;
};