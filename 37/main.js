window.onload=function(){
	document.getElementById('btn-alert').onclick=function(){
		var alertBack=document.createElement('div');
		alertBack.className='black-back';
	
		var alertWindow=document.createElement('div');
		var closeBtn=document.createElement('button');
		// closeBtn.innerHTML='close';
		closeBtn.onclick=function(e){
			e.target.parentNode.previousSibling.outerHTML='';
			e.target.parentNode.outerHTML='';
		};
		alertBack.onclick=function(e){

			alertWindow.style.width='0px';
			alertWindow.style.marginLeft='0px';
			
		setTimeout(function(){
			alertBack.style.opacity=0;
			alertWindow.style.top='-30%';
			setTimeout(function(){
				e.target.nextSibling.outerHTML='';
				e.target.outerHTML='';
				},500);
			},500);
		};
		
		alertWindow.innerHTML='<div>Are you OK?</div>'
		alertWindow.appendChild(closeBtn);
		alertWindow.className='float-window';
		document.getElementsByTagName('body')[0].appendChild(alertBack);
		document.getElementsByTagName('body')[0].appendChild(alertWindow);
		//alertWindow.style.height='300px';
		setTimeout(function(){
			alertBack.style.opacity='0.7';
			alertWindow.style.top='50%';
			setTimeout(function(){
				alertWindow.style.width='500px';
				alertWindow.style.marginLeft='-250px';
			},500);
		},10);
	}
};
