var aqiData = [
  ["北京", 90],
  ["上海", 50],
  ["福州", 10],
  ["广州", 50],
  ["成都", 90],
  ["西安", 100]
];

window.onload=function () {

	for(var i=0;i<aqiData.length;i++)
	{
		if(aqiData[i][1]>60)
		{
			var li=document.createElement("li");
			var text=document.createTextNode(aqiData[i][0] +', '+aqiData[i][1]);
			li.appendChild(text);
			document.getElementById('aqi-list').appendChild(li);
		}
	}

	
};