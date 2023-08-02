/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import CanvasJSReact from '../assets/canvasjs.react.js';
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
class TopStates extends Component {
    state = {
        dataPoints: []
    }
    componentDidMount = () => {
        this.graphData()
    }
    graphData = () => {
        const { dataPoints } = this.state
        const normalizer = 1
        const chart = this.chart
        fetch(`https://api.covid19india.org/data.json`)
            .then(function (response) {
                return response.json()
            })
            .then(function (data) {
                const statewise = data.statewise
                statewise.sort((a, b) => b.confirmed - a.confirmed);
                for (let i = 1; i < 9; i++) {
                    const count = statewise[i].confirmed / normalizer
                    dataPoints.push({
                        y: count,
                        label: statewise[i].state
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
            animationEnabled: true,
            theme: "dark",
            title: {
                text: "Top 8 States affected due to COVID-19",
            },
            axisX: {
                reversed: true,
                lineThickness: 0

            },
            axisY: {
                title: "Confirmed_Cases",
                labelFormatter: this.addSymbols,
                gridThickness: 0,
                interval: 80000,
                lineThickness: 0
            },

            data: [{
                type: "bar",
                dataPoints: this.state.dataPoints,
                toolTipContent: "<strong>Confirmed_Cases</strong><br/><strong>{label}</strong><br/> <strong>{y}</strong> Cases",
            }]
        }
        return (
            <div className="topStatesGraph" >
                <CanvasJSChart style={{ height: '400px' }}
                    options={options}
                    onRef={ref => this.chart = ref}
                />
            </div>
        );
    }
}
export default TopStates
