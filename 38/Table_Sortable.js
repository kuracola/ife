var Table_Sortable = function(container,data,config,sortAlg){
	this.data=data;
	this.container=container;
	this.config=config;
	this.sortAlg=sortAlg;
	this.initial();
};
Table_Sortable.prototype.initial=function(){
	var table = document.createElement('table');
	if(data.length>=1){
		var trHead=document.createElement('tr');
		data[0].forEach(function(headName){
			if(this.config[headName]==0)
			{
				var span = document.createElement('span').innerHTML=headName;
				trHead.appendChild(document.createElement('th').appendChild(span)) ;
				
			}else{
				var span = document.createElement('span').innerHTML=headName;
				var th=document.createElement('th');
				th.innerHTML=span+"<div class='arrow-up'>^</div><div class='arrow-down'>^</div>";
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
};
Table_Sortable.prototype.render=function(){
	
};
