// 하이차트
function highChart(data){
	console.log(data);
	Highcharts.chart('popular', {
	    chart: {
	        type: 'bubble',
	        plotBorderWidth: 3,
	        zoomType: 'xy'
	    },
	    
	    credits: {
	        enabled: false
	    },
	    
	
	    legend: {
	        enabled: false
	    },
	
	    title: {
	        text: '최근 인기있는 펀드'
	    },
	
	    accessibility: {
	        point: {
	            valueDescriptionFormat: '{index}. {point.fullName}, 수익률: {point.x}%, 유입금액: {point.y}억.'
	        }
	    },
	
	    xAxis: {
	        title: {
	            text: '유입금액(억)'
	        },
	        labels: {
	            format: '{value}'
	        },
	        accessibility: {
	            rangeDescription: 'Range: 0 to 100 grams.'
	        },
	        
	        gridLineWidth : 0
	    },
	
	    yAxis: {
	        startOnTick: false,
	        endOnTick: false,
	        title: {
	            text: '수익률(%)'
	        },
	        labels: {
	            format: '{value}'
	        },
	        gridLineWidth : 0,
	        maxPadding: 0.2,
	        accessibility: {
	            rangeDescription: 'Range: -10 to 30 grams.'
	        }
	    },
	
	    tooltip: {
	        useHTML: true,
	        headerFormat: '<table>',
	        pointFormat: '<tr><th colspan="2"><h5>{point.fullName}</h5></th></tr>' +
	            '<tr><th>수익률(%) :</th><td>{point.y}%</td></tr>' +
	            '<tr><th>유입금액 :</th><td>{point.x}억</td></tr>',
	        footerFormat: '</table>',
	        followPointer: true
	    },
	
	    plotOptions: {
	        series: {
				colorByPoint : true,
				colors: [
					'#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572',
		            '#FF9655', '#FFF263', '#6AF9C4'
				],
	            dataLabels: {
	                enabled: true,
	                format: '{point.name}'
	            }
	        }
	        
	    },
	
	    series: [{
	        data: data[0]
	    }]
	
	});
	
	
	Highcharts.chart('volatility', {
	    chart: {
	        type: 'bubble',
	        plotBorderWidth: 3,
			styleMode:true,
	        zoomType: 'xy'
	    },
	    
	    credits: {
	        enabled: false
	    },
	
	    legend: {
	        enabled: false
	    },
	
	    title: {
	        text: '변동성이 큰 펀드'
	    },

	    accessibility: {
	        point: {
	            valueDescriptionFormat: '{index}. {point.name}, 수익률: {point.x}%, 표준편차: {point.y}%.'
	        }
	    },
	
	    xAxis: {
	        title: {
	            text: '표준편차'
	        },
	        labels: {
	            format: '{value}'
	        },
	        accessibility: {
	            rangeDescription: 'Range: 0 to 100 grams.'
	        },
	        gridLineWidth : 0
	    },
	
	    yAxis: {
	        startOnTick: false,
	        endOnTick: false,
	        className:'highcharts-color-0',
	        title: {
	            text: '수익률(%)'
	        },
	        labels: {
	            format: '{value}'
	        },
	        gridLineWidth : 0,
	        maxPadding: 0.2,
	        accessibility: {
	            rangeDescription: 'Range: -10 to 30 grams.'
	        }
	    },
	
	    tooltip: {
	        useHTML: true,
	        headerFormat: '<table>',
	        pointFormat: '<tr><th colspan="2"><h5>{point.name}</h5></th></tr>' +
	            '<tr><th>수익률(%) :</th><td>{point.y}%</td></tr>' +
	            '<tr><th>표준편차 :</th><td>{point.x}%</td></tr>' ,
	        footerFormat: '</table>',
	        followPointer: true
	    },
	
	    plotOptions: {
	        series: {
				colorByPoint : true,
				colors: [
					'#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572',
		            '#FF9655', '#FFF263', '#6AF9C4'
				],
	            dataLabels: {
	                enabled: true,
	                format: '{point.name}'
	            }
	        }
	    },
	
	    series: [{
	        data: data[1]
	    }]
	
	});
}
