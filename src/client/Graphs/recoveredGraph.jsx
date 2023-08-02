/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import CanvasJSReact from '../assets/canvasjs.react.js'
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
class RecoveredGraph extends Component {
    state = {
        dataPoints: []
    }
    componentDidUpdate = () => {
        const { dataPoints } = this.state
        const length = dataPoints.length
        for (let i = 0; i <= length; i++) {
            dataPoints.pop(i)
            const length = dataPoints.length + 1
        }
        this.graphData()
    }
    componentDidMount = () => {
        this.graphData()
    }
    graphData = () => {
        const { dataPoints } = this.state
        const chart = this.chart;
        fetch(`https://api.covid19api.com/dayone/country/${this.props.country}`)
            .then(function (response) {
                return response.json()
            })
            .then(function (data) {
                for (let i = 0; i < data.length; i++) {
                    dataPoints.push({
                        x: new Date(data[i].Date),
                        y: data[i].Recovered,
                        label: "Recovered Cases"
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
            backgroundColor: "rgba(40, 167, 69, 0.125)",
            title: {
                text: "Recovered",
                fontColor: "green",
                fontWeight: "900"
            },
            toolTip: {
                backgroundColor: "rgba(40, 167, 69, 0.125)",
                fontColor: "green",
                borderColor: "rgba(40, 167, 69, 0.125)",
            },
            axisX: {
                labelFontColor: "rgba(40, 167, 69, 0.6)",
                tickColor: "rgba(40, 167, 69, 0.6)",
                lineColor: "rgba(40, 167, 69, 0.6)",
                valueFormatString: "DD-MMM",
            },
            axisY2: {
                title: "Case_Count",
                labelFormatter: this.addSymbols,
                titleFontColor: "green",
                tickColor: "rgba(40, 167, 69, 0.6)",
                lineColor: "rgba(40, 167, 69, 0.6)",
                gridThickness: 0,
                includeZero: true,
                logarithmic: this.props.submitted,
                labelFontColor: "rgba(40, 167, 69, 0.6)",
            },
            data: [{
                type: "spline",
                axisYType: "secondary",
                markerType: "circle",
                markerSize: 3,
                markerColor: "green",
                toolTipContent: "<strong>{label}</strong><br/><strong>{x}</strong><br/> <strong>{y}</strong> Cases",
                lineColor: "green",
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
export default RecoveredGraph
