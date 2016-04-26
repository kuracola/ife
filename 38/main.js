window.onload=function(){
	//算出总分
	var rows = document.getElementsByTagName('tr');
	[].forEach.call(rows,function(row){
		if(row.children[0].nodeName=='TH')
			return;
		var sum=0;
		for(var i=1;i<row.children.length-1;i++){
			sum+=parseInt(row.children[i].innerHTML);
		}
		row.children[row.children.length-1].innerHTML=sum;
	});
	//绑定事件
	[].forEach.call(document.getElementsByClassName('arrow-up'),function(ele){
		ele.onclick=sort;
	});
	[].forEach.call(document.getElementsByClassName('arrow-down'),function(ele){
		ele.onclick=sort;
	});
	function sort(e){
		var rows = document.getElementsByTagName('tr');
		var subject=e.target.parentNode.children[0].innerHTML;
		var sID;
	
		if(subject=='语文')
		{
			sID=1;
		}else if(subject=='数学')
		{
			sID=2;
		}else if(subject=='英语')
		{
			sID=3;
		}
		else if(subject=='总分')
		{
			sID=4;
		}

		var flag=1;
		if(e.target.className=='arrow-down')
			flag=-1;
		
		var rowView= [].slice.call(rows,1);
		//console.log(rowView);		
		rowView.sort(function(rowA,rowB){
			//console.log(rowA.children[sID].innerHTML);
			var a=parseInt(rowA.children[sID].innerHTML);
			//console.log(rowB.children[sID].innerHTML);
			var b=parseInt(rowB.children[sID].innerHTML);
			//console.log(a-b);
			return flag*(a-b);
		});

		var newRows=[];
		rowView.forEach(function(row){
			newRows.push(row.innerHTML);
			row.innerHTML='';
		});
		
		for(i=1;i<rows.length;i++){
			rows[i].innerHTML=newRows[i-1];
		}	
	}
	//读取每一个tr 存成map 再放入数组
	
	//写比较函数,排序时分别调用
	
	
	
};
