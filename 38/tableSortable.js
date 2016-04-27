var Table_Sortable = function(container,data,config,sortFunc){
	this.data=data;
	this.container=container;
	this.config=config;
	this.sortFunc=sortFunc;
	if(this.sortFunc==undefined){
		var that=this;
		this.sortFunc=function(e){
			var subject=e.target.parentNode.children[0].innerHTML;
			var index=data[0].indexOf(subject);
			var order=1;
			if(e.target.className=='arrow-down'){
				order=-1;
			}
			data.sort(function(rowA,rowB){
				return order*(rowA[index]-rowB[index]);
			});
			//console.log(this);
			//这里如果直接使用this的话，所指向的是其调用者事件源-箭头元素，所以使用闭包
			that.render();
		};
	}
	this.render();

};

Table_Sortable.prototype.render=function(){
	//console.log(this);
	//在prototype的子属性里使用this的话 指向Table_Sortable的实体
	var table = document.createElement('table');
	data=this.data;
	config=this.config;
	if(data.length>=1){
		var trHead=document.createElement('tr');
		data[0].forEach(function(headName){
			if(config[headName]==0)
			{
				var span = document.createElement('span');
				span.innerHTML=headName;
				var th = document.createElement('th');
				th.appendChild(span);
				trHead.appendChild(th) ;
				
			}else{
				var span = document.createElement('span');
				span.innerHTML=headName;
				var th=document.createElement('th');
				th.innerHTML=span.outerHTML+"<div class='arrow-up'>^</div><div class='arrow-down'>^</div>";
				trHead.appendChild(th);
			}
		});
		table.appendChild(trHead);
		for(var i=1;i<data.length;i++){
			var trData=document.createElement('tr');
			data[i].forEach(function(meta){
				var td=document.createElement('td');
				td.innerHTML=meta;
				trData.appendChild(td);
			});
			table.appendChild(trData);
		}
	}
	this.container.innerHTML=table.outerHTML;
	
		//绑定事件	
	sortFunc=this.sortFunc;
	[].forEach.call(document.getElementsByClassName('arrow-up'),function(ele){
		
		ele.onclick=sortFunc;
	});
	[].forEach.call(document.getElementsByClassName('arrow-down'),function(ele){
		ele.onclick=sortFunc;
	});
};
