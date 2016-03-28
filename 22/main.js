window.onload=function(){
	// var tree={
				// node:'level1',
				// left:{
					// node:'level2'
					// left:{
						// node:'level3'
						// left:{
							// node:'level4',
						// },
						// right:{
							// node:'level4',
						// }
					// },
					// right:{
						// node:'level3'
						// left:{
							// node:'level4',
						// },
						// right:{
							// node:'level4',
						// }
					// }		
				// },
				// right:{
					// node:'level2',
					// left:{
						// node:'level3'
						// left:{
							// node:'level4',
						// },
						// right:{
							// node:'level4',
						// }
					// },
					// right:{
						// node:'level3'
						// left:{
							// node:'level4',
						// },
						// right:{
							// node:'level4',
						// }
					// }
				// }
			// };
		//setTimeout(NLR(obj.children[0]),time+=500);
	var time=300;
	var objQueue=[];
	function LNR(obj){
	
		if(obj.children[0]!=undefined)
		{
			LNR(obj.children[0]);
		}
		objQueue.push(obj);
		if(obj.children[1]!=undefined)
		{
			LNR(obj.children[1]);
		}
	}
	function LRN(obj){
	
		if(obj.children[0]!=undefined)
		{
			LRN(obj.children[0]);
		}
		if(obj.children[1]!=undefined)
		{
			LRN(obj.children[1]);
		}
		objQueue.push(obj);
	}
	function NLR(obj){
		objQueue.push(obj);
		if(obj.children[0]!=undefined)
		{
			NLR(obj.children[0]);
		}
		if(obj.children[1]!=undefined)
		{
			NLR(obj.children[1]);
		}
	}
	function render(){
		time=0;
		objQueue.forEach(function(obj)
				{	
					obj.style.background='white';
					setTimeout(function(){obj.style.background='pink';},time+=300);
				});
	}
	function startNLR(){
		objQueue=[];
		var tree=document.getElementsByClassName('level1')[0];
		NLR(tree);
		render();
	}
	function startLRN(){
		objQueue=[];
		var tree=document.getElementsByClassName('level1')[0];
		LRN(tree);
		render();
	}
	function startLNR(){
		objQueue=[];
		var tree=document.getElementsByClassName('level1')[0];
		LNR(tree);
		render();
	}
	document.getElementById('nlr').onclick=startNLR;
	document.getElementById('lnr').onclick=startLNR;
	document.getElementById('lrn').onclick=startLRN;
};