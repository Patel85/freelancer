import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
const BubbleGraph = (props) => {

const options = {
  chart: {
    type: 'scatter',
    zoomType: "xy"
  },
  title:{
    text:"Detailed Chart"
  },
  xAxis: {
    title: {
        text: "Total Accesed Websites (Count) ",
        align: 'high'
    },
  },
  yAxis: {
    tickInterval : 1,
    title: {
        text: "Total Accesed Time (Hour)"
    },
  },
  legend: {
    enabled: false,
    align: 'left',
    layout: 'vertical',
    verticalAlign: 'top',
    itemMarginTop: 10,
  },
  tooltip: {
    share:false,
    formatter : function(){
      const val = String(this.y).split(".")
      return "<b>" + this.point.name + "</b><br/>Total Access website " + this.x + "<br/>Total Access Time " + val[0] + "h " + val[1] + "m" 
    }
  },
  plotOptions: {
    series: {
      sizeBy: 'width',
      // maxSize: 70,
      // lineWidth: 1,
      marker: {
        enabled: true,
        radius: 3
      },
    }
  },
  
  credits: {
    enabled: false
    },
  series: [{
    name: "URL",
    // color: "#f00",
    data: props.data
  }]
}
    // console.log(HC_more(Highcharts),Highcharts)

    return <div>
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
        />
    </div>

}
export default BubbleGraph