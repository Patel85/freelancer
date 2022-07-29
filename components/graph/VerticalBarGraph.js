import React, { useEffect, useRef } from 'react'
import { render } from 'react-dom'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import ExportData from 'highcharts/modules/export-data'
import HighchartsExporting from 'highcharts/modules/exporting'
import Accessibility from 'highcharts/modules/accessibility'
import Fullscreen from 'highcharts/modules/full-screen'
import Router from 'next/router'
import { PATH } from '@constant/Path'

const BarGraph = (props) => {
    const chart = useRef();
    if (typeof Highcharts === 'object') {
        HighchartsExporting(Highcharts)
        // ExportData(Highcharts)
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
        console.log(buttons);
    },[])
    const options = {
        chart:{
            type : 'column'
        },
        title: {
          text: 'My chart'
        },
        xAxis: {
            categories: props.labels,
            title: {
                text: null
            },    
        },
        yAxis: {
            min: 0,
            // max:24,
            title: {
                text: 'Total Visited Websites',
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
                    enabled: true
                }
            }
        },
        series: [{
            name: '',
            data: props.data
        }],
        exporting: {
            showTable: true,
            csv: {
                dateFormat: '%Y-%m-%d'
            },
            // buttons: {
                //     contextButton: {
                    //     menuItems: 
                    // }
                }
    }
    
    // console.log(Highcharts.getOptions().exporting.buttons.contextButton.menuItems,"button");
    return <div>
        <HighchartsReact
            ref = {chart}
            highcharts={Highcharts}
            options={options}
            />
    </div>

}
export default BarGraph