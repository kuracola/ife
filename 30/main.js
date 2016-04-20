window.onload=function(){

	function nameIsValid(str){
		var length = (str.length+encodeURI(str).split(/%..|./).length-1)/2;
		if(length>=4 && length <=16){
			return true;
		}
		else{
			return false;
		}
	}
	function passwordIsValid(str){
		var reg= /^[\w]{6,12}$/;
		return reg.test(str);
	}
	function mailIsValid(str){
		var reg=/^([a-zA-Z0-9_-])+(@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+)$/ ;
		return reg.test(str);
	}
	
	function BtnHandler(){
		var isValid=true;
		[].forEach.call(document.getElementsByClassName('input-idle'),function(e){
			if(e.style.borderColor!='green')
				isValid=false;
		});

		if(isValid==true){
			alert('输入有效');
		}
	}
	document.getElementsByClassName('submit')[0].onclick=BtnHandler;
	[].forEach.call(document.getElementsByClassName('input-idle'),function(ele){
		var validResult;
		ele.onblur=function(){
			if(ele.previousElementSibling.innerHTML=='用户名：')
			{
				validResult=nameIsValid(ele.value);
			}
			if(ele.previousElementSibling.innerHTML=='密码：')
			{
				validResult=passwordIsValid(ele.value);
			}
			if(ele.previousElementSibling.innerHTML=='邮箱：')
			{
				validResult=mailIsValid(ele.value);
			}
			if(validResult==true){
				ele.parentNode.getElementsByClassName('tip')[0].innerHTML='该输入有效';
				ele.parentNode.getElementsByClassName('tip')[0].style.color='green';
				ele.parentNode.getElementsByClassName('input-idle')[0].style.borderColor='green';
			}else{
				ele.parentNode.getElementsByClassName('tip')[0].innerHTML='该输入无效';
				ele.parentNode.getElementsByClassName('tip')[0].style.color='red';
				ele.parentNode.getElementsByClassName('input-idle')[0].style.borderColor='red';
			}
		};
	});	
};