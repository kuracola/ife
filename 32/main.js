


window.onload=function(){
	
	var formConfig=[{
		label:'用户名',
		type:'text',
		validator:function(str){
			var reg= /^[\w]{6,12}$/;
			return reg.test(str);
		},
		rule:'必填，长度为4-16字符',
		success:'输入有效',
		fail:'请输入有效的用户名,长度为4-16字符'
	},
	{
		label:'密码',
		type:'password',
		validator:function(str){
			var reg= /^[\w]{6,12}$/;
			return reg.test(str);			
			var reg=/^([a-zA-Z0-9_-])+(@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+)$/ ;
			return reg.test(str);
		},
		rule:'必填，长度为6-16字符，英文字符或数字，至少包含一个英文字符',
		success:'输入有效',
		fail:'请输入有效的密码,6-16个英文字符或数字'
	},
	{
		label:'邮箱',
		type:'text',
		validator:function(str){
			var reg=/^([a-zA-Z0-9_-])+(@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+)$/ ;
			return reg.test(str);			
		},
		rule:'必填，请输入邮箱',
		success:'输入有效',
		fail:'请输入有效的邮箱'		
	}];
	
	for(var i=0;i<formConfig.length;i++){
		var p= document.createElement('div');
		var tag=document.createElement('span');
		tag.className='tag';
		tag.innerHTML=formConfig[i].label;
		p.appendChild(tag);
		var input = document.createElement('input');
		input.setAttribute('type', formConfig[i].type);	
		input.setAttribute('seq',i);
	
		p.appendChild(input);	
		p.innerHTML+='<br/>';
		var tip=document.createElement('span');
		tip.innerHTML=formConfig[i].rule;
		tip.className='tip';
		p.appendChild(tip);	
		document.getElementById('f1').appendChild(p);

	}	
	document.getElementById('f1').innerHTML=document.getElementById('f1').innerHTML+"<button type='button' class='submit'>提交</button>";
	
	for(var i=0;i<formConfig.length;i++){
		document.getElementById('f1').getElementsByTagName('input')[i].onblur=function(e){
			if(formConfig[e.target.getAttribute('seq')].validator(e.target.value)){
				e.target.nextElementSibling.nextElementSibling.innerHTML=formConfig[e.target.getAttribute('seq')].success;
				e.target.nextElementSibling.nextElementSibling.style.color='green';
			}else{
				e.target.nextElementSibling.nextElementSibling.innerHTML=formConfig[e.target.getAttribute('seq')].fail;
				e.target.nextElementSibling.nextElementSibling.style.color='red';
			}
		};
	}
};