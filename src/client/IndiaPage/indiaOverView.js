import React, { Component } from 'react';
import ConfirmedGraph from '../Graphs/confirmedGraph';
import RecoveredGraph from '../Graphs/recoveredGraph';
import DeathGraph from '../Graphs/deathGraph';
import ActiveGraph from '../Graphs/activeGraph';
import TopStates from '../Graphs/topStates.jsx'
import { formatNumber, formatDate } from '../utils/commonfunctions.js';
import { INDIA_POPULATION } from '../constants.js'
import Moment from 'react-moment';
class IndiaOverView extends Component {
    state = {
        submitted: false,
        disabled: false,
        disabled1: true
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
        const { stateData } = this.props
        if (stateData === undefined || stateData.delta === undefined) {
            return null
        }
        else {
            const active = stateData.total.confirmed - stateData.total.recovered - stateData.total.deceased
            const deltaactive = parseInt(stateData.delta.recovered) + parseInt(stateData.delta.deceased)
            return (
                <div className="mainContainer2">
                    <span className="textValue">INDIA-(IN)</span>
                    <span className="textValue1">Last Updated:
                    <Moment fromNow ago style={{ color: "#28a745", marginLeft: "3px" }}>{stateData.meta.last_updated}</Moment>  <span style={{ color: "#28a745" }}>ago</span>
                    </span>
                    <div className="metaPopulation">
                        <div>
                            <p className="populationText">Population</p>
                            <p className="populationValue">{formatNumber(INDIA_POPULATION.IN)}</p>
                        </div>
                        <span className="metaSpanText">Based on 2019 population projection by NCP report</span>
                    </div>
                    <div className="subMainContainer">
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(255,7,58,.12549)', color: 'rgba(255,7,58,.6)', marginTop: '1%' }}>
                            <div className="miniContainer">Confirmed</div>
                            <p className="miniContainer1" style={{ color: '#ff073a' }}>
                                {formatNumber(stateData.total.confirmed)}
                            </p>
                            {
                                stateData.delta.confirmed > 0 ? <p style={{ textAlign: "center", fontSize: "0.8em", marginTop: "-10px" }}>
                                    + {formatNumber(stateData.delta.confirmed)}
                                </p>
                                    : null
                            }
                        </div>
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(0,123,255,.0627451)', color: '#007bff', marginTop: '1%' }}>
                            <div className="miniContainer" style={{ color: 'rgba(0,123,255,.6)' }}>Active</div>
                            <p className="miniContainer1" >
                                {formatNumber(active)}
                            </p>
                            {
                                stateData.delta.confirmed - deltaactive > 0 ?
                                    <p style={{ textAlign: "center", fontSize: "0.8em", marginTop: "-10px" }}>
                                        +{formatNumber(stateData.delta.confirmed - stateData.delta.recovered - stateData.delta.deceased)}
                                    </p>
                                    : deltaactive - stateData.delta.confirmed !== 0 ? <p style={{ textAlign: "center", fontSize: "0.8em", marginTop: "-10px" }}>
                                        -{formatNumber(deltaactive - stateData.delta.confirmed)}
                                    </p> : null
                            }
                        </div>
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(40,167,69,.12549)', color: 'rgba(40,167,69,.6)', marginTop: '1%' }}>
                            <div className="miniContainer"> Recovered</div>
                            <p className="miniContainer1" style={{ color: '#28a745' }}>
                                {formatNumber(stateData.total.recovered)}
                            </p>
                            {
                                stateData.delta.recovered > 0 ?
                                    <p style={{ textAlign: "center", fontSize: "0.8em", marginTop: "-10px" }}>
                                        +
                                    {formatNumber(stateData.delta.recovered)}
                                    </p>
                                    : null
                            }
                        </div>
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(108,117,125,.0627451)', color: 'rgba(108,117,125,.6)', marginTop: '1%' }}>
                            <div className="miniContainer" >Deaths</div>
                            <p className="miniContainer1" style={{ color: '#6c757d' }}>
                                {formatNumber(stateData.total.deceased)}
                            </p>
                            {
                                stateData.delta.deceased > 0 ?
                                    <p style={{ textAlign: "center", fontSize: "0.8em", marginTop: "-10px" }}>
                                        + {formatNumber(stateData.delta.deceased)}
                                    </p>
                                    : null
                            }
                        </div>
                        < div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(32,26,162,.12549)', color: 'rgba(32,26,162,.6)', marginTop: '1%' }}>
                            <div className="miniContainer" >Tested</div>
                            <p className="miniContainer1" style={{ color: 'rgba(32,26,162,.866667)' }}>
                                {formatNumber(stateData.total.tested)}
                            </p>
                            {
                                stateData.delta.tested > 0 ?
                                    <p style={{ textAlign: "center", fontSize: "0.8em", marginTop: "-10px" }}>
                                        +{formatNumber(stateData.delta.tested)}
                                    </p>
                                    : null
                            }
                            <p style={{ textAlign: "center", fontSize: "0.9em", marginTop: "-8px" }}>
                                As of {formatDate(stateData.meta.tested.last_updated, 'dd MMM')}
                            </p>
                        </div>
                    </div>
                    <div className="subMainContainer">
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(255,7,58,.12549)', color: 'rgba(255,7,58,.6)', marginTop: "2%" }}>
                            <div className="miniContainer"> Confirmed/10L pop</div>
                            <p className="miniContainer1" style={{ color: '#ff073a' }}>
                                {formatNumber([stateData.total.confirmed / INDIA_POPULATION.IN] * 1000000)}
                            </p>
                        </div>
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(0,123,255,.0627451)', color: 'rgba(0, 123, 255, 0.6)', marginTop: "2%" }}>
                            <div className="miniContainer" style={{ color: 'rgba(0,123,255,.6)' }}>Active/10L pop</div>
                            <p className="miniContainer1" style={{ color: '#007bff' }}>
                                {formatNumber([active / INDIA_POPULATION.IN] * 1000000)}
                            </p>
                        </div>
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(40,167,69,.12549)', color: 'rgba(40,167,69,.6)', marginTop: "2%" }}>
                            <div className="miniContainer"> Recovered/10L pop</div>
                            <p className="miniContainer1" style={{ color: '#28a745' }}>
                                {formatNumber([stateData.total.recovered / INDIA_POPULATION.IN] * 1000000)}
                            </p>
                        </div>
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(108,117,125,.0627451)', color: 'rgba(108,117,125,.6)', marginTop: "2%" }}>
                            <div className="miniContainer" >Deaths/10L pop</div>
                            <p className="miniContainer1" style={{ color: '#6c757d' }}>
                                {formatNumber([stateData.total.deceased / INDIA_POPULATION.IN] * 1000000)}
                            </p>
                        </div>
                        < div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(32,26,162,.12549)', color: 'rgba(32,26,162,.6)', marginTop: "2%" }}>
                            <div className="miniContainer" >Tested/10L pop</div>
                            <p className="miniContainer1" style={{ color: 'rgba(32,26,162,.866667)' }}>
                                {formatNumber([stateData.total.tested / INDIA_POPULATION.IN] * 1000000)}
                            </p>
                        </div>
                    </div>
                    <div className="subMainContainer">
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(0,123,255,.0627451)', color: 'rgba(0, 123, 255, 0.6)', marginTop: "2%" }}>
                            <div className="miniContainer" style={{ color: 'rgba(0,123,255,.6)' }}>Active rate</div>
                            <p className="miniContainer1" style={{ color: '#007bff' }}>
                                {formatNumber([active / stateData.total.confirmed] * 100)} %
                        </p>
                        </div>
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(40,167,69,.12549)', color: 'rgba(40,167,69,.6)', marginTop: "2%" }}>
                            <div className="miniContainer"> Recovery Rate</div>
                            <p className="miniContainer1" style={{ color: '#28a745' }}>
                                {formatNumber([stateData.total.recovered / stateData.total.confirmed] * 100)} %
                        </p>
                        </div>
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(108,117,125,.0627451)', color: 'rgba(108,117,125,.6)', marginTop: "2%" }}>
                            <div className="miniContainer" >Death Rate</div>
                            <p className="miniContainer1" style={{ color: '#6c757d' }}>
                                {formatNumber([stateData.total.deceased / stateData.total.confirmed] * 100)} %
                        </p>
                        </div>
                    </div>
                    <div className="subMainContainer">
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(255,7,58,.12549)', color: 'rgba(255,7,58,.6)', marginTop: '2%' }}>
                            <div className="miniContainer" >OneCase/People</div>
                            <p className="miniContainer1" style={{ color: '#ff073a' }}>
                                {formatNumber([INDIA_POPULATION.IN / stateData.total.confirmed])}
                            </p>
                        </div>
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(108,117,125,.0627451)', color: 'rgba(108,117,125,.6)', marginTop: '2%' }}>
                            <div className="miniContainer" >OneDeath/People</div>
                            <p className="miniContainer1" style={{ color: '#6c757d' }}>
                                {formatNumber([INDIA_POPULATION.IN / stateData.total.deceased])}
                            </p>
                        </div>
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(32,26,162,.12549)', color: 'rgba(32,26,162,.6)', marginTop: '2%' }}>
                            <div className="miniContainer" >OneTest/People</div>
                            <p className="miniContainer1" style={{ color: 'rgba(32,26,162,.866667)' }}>
                                {formatNumber([INDIA_POPULATION.IN / stateData.total.tested])}
                            </p>
                        </div>
                    </div>
                    <TopStates
                        statewise={this.props.statewise}
                    />
                    <h2>COVID-19 Spread Trends- <span style={{ color: "#4c75f2" }}>India</span></h2>
                    <p className="scaleModeText1">Scale Modes</p>
                    <span>
                        <button className="scaleButton" onClick={this.handleClick} disabled={this.state.disabled1}>Linear</button>
                        <button className="scaleButton" onClick={this.handleClick1} disabled={this.state.disabled}>Logarithmic</button>
                    </span>
                    <div className="graphContainer">
                        <ConfirmedGraph
                            country='India'
                            submitted={this.state.submitted}
                        />
                        <RecoveredGraph
                            country='India'
                            submitted={this.state.submitted}
                        />
                    </div>
                    <div className="graphContainer">
                        <DeathGraph
                            country='India'
                            submitted={this.state.submitted}
                        />
                        <ActiveGraph
                            country='India'
                            submitted={this.state.submitted}
                        />
                    </div>
                </div >
            )
        }
    }

}

export default IndiaOverView;
