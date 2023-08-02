/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import CanvasJSReact from '../assets/canvasjs.react.js'
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
class ConfirmedGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataPoints: [],
            stateDataPoints: []
        }
    }
    componentDidUpdate = () => {
        const { dataPoints } = this.state
        const length = dataPoints.length
        for (let i = 0; i <= length; i++) {
            dataPoints.pop(i)
            const length = dataPoints.length + 1
        }
        this.graphData();
    }
    // getSnapshotBeforeUpdate = (prevProps, prevState) => {
    //     console.warn("getSnapshotbeforeUpdate")
    //     console.warn(prevProps, prevState)
    //     return null
    // }
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
                        y: data[i].Confirmed,
                        label: "Confirmed Cases"
                    });
                }
                chart.render();
            });
    }
    // stategraphData = () => {
    //     const { stateDataPoints } = this.state
    //     const { stateCode } = this.props
    //     const chart = this.chart;
    //     fetch(`https://api.covid19india.org/states_daily.json`)
    //         .then(function (response) {
    //             return response.json()
    //         })
    //         .then(function (data) {
    //             console.log(data)
    //             console.log(data.states_daily.length)
    //             for (let i = 0; i < data.states_daily.length; i++) {
    //                 const meta = stateCode.toLowerCase();
    //                 console.log(meta)
    //                 console.log(data.states_daily[i].meta)
    //                 if (data.states_daily[i.stateCode] === stateCode.toLowerCase() && data.states_daily[i].status === "Confirmed") {
    //                     stateDataPoints.push({
    //                         x: new Date(data.states_daily[i].Date),
    //                         y: data.states_daily[i].stateCode,
    //                         label: "Confirmed Cases"
    //                     });
    //                 }
    //                 // console.log(stateDataPoints)
    //             }
    //             chart.render();
    //         });
    // }

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
            theme: "light",
            backgroundColor: "rgba(255, 7, 58, 0.125)",
            title: {
                text: "Confirmed",
                fontColor: "rgb(255, 7, 58)",
                fontWeight: "900"
            },
            toolTip: {
                backgroundColor: "rgba(255, 7, 58, 0.125)",
                fontColor: "rgb(255, 7, 58)",
                borderColor: "rgba(255, 7, 58, 0.125)",
            },
            axisX: {
                labelFontColor: "rgba(255, 7, 58, 0.6)",
                tickColor: "rgba(255, 7, 58, 0.6)",
                lineColor: "rgba(255, 7, 58, 0.6)",
                valueFormatString: "DD-MMM",
            },
            axisY2: {
                title: "Case_Count",
                labelFormatter: this.addSymbols,
                titleFontColor: "rgb(255, 7, 58)",
                tickColor: "rgba(255, 7, 58, 0.6)",
                lineColor: "rgba(255, 7, 58, 0.6)",
                gridThickness: 0,
                logarithmic: this.props.submitted,
                includeZero: true,
                labelFontColor: "rgba(255, 7, 58, 0.6)",
            },

            data: [{
                type: "spline",
                axisYType: "secondary",
                markerColor: "red",
                markerSize: 3,
                markerType: "circle",
                toolTipContent: "<strong>{label}</strong><br/><strong>{x}</strong><br/> <strong>{y}</strong> Cases",
                lineColor: "rgb(255, 7, 58)",
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

export default ConfirmedGraph










/* eslint-disable no-unused-vars */
// import React, { Component } from 'react'
// import { Chart } from "react-google-charts";
// export default class ConfirmedGraph extends Component {
//     state = {
//         chartData: []
//     }
//     componentWillUpdate = () => {
//         this.componentDidMount();
//     }
//     async componentDidMount() {
//         const response = await fetch(
//             `https://api.covid19api.com/dayone/country/${this.props.country}`,
//         )
//         const json = await response.json()
//         console.log(json)
//         const data = json
//         const columns = [
//             { type: 'date', label: 'Date' },
//             { type: 'number', label: 'Confirmed' },
//         ]
//         let rows = []
//         const nonNullData = data.filter(row => row.value !== null)
//         for (let row of nonNullData) {
//             const { Confirmed } = row
//             const date = row.Date
//             console.log(date, Confirmed)
//             rows.push([new Date(Date.parse(date)), Confirmed])
//         }
//         this.setState({
//             chartData: [columns, ...rows],
//         })
//         console.log(this.state.chartData)
//     }
//     render() {
//         return (
//             <Chart
//                 chartType="LineChart"
//                 data={this.state.chartData}
//                 options={{
//                     hAxis: {
//                         format: 'dd mm',
//                     },
//                     vAxis: {
//                         format: 'short',
//                     },
//                     toolTip: {
//                         backgroundColor: "rgba(255, 7, 58, 0.125)",
//                         fontColor: "rgb(255, 7, 58)",
//                         borderColor: "rgba(255, 7, 58, 0.125)",
//                     },
//                     title: 'Confirmed',
//                 }}
//             />
//         )
//     }
// }




















