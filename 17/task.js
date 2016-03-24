/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/
window.onload= function(){
// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: 1,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
 var colors=['red','blue','yellow','pink','green','purple','brown','gray'];
function renderChart() {
	document.getElementsByClassName('aqi-char-box').innerHTML='';
	for(period in chartData){
		var d = document.createElement('div');
		d.style.height=''+chartData[period]+'px';
		d.style.width=''+80.0/period+'%';
		d.style.cssFloat='left';
		d.style.background=colors[Math.ceil(Math.random()*8)-1];
		d.style.marginLeft='1px';
		document.getElementsByClassName('aqi-char-box').appendChild(d);
	}
	
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(e) {
  // 确定是否选项发生了变化 
	if(pageState.nowGraTime==e.target.value)
		return;
  // 设置对应数据
	pageState.nowGraTime=e.target.value;
	initAqiChartData();
    renderChart();
	chartData={};
	switch(pageState.nowGraTime)
	{
		case 'day':
			
			for(var date in aqiSourceData[pageState.nowSelectCity]){
				chartData[date]= aqiSourceData[pageState.nowSelectCity][date];
			}
			break;
		case 'week':
			var i=0;
			var w=0;
			var sum=0;
			for(var date in aqiSourceData[pageState.nowSelectCity]){
				sum+= aqiSourceData[pageState.nowSelectCity][date];
				i++;
				if(i==7){
					w++;
					chartDate['week'+week]=sum/7.0;
					i=0;	
					sum=0;
				}
			}
			break;
		case 'month':
			var sum=0;
			for(var date  in aqiSourceData[pageState.nowSelectCity]){
				var dating= new Date(date);
				sum+=aqiSourceData[pageState.nowSelectCity][date];
				if(dating.setDate(dating.getDate()+1).getDate()==1)
				{
					dating= new Date(date);
					chartData[dating.getMonth]=sum/dating.getDate();
					sum=0;
				}
			}
	}
	
	
  // 调用图表渲染函数
	renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(e) {
  // 确定是否选项发生了变化 
	//if(e.target.nodeName=='label')
							console.log(e.target);
		if(e.target.nodeName!='SELECT')
			return;
				console.log(e.target.selectedIndex);
		if(e.target.selectedIndex==pageState.nowSelectCity)
			return;
		pageState.nowSelectCity==e.target.selectedIndex;
  // 设置对应数据
			switch(pageState.nowGraTime)
	{
		case 'day':
			
			for(var date in aqiSourceData[pageState.nowSelectCity]){
				chartData[date]= aqiSourceData[pageState.nowSelectCity][date];
			}
			break;
		case 'week':
			var i=0;
			var w=0;
			var sum=0;
			for(var date in aqiSourceData[pageState.nowSelectCity]){
				sum+= aqiSourceData[pageState.nowSelectCity][date];
				i++;
				if(i==7){
					w++;
					chartDate['week'+week]=sum/7.0;
					i=0;	
					sum=0;
				}
			}
			break;
		case 'month':
			var sum=0;
			for(var date  in aqiSourceData[pageState.nowSelectCity]){
				var dating= new Date(date);
				sum+=aqiSourceData[pageState.nowSelectCity][date];
				if(dating.setDate(dating.getDate()+1).getDate()==1)
				{
					dating= new Date(date);
					chartData[dating.getMonth]=sum/dating.getDate();
					sum=0;
				}
			}
	}
  // 调用图表渲染函数
  	renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
	var inputs=document.getElementByName('gra-time');
	for(var i=0;i<inputs.length;i++){
		inputs[i].onclick=graTimeChange;
	}
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
	for(var city in aqiSourceData){
		var option=document.createElement('option');
		option.appendChild(document.createTextNode(city));
		document.getElementById('city-select').appendChild(option);
	}
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
	document.getElementById('city-select').onclick=citySelectChange;
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

 init();
 };