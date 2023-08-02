import React, { Component } from 'react';
// import { connect } from 'react-redux'
import { formatDistance } from 'date-fns';
import { formatNumber } from '../utils/commonfunctions.js';
class WorldOverView extends Component {
    render() {
        const { global } = this.props
        if (global.updated === undefined) {
            return null
        }
        else {
            const Updated = new Date(global.updated)
            const deltaactive = parseInt(global.todayRecovered) + parseInt(global.todayDeaths)
            return (
                <div className="mainContainer3">
                    <span className="textValue">WORLD</span>
                    <span className="textValue2">Last Updated:<span style={{ color: "#28a745", marginLeft: "3px" }}>{formatDistance(
                        new Date(Updated),
                        new Date())} ago </span> </span>
                    <div className="metaPopulation">
                        <div>
                            <p className="populationText">Population</p>
                            <p className="populationValue">{formatNumber(global.population)}</p>
                        </div>
                        <span className="metaSpanText">Based on 2019 population projection by DESAP report</span>
                    </div>
                    <div className="subMainContainer">
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(255,7,58,.12549)', color: 'rgba(255,7,58,.6)', marginTop: '1%' }}>
                            <div className="miniContainer">Confirmed</div>
                            <p className="miniContainer1" style={{ color: '#ff073a' }}>
                                {formatNumber(global.cases)}
                            </p>
                            {
                                global.todayCases > 0 ? <p style={{ textAlign: "center", fontSize: "0.8em", marginTop: "-10px" }}>
                                    +{formatNumber(global.todayCases)}
                                </p>
                                    : null
                            }
                        </div>
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(0,123,255,.0627451)', color: '#007bff', marginTop: '1%' }}>
                            <div className="miniContainer" style={{ color: 'rgba(0,123,255,.6)' }}>Active</div>
                            <p className="miniContainer1" >
                                {formatNumber(global.active)}
                            </p>
                            {
                                global.todayCases - deltaactive > 0 ?
                                    <p style={{ textAlign: "center", fontSize: "0.8em", marginTop: "-10px" }}>
                                        +{formatNumber(global.todayCases - deltaactive)}
                                    </p>
                                    :
                                    deltaactive - global.todayCases !== 0 ? < p style={{ textAlign: "center", fontSize: "0.8em", marginTop: "-10px" }}>
                                        -{formatNumber(deltaactive - global.todayCases)}
                                    </p> : null
                            }
                        </div>
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(40,167,69,.12549)', color: 'rgba(40,167,69,.6)', marginTop: '1%' }}>
                            <div className="miniContainer"> Recovered</div>
                            <p className="miniContainer1" style={{ color: '#28a745' }}>
                                {formatNumber(global.recovered)}
                            </p>
                            {
                                global.todayRecovered > 0 ? <p style={{ textAlign: "center", fontSize: "0.8em", marginTop: "-10px" }}>
                                    +{formatNumber(global.todayRecovered)}
                                </p>
                                    : null
                            }
                        </div>
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(108,117,125,.0627451)', color: 'rgba(108,117,125,.6)', marginTop: '1%' }}>
                            <div className="miniContainer" >Deaths</div>
                            <p className="miniContainer1" style={{ color: '#6c757d' }}>
                                {formatNumber(global.deaths)}
                            </p>
                            {
                                global.todayDeaths > 0 ? <p style={{ textAlign: "center", fontSize: "0.8em", marginTop: "-10px" }}>
                                    +{formatNumber(global.todayDeaths)}
                                </p>
                                    : null
                            }
                        </div>
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(32,26,162,.12549)', color: 'rgba(32,26,162,.6)', marginTop: '1%' }}>
                            <div className="miniContainer" >Tests</div>
                            <p className="miniContainer1" style={{ color: 'rgba(32,26,162,.866667)' }}>
                                {formatNumber(global.tests)}
                            </p>
                        </div>

                    </div>
                    <div className="subMainContainer">
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(255,7,58,.12549)', color: 'rgba(255,7,58,.6)', marginTop: '3%' }}>
                            <div className="miniContainer">Confirmed/10L pop</div>
                            <p className="miniContainer1" style={{ color: '#ff073a' }}>
                                {formatNumber(global.casesPerOneMillion)}
                            </p>
                        </div>
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(0,123,255,.0627451)', color: '#007bff', marginTop: '3%' }}>
                            <div className="miniContainer" style={{ color: 'rgba(0,123,255,.6)' }}>Active/10L pop</div>
                            <p className="miniContainer1" >
                                {formatNumber(global.activePerOneMillion)}
                            </p>
                        </div>
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(40,167,69,.12549)', color: 'rgba(40,167,69,.6)', marginTop: '3%' }}>
                            <div className="miniContainer"> Recovered/10L pop</div>
                            <p className="miniContainer1" style={{ color: '#28a745' }}>
                                {formatNumber(global.recoveredPerOneMillion)}
                            </p>
                        </div>
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(108,117,125,.0627451)', color: 'rgba(108,117,125,.6)', marginTop: '3%' }}>
                            <div className="miniContainer" >Deaths/10L pop</div>
                            <p className="miniContainer1" style={{ color: '#6c757d' }}>
                                {formatNumber(global.activePerOneMillion)}
                            </p>
                        </div>
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(32,26,162,.12549)', color: 'rgba(32,26,162,.6)', marginTop: '3%' }}>
                            <div className="miniContainer" >Tests/10L pop</div>
                            <p className="miniContainer1" style={{ color: 'rgba(32,26,162,.866667)' }}>
                                {formatNumber(global.testsPerOneMillion)}
                            </p>
                        </div>
                    </div>
                    <div className="subMainContainer">
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(0,123,255,.0627451)', color: 'rgba(0, 123, 255, 0.6)', marginTop: "3%" }}>
                            <div className="miniContainer" style={{ color: 'rgba(0,123,255,.6)' }}>Active rate</div>
                            <p className="miniContainer1" style={{ color: '#007bff' }}>
                                {formatNumber([global.active / global.cases] * 100)} %
                        </p>
                        </div>
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(40,167,69,.12549)', color: 'rgba(40,167,69,.6)', marginTop: "3%" }}>
                            <div className="miniContainer"> Recovery Rate</div>
                            <p className="miniContainer1" style={{ color: '#28a745' }}>
                                {formatNumber([global.recovered / global.cases] * 100)} %
                        </p>
                        </div>
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(108,117,125,.0627451)', color: 'rgba(108,117,125,.6)', marginTop: "3%" }}>
                            <div className="miniContainer" >Death Rate</div>
                            <p className="miniContainer1" style={{ color: '#6c757d' }}>
                                {formatNumber([global.deaths / global.cases] * 100)} %
                        </p>
                        </div>
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgb(254, 221, 206)', color: 'rgb(241, 151, 105)', marginTop: '3%' }}>
                            <div className="miniContainer" >Critical</div>
                            <p className="miniContainer1" style={{ color: 'rgb(201, 106, 72)' }}>
                                {formatNumber(global.critical)}
                            </p>
                        </div>
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgb(254, 221, 206)', color: 'rgb(241, 151, 105)', marginTop: '3%' }}>
                            <div className="miniContainer" >Critical/10L pop</div>
                            <p className="miniContainer1" style={{ color: 'rgb(201, 106, 72)' }}>
                                {formatNumber(global.criticalPerOneMillion)}
                            </p>
                        </div>

                    </div>
                    <div className="subMainContainer">
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(255,7,58,.12549)', color: 'rgba(255,7,58,.6)', marginTop: '3%' }}>
                            <div className="miniContainer" >OneCase/People</div>
                            <p className="miniContainer1" style={{ color: '#ff073a' }}>
                                {formatNumber(global.oneCasePerPeople)}
                            </p>
                        </div>
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(108,117,125,.0627451)', color: 'rgba(108,117,125,.6)', marginTop: '3%' }}>
                            <div className="miniContainer" >OneDeath/People</div>
                            <p className="miniContainer1" style={{ color: '#6c757d' }}>
                                {formatNumber(global.oneDeathPerPeople)}
                            </p>
                        </div>
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(32,26,162,.12549)', color: 'rgba(32,26,162,.6)', marginTop: '3%' }}>
                            <div className="miniContainer" >OneTest/People</div>
                            <p className="miniContainer1" style={{ color: 'rgba(32,26,162,.866667)' }}>
                                {formatNumber(global.oneTestPerPeople)}
                            </p>
                        </div>

                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgb(202, 202, 250)', color: '#8080FF', marginTop: '3%' }}>
                            <div className="miniContainer" >Countries Affected</div>
                            <p className="miniContainer1" style={{ color: 'rgb(57, 57, 236)' }}>
                                {formatNumber(global.affectedCountries)}
                            </p>
                        </div>

                    </div>
                </div >
            )
        }
    }
}
export default WorldOverView;