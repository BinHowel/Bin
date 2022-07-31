/**
 * @author ShuHao 
 * @date 22.07.28
 * @description echarts图标库相关
 */


/*
*请求工具
*/
function getAjax(method,url,async,func){
	xhttp = new XMLHttpRequest();
	 xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	      func(this);
	    }
	};
	xhttp.open(method, url, async);
	xhttp.send();
}


/**
 * 曲线图
 */
var curve = echarts.init(document.querySelector('.curver-chart'));
getAjax('get',"https://edu.telking.com/api/?type=month",true,function(res){
	let temp = JSON.parse(res.response).data;
	let curveOpion = {
		xAxis: {
	      data: temp.xAxis
	    },
		yAxis: {
			axisLabel: {
			  formatter: '{value} 人'
			}
		},
	    series: [
	      {
	        data: temp.series,
	        type: 'line',
	        smooth: true,
			areaStyle: {
				opacity: 0.1
			},
			label: {
				show: true,
				position: 'top'
			}
	      }
	    ]
	};
	curve.setOption(curveOpion);
})


/**
 * 饼状图
 */
var pie = echarts.init(document.querySelector('.pie-chart'));
getAjax('get',"https://edu.telking.com/api/?type=week",true,function(res){
	let temp = JSON.parse(res.response).data;
	let nameArray =  temp.xAxis;
	let valueArray = temp.series;
	let data = [];
	for(var i = 0; i < nameArray.length; i++){
		data.push({
			name:nameArray[i],
			value:valueArray[i]
		})
	}
	var pieOpion = {
	    series: [
	      {
	        data: data,
	        type: 'pie',
	      }
	    ]
	};
	
	// 使用刚指定的配置项和数据显示图表。
	pie.setOption(pieOpion);
})


/**
 * 柱状图 
 */
var bar = echarts.init(document.querySelector('.bar-chart'));
getAjax('get',"https://edu.telking.com/api/?type=week",true,function(res){
	let temp = JSON.parse(res.response).data;
	let xAxisArray =  temp.xAxis;
	let valueArray = temp.series;
	let barOpion = {
		xAxis: {
		    data: xAxisArray
		  },
		  yAxis: {
			name: "商品数"
		  },
		  series: [
		    {
		      data: valueArray,
		      type: 'bar',
			  barWidth : 25, //柱图宽度
			  itemStyle:{
				color:'#4083f2'
			  }
		    }
		  ]
	};
	
	bar.setOption(barOpion);
})


/**
 * 响应式设置
 */
window.onresize = function(){
	curve.resize();
	pie.resize();
	bar.resize();	
}