/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { formatDistance } from 'date-fns';
import { formatDate, } from '../utils/commonfunctions.js';
import CanvasJSReact from '../assets/canvasjs.react.js'
const dateFormat = require('dateformat');
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
class TestedGraph extends Component {
    state = {
        dataPoints: []
    }
    componentDidMount = () => {
        const normalizer = 1
        const { dataPoints } = this.state
        const chart = this.chart;
        fetch(`https://api.covid19india.org/data.json`)
            .then(function (response) {
                return response.json()
            })
            .then(function (data) {

                for (let i = 20; i < data.tested.length; i++) {
                    const count = data.tested[i].totalsamplestested / normalizer
                    const date = (data.tested[i].updatetimestamp)
                    // console.log(Date.parse(date))
                    // console.log(updatedTimeStamp)
                    // const date1 =
                    //     formatDate(
                    //         data.tested[i].updatetimestamp,
                    //         'dd MMM, p'
                    //     )
                    // console.log(date1)
                    dataPoints.push({
                        x: data.tested[i].updatetimestamp,
                        y: count,
                        label: "Tests"
                    });
                }
                chart.render();
            });
    }
    addSymbols = (e) => {
        var suffixes = ["", "K", "M", "B"];
        var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);

        if (order > suffixes.length - 1)
            order = suffixes.length - 1;

        var suffix = suffixes[order];
        return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
    }
    // componentDidMount() {
    //     var chart = this.chart;
    //     fetch('https://canvasjs.com/data/gallery/react/nifty-stock-price.json')
    //         .then(function (response) {
    //             return response.json();
    //         })
    //         .then(function (data) {
    //             console.log(data)
    //             for (var i = 0; i < data.length; i++) {
    //                 dataPoints.push({
    //                     x: new Date(data[i].x),
    //                     y: data[i].y
    //                 });
    //             }
    //             chart.render();
    //         });
    // }
    render() {
        const options = {
            animationEnabled: true,
            theme: "dark",
            backgroundColor: "rgba(32, 26, 162, 0.125)",
            title: {
                text: "Tests",
                fontColor: "rgba(32, 26, 162, 0.6)",
                fontWeight: "900"
            },
            toolTip: {
                backgroundColor: "rgba(32, 26, 162, 0.125)",
                fontColor: "rgba(32, 26, 162, 0.6)",
                borderColor: "rgba(32, 26, 162, 0.125)",
            },
            axisX: {
                labelFontColor: "rgba(32, 26, 162, 0.867)",
                tickColor: "rgba(32, 26, 162, 0.867)",
                lineColor: "rgba(32, 26, 162, 0.867)",
            },
            axisY2: {
                title: "Test_Count",
                labelFormatter: this.addSymbols,
                titleFontColor: "rgba(32, 26, 162, 0.6)",
                tickColor: "rgba(32, 26, 162, 0.867)",
                lineColor: "rgba(32, 26, 162, 0.867)",
                gridThickness: 0,
                includeZero: true,
                logarithmic: this.props.submitted,
                labelFontColor: "rgba(32, 26, 162, 0.867)",
            },
            data: [{
                type: "spline",
                axisYType: "secondary",
                markerType: "circle",
                toolTipContent: "<strong>{label}</strong><br/><strong>{x}</strong><br/> <strong>{y}</strong> Cases",
                lineColor: "rgba(32, 26, 162, 0.6)",
                dataPoints: this.state.dataPoints
            }]
        }
        return (
            <div className="graph" >
                <CanvasJSChart
                    options={options}
                    onRef={ref => this.chart = ref}
                />
            </div>
        );
    }
}
export default TestedGraph
