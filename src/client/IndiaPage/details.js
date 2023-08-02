import React, { Component } from 'react';
import Header from '../common/header.js'
import Table from './table.js';
import Overview from './overview.js';
import axios from 'axios';
import Footer from '../common/footer';
// import IndiaUpdates from './indiaUpdates';
class Details extends Component {
    state = {
        statewise: [],
        total: [],
        graphData: [],
        districtData: [],
        stateData: [],
        updates: [],
        direction: 'asc',
        districts: []
    }
    componentDidMount() {
        this.getMetaData();
        this.getResults();
        this.getUpdates();
        this.getDistrictResults();
        // setInterval(function () {
        //     window.location.reload();
        // }, 300000);
        setInterval(this.getResults, 100000);
        setInterval(this.getUpdates, 100000);
        setInterval(this.getMetaData, 100000);
        setInterval(this.getDistrictResults, 100000);
    }
    getResults = (url) => {
        axios
            .get(`https://api.covid19india.org/data.json`,
                {
                    revalidateOnMount: true,
                    refreshInterval: 100000,
                    revalidateOnFocus: false
                })
            .then(res => {
                const statewise = res.data.statewise;
                statewise.sort((a, b) => b.confirmed - a.confirmed);
                this.setState({
                    statewise: statewise,
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
    sortBy = (key) => {
        console.log(key)
        const normalizer = 1
        this.setState({
            statewise: this.state.statewise.sort((a, b) => (
                this.state.direction[key] === 'asc'
                    ? a[key] / normalizer - b[key] / normalizer
                    : b[key] / normalizer - a[key] / normalizer
            )),
            direction: {
                [key]: this.state.direction[key] === 'asc'
                    ? 'desc'
                    : 'asc'
            }
        })
    }
    getDistrictResults = (url) => {
        axios
            .get(`https://api.covid19india.org/v2/state_district_wise.json`,
                {
                    revalidateOnMount: true,
                    refreshInterval: 100000,
                    revalidateOnFocus: false
                })

            .then(res => {
                const districtData = res.data;
                districtData.sort((a, b) => b.confirmed - a.confirmed);
                this.setState({
                    districtData: districtData,
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
    getMetaData = (url) => {
        axios
            .get(`https://api.covid19india.org/v3/data.json`,
                {
                    revalidateOnMount: true,
                    refreshInterval: 100000,
                    revalidateOnFocus: false
                })
            .then(res => {
                const stateData = res.data;
                this.setState({
                    stateData: stateData,
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    getUpdates = () => {
        axios
            .get(`https://api.covid19india.org/updatelog/log.json`,
                {
                    revalidateOnMount: true,
                    refreshInterval: 100000,
                    revalidateOnFocus: false
                })
            .then(res => {
                const updates = res.data;
                this.setState({
                    updates: updates,
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
    render() {
        const { statewise } = this.state
        const length = statewise.length - 3
        const TT = 'TT'
        return (
            <div>
                <Header />
                <h3 className="header">COVID-19 Coronavirus Pandemic in <b>INDIA</b></h3>
                <Overview
                    stateData={this.state.stateData[TT]}
                />
                <div className="text">
                    <p className="plainText">Reported Cases, Recovered and Deaths by Territory, State or Conveyance</p>
                    <span className="spanText1">The coronavirus COVID-19 is affecting<b style={{ color: 'blue' }}> {length} States/Union territories in India.</b> The day is reset after midnight IST+0.</span>
                </div>
                <Table
                    sortBy={this.sortBy}
                    updates={this.state.updates}
                    total={this.state.total}
                    statewise={this.state.statewise}
                    stateData={this.state.stateData}
                    districtData={this.state.districtData} />
                <h3 className="footerText">#IndiaFightsCorona</h3>
                <Footer />

            </div>
        )

    }
}

export default Details;
