import React, { Component } from 'react';
import '../App.css';
import ConfirmedGraph from '../Graphs/confirmedGraph';
import RecoveredGraph from '../Graphs/recoveredGraph';
import DeathGraph from '../Graphs/deathGraph';
import ActiveGraph from './activeGraph';
class RootGraph extends Component {
    state = {
        country: [],
        submitted: false,
        countryValue: "",
        disabled: false,
        disabled1: true,
    }
    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value,
        });
    }
    handleClick = () => {
        this.setState({
            submitted: false,
            disabled1: true,
            disabled: false
        })
    }
    handleClick1 = () => {
        this.setState({
            submitted: true,
            disabled: true,
            disabled1: false
        })
    }
    render() {
        const { item } = this.props
        return (
            <div className="mainContainer3">
                <h2>COVID-19 Spread Trends - <span style={{ color: "#4c75f2" }}>{item.country}</span></h2>
                <span style={{ display: "flex" }}>
                    <select className="dropDown" name="country"
                        value={this.state.country} onChange={this.handleChange} >
                        <option value={item.country} className="dropDownOption">
                            {item.country}
                        </option>
                        {
                            this.props.areas.map((data, id) => (
                                <option value={data.country} key={data.country} className="dropDownOption" onClick={() => {
                                    this.setState({
                                        countryValue: ''
                                    })
                                    this.setState({
                                        countryValue: data.country
                                    })
                                }}>{data.country}</option>
                            ))
                        }
                    </select>
                    <span >
                        <span style={{ display: "flex", marginLeft: "22%" }}>
                            <p className="scaleModeText">Scale Modes</p>
                            <button className="scaleButton" onClick={this.handleClick} disabled={this.state.disabled1}>Linear</button>
                            <button className="scaleButton" onClick={this.handleClick1} disabled={this.state.disabled}>Logarithmic</button>
                        </span>
                    </span>
                </span>
                <div className="graphContainer">
                    <ConfirmedGraph
                        country={item.countryInfo.iso2}
                        countryValue={this.state.countryValue}
                        submitted={this.state.submitted}
                    />
                    <RecoveredGraph
                        country={item.countryInfo.iso2}
                        countryValue={this.state.countryValue}
                        submitted={this.state.submitted}
                    />
                </div>
                <div className="graphContainer">
                    <DeathGraph
                        country={item.countryInfo.iso2}
                        countryValue={this.state.countryValue}
                        submitted={this.state.submitted}
                    />
                    <ActiveGraph
                        country={item.countryInfo.iso2}
                        countryValue={this.state.countryValue}
                        submitted={this.state.submitted}
                    />
                </div>
            </div >
        )
    }
}
export default RootGraph;
