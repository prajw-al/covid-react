/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import CanvasJSReact from '../assets/canvasjs.react.js';
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
class TopDistricts extends Component {
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
        const district = []
        const { districtData, stateCode } = this.props
        const normalizer = 1
        const chart = this.chart
        for (let i = 1; i < districtData.length; i++) {
            if (districtData[i].statecode === stateCode) {
                district.push({
                    state: districtData[i]
                })
            }
        }
        const districts = district[0].state.districtData.sort((a, b) => b.confirmed - a.confirmed);
        for (let i = 0; i < 5; i++) {
            const count = districts[i].confirmed / normalizer
            dataPoints.push({
                y: count,
                label: districts[i].district
            });
            chart.render();
        }
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
            animationEnabled: true,
            width: 400,
            theme: "dark",
            title: {
                text: "Top 5 districts affected due to COVID-19",
            },
            dataPointWidth: 30,
            axisX: {
                lineThickness: 0,
                gridThickness: 0,
                xValueFormatString: " ",
                title: "",
                tickLength: 0,
                labelFontSize: 15,
                labelFontWeight: 900,
            },
            axisY: {
                labelFormatter: this.addSymbols,
                gridThickness: 0,
                lineThickness: 0,
                yValueFormatString: " ",
                title: "",
                tickLength: 0,
                labelFontSize: 0,
            },
            data: [{
                type: "column",
                color: 'rgba(255, 7, 58, 0.5647058823529412)',
                cornerRadius: 10,
                indexLabel: "{y}",
                indexLabelFontSize: 15,
                indexLabelFontWeight: 900,
                indexLabelPlacement: "outside",
                dataPoints: this.state.dataPoints,
                toolTipContent: "<strong>Confirmed_Cases</strong><br/><strong>{label}</strong><br/> <strong>{y}</strong> Cases",
            }]

        }
        return (
            <React.Fragment>
                <div className="graph-buttons">
                    <button className="graph-button confirmed" onClick={() => {
                        console.log("confirmed clicked")
                    }}></button>
                    <button className="graph-button active"></button>
                    <button className="graph-button recovered"></button>
                    <button className="graph-button deceased"></button>
                </div>
                <div className="topDistrictsGraph" >
                    <CanvasJSChart style={{ height: '400px' }}
                        options={options}
                        onRef={ref => this.chart = ref}
                    />
                </div>
            </React.Fragment>
        );
    }
}
export default TopDistricts
