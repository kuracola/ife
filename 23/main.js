window.onload=function(){

		//setTimeout(NLR(obj.children[0]),time+=500);
	var time=300;
	var objQueue=[];
	var timer;
	function LRN(obj){
		for(var i=0;i<obj.children.length;i++){
			if(obj.children[i]!=undefined){
				LRN(obj.children[i]);
			}
		}
		objQueue.push(obj);

	}
	function NLR(obj){

		objQueue.push(obj);
		for(var i=0;i<obj.children.length;i++){
			if(obj.children[i]!=undefined){
				NLR(obj.children[i]);
			}
		}
	}
	function render(){
		time=0;
		flag=0;
		objQueue.forEach(function(obj)
				{	
					if(flag==0)
					{
						obj.style.background='white';
						var input=document.getElementById('check-input').value;
						
						console.log(obj.childNodes[0].nodeValue.replace(/[^a-zA-Z]/g,'').indexOf(input));
						
						if(obj.childNodes[0].nodeValue.replace(/[^a-zA-Z]/g,'').indexOf(input)==0 && input!='')
						{
							setTimeout(function(){obj.style.background='blue';},time+=300);
							flag=1;
						}
						else{
							setTimeout(function(){obj.style.background='pink';},time+=300);
						}
					}
				});
	}
	function startNLR(){
		Method=0;
		objQueue=[];
		var tree=document.getElementsByClassName('level1')[0];
		NLR(tree);
		render();
	}
	function startLRN(){
		Method=1;
		objQueue=[];
		var tree=document.getElementsByClassName('level1')[0];
		LRN(tree);
		render();
	}
	function startSearch(){
		
	}
	document.getElementById('nlr').onclick=startNLR;
	document.getElementById('lrn').onclick=startLRN;

};