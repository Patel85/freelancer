import React, { useEffect } from 'react'
import { render } from 'react-dom'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import ExportData from 'highcharts/modules/export-data'
import HighchartsExporting from 'highcharts/modules/exporting'
import Accessibility from 'highcharts/modules/accessibility'
import Fullscreen from 'highcharts/modules/full-screen'
import Router from 'next/router'
import { PATH } from '@constants/Path'

const BarGraph = (props) => {
    if (typeof Highcharts === 'object') {
        HighchartsExporting(Highcharts)
    }
    useEffect(()=>{
        
        const buttons = Highcharts.getOptions().exporting.buttons.contextButton.menuItems;
        const jpgIndex = buttons.indexOf("downloadJPEG")
        const svgIndex = buttons.pop("downloadSVG")
        
        if (svgIndex > -1) {
            buttons.splice(svgIndex, 1);
        }
        if (jpgIndex > -1) {
            buttons.splice(jpgIndex, 1);
        }
        if (buttons.length < 6){
            buttons.push({
                text: "Download CSV",
                onclick: function() {
                    Router.push(`${PATH}/monitor/export/${props.userId}?q=${props.duration}`)
                }
            })
        }
    },[])
    const options = {
        chart:{
            type : 'bar'
        },
        title: {
          text: 'My chart'
        },
        xAxis: {
            categories: props.labels,
            // title: {
            //     text: null
            // },
    
        },
        tooltip: {
            share:false,
            formatter : function(){
                const val = String(this.y).split(".")
                return "<br/>Time " + val[0] + "h " + val[1] + "m" 
            }
        },
        yAxis: {
            min: 0,
            tickInterval : 1,
            // max:24,
            title: {
                text: 'Hours',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: false
                }
            }
        },
        legend: {
            enabled:false
        //     layout: 'vertical',
        //     align: 'right',
        //     verticalAlign: 'top',
        //     x: -40,
        //     y: 80,
        //     floating: true,
        //     borderWidth: 1,
        //     // backgroundColor:
        //     //     Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
        //     shadow: true
        },
        series: [{
            name: '',
            data: props.data
        }],
        exporting : {
            
            showTable:true
        }
        //     buttons : {
        //         customButton :{
        //             symbol: "menu",
        //             menuItems: [{
        //                 textKey: 'printChart',
        //                 onclick: function () {
        //                     this.print();
        //                 }
        //             }, {
        //                 textKey: 'viewFullscreen',
        //                 onclick: ()=> {
        //                     // const screen = new Fullscreen()
        //                     // screen.toogle()
        //                 }
        //              }, {
        //                 separator: true
        //             }, {
        //                 textKey: 'downloadPNG',
        //                 onclick: function () {
        //                     this.exportChart();
        //                 }
        //             }, {
        //                 textKey: 'downloadJPEG',
        //                 onclick: function () {
        //                     this.exportChart({
        //                         type: 'image/jpeg'
        //                     });
        //                 }
        //             }, {
        //                 textKey: 'downloadPDF',
        //                 onclick: function () {
        //                     this.exportChart({
        //                         type: 'application/pdf'
        //                     });
        //                 }
        //             }, {
        //                 textKey: 'downloadSVG',
        //                 onclick: function () {
        //                     this.exportChart({
        //                         type: 'image/svg+xml'
        //                     });
        //                 }
        //             }]
        //         }
        //     }
        // }
    }

    return <div>
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
            />
    </div>

}
export default BarGraph