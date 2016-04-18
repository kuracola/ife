window.onload=function(){
	
	function isValid(str){
		var length = (str.length+encodeURI(str).split(/%..|./).length-1)/2;
		
		if(length>=4 && length <=16){
			return true;
		}
		else{
			return false;
		}
	}
	function BtnHandler(){
		var value=document.getElementsByClassName('input-idle')[0].value;	
		
		if(isValid(value)==true){

			document.getElementsByClassName('tip')[0].innerHTML='该输入有效';
			document.getElementsByClassName('tip')[0].style.color='green';
			document.getElementsByClassName('input-idle')[0].style.borderColor='green';
		}else{
			document.getElementsByClassName('tip')[0].innerHTML='该输入无效';
			document.getElementsByClassName('tip')[0].style.color='red';
			document.getElementsByClassName('input-idle')[0].style.borderColor='red';
		}
	}
	document.getElementsByClassName('submit')[0].onclick=BtnHandler;
	
};