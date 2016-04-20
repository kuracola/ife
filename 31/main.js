window.onload=function(){
	document.getElementById('chooseSchool').style.display='block';
	document.getElementById('chooseWork').style.display='none';
	document.getElementById('school-xian').style.display='none';
	document.getElementById('school-nanjing').style.display='none';

	document.getElementById('studentRadio').onclick=function(){
		document.getElementById('chooseSchool').style.display='block';
		document.getElementById('chooseWork').style.display='none';
	};
	document.getElementById('workRadio').onclick=function(){
		document.getElementById('chooseSchool').style.display='none';
		document.getElementById('chooseWork').style.display='block';
	};
	document.getElementById('city').onchange=function(e){
		var nowCity=e.target.options[e.target.selectedIndex].value;
		
		document.getElementById('school-nanjing').style.display='none';
		document.getElementById('school-beijing').style.display='none';
		document.getElementById('school-xian').style.display='none';
		document.getElementById('school-'+nowCity).style.display='inline';
	};
};