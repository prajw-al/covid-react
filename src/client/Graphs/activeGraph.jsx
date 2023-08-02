/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import CanvasJSReact from '../assets/canvasjs.react.js'
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
class ActiveGraph extends Component {
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
                        y: data[i].Active,
                        label: "Active Cases"
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
    render() {
        const options = {
            theme: "light",
            backgroundColor: "rgba(0, 123, 255, 0.063)",
            title: {
                text: "Active",
                fontColor: "rgb(0, 123, 255)",
                fontWeight: "900",
            },
            toolTip: {
                backgroundColor: "rgba(0, 123, 255, 0.063)",
                fontColor: "rgb(0, 123, 255)",
                borderColor: "rgba(0, 123, 255, 0.063)",
            },
            axisX: {
                labelFontColor: "rgba(0, 123, 255, 0.6)",
                tickColor: "rgb(0, 123, 255)",
                lineColor: "rgb(0, 123, 255)",
                valueFormatString: "DD-MMM",

            },
            axisY2: {
                title: "Case_Count",
                labelFormatter: this.addSymbols,
                titleFontColor: "rgb(0, 123, 255)",
                tickColor: "rgb(0, 123, 255)",
                lineColor: "rgb(0, 123, 255)",
                gridThickness: 0,
                logarithmic: this.props.submitted,
                includeZero: true,
                labelFontColor: "rgba(0, 123, 255, 0.6)",
            },
            data: [{
                type: "spline",
                axisYType: "secondary",
                markerType: "circle",
                markerSize: 3,
                markerColor: "rgb(0, 123, 255)",
                toolTipContent: "<strong>{label}</strong><br/><strong>{x}</strong><br/> <strong>{y}</strong> Cases",
                lineColor: "rgb(0, 123, 255)",
                dataPoints: this.state.dataPoints
            }]
        }
        return (
            <div className="graph">
                <CanvasJSChart
                    options={options}
                    onRef={ref => this.chart = ref}
                />
            </div>
        );
    }
}

export default ActiveGraph