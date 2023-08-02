import React, { Component } from 'react';
import { formatNumber, } from '../utils/commonfunctions.js';
import { formatDistance } from 'date-fns';
class CountryOverView extends Component {
    render() {
        const { item } = this.props
        if (item.updated === undefined) {
            return null
        }
        else {
            const updatedTime = new Date(item.updated)
            const deltaactive = parseInt(item.todayRecovered) + parseInt(item.todayDeaths)
            return (
                <div className="mainContainer3">
                    <span className="textValue"><img src={item.countryInfo.flag} alt="country" style={{ width: '31px', height: '22px', marginRight: '4px' }} />{item.country}-({item.countryInfo.iso2})</span>
                    <span className="textValue2">Last Updated:
                    <span style={{ color: "#28a745", marginLeft: "3px" }}>
                            {formatDistance(
                                new Date(updatedTime),
                                new Date())} ago </span>
                    </span>
                    <div className="metaPopulation">
                        <div>
                            <p className="populationText">Population</p>
                            <p className="populationValue">{formatNumber(item.population)}</p>
                        </div>
                        <span className="metaSpanText">Based on 2019 population projection by DESAP report</span>
                    </div>
                    <div className="subMainContainer">
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(255,7,58,.12549)', color: 'rgba(255,7,58,.6)', marginTop: '1%' }}>
                            <div className="miniContainer">Confirmed</div>
                            <p className="miniContainer1" style={{ color: '#ff073a' }}>
                                {formatNumber(item.cases)}
                            </p>
                            {
                                item.todayCases > 0 ? <p style={{ textAlign: "center", fontSize: "0.8em", marginTop: "-10px" }}>
                                    + {formatNumber(item.todayCases)}
                                </p>
                                    : null
                            }
                        </div>
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(0,123,255,.0627451)', color: '#007bff', marginTop: '1%' }}>
                            <div className="miniContainer" style={{ color: 'rgba(0,123,255,.6)' }}>Active</div>
                            <p className="miniContainer1" >
                                {formatNumber(item.active)}
                            </p>
                            {
                                item.todayCases - deltaactive > 0 ?
                                    <p style={{ textAlign: "center", fontSize: "0.9em", marginTop: "-10px" }}>
                                        +{formatNumber(item.todayCases - deltaactive)}
                                    </p>
                                    : deltaactive - item.todayCases !==0 ? < p style={{ textAlign: "center", fontSize: "0.8em", marginTop: "-10px" }}>
                                        -{formatNumber(deltaactive - item.todayCases)}
                                    </p> : null
                            }
                        </div>
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(40,167,69,.12549)', color: 'rgba(40,167,69,.6)', marginTop: '1%' }}>
                            <div className="miniContainer"> Recovered</div>
                            <p className="miniContainer1" style={{ color: '#28a745' }}>
                                {formatNumber(item.recovered)}
                            </p>
                            {
                                item.todayRecovered > 0 ? <p style={{ textAlign: "center", fontSize: "0.8em", marginTop: "-10px" }}>
                                    +{formatNumber(item.todayRecovered)}
                                </p>
                                    : null
                            }
                        </div>
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(108,117,125,.0627451)', color: 'rgba(108,117,125,.6)', marginTop: '1%' }}>
                            <div className="miniContainer" >Deaths</div>
                            <p className="miniContainer1" style={{ color: '#6c757d' }}>
                                {formatNumber(item.deaths)}
                            </p>
                            {
                                item.todayDeaths > 0 ? <p style={{ textAlign: "center", fontSize: "0.8em", marginTop: "-10px" }}>
                                    + {formatNumber(item.todayDeaths)}
                                </p>
                                    : null
                            }
                        </div>
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(32,26,162,.12549)', color: 'rgba(32,26,162,.6)', marginTop: '1%' }}>
                            <div className="miniContainer" >Tests</div>
                            <p className="miniContainer1" style={{ color: 'rgba(32,26,162,.866667)' }}>
                                {formatNumber(item.tests)}
                            </p>
                        </div>

                    </div>
                    <div className="subMainContainer">
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(255,7,58,.12549)', color: 'rgba(255,7,58,.6)', marginTop: '3%' }}>
                            <div className="miniContainer">Confirmed/10L pop</div>
                            <p className="miniContainer1" style={{ color: '#ff073a' }}>
                                {formatNumber(item.casesPerOneMillion)}
                            </p>
                        </div>
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(0,123,255,.0627451)', color: '#007bff', marginTop: '3%' }}>
                            <div className="miniContainer" style={{ color: 'rgba(0,123,255,.6)' }}>Active/10L pop</div>
                            <p className="miniContainer1" >
                                {formatNumber(item.activePerOneMillion)}
                            </p>
                        </div>
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(40,167,69,.12549)', color: 'rgba(40,167,69,.6)', marginTop: '3%' }}>
                            <div className="miniContainer"> Recovered/10L pop</div>
                            <p className="miniContainer1" style={{ color: '#28a745' }}>
                                {formatNumber(item.recoveredPerOneMillion)}
                            </p>
                        </div>
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(108,117,125,.0627451)', color: 'rgba(108,117,125,.6)', marginTop: '3%' }}>
                            <div className="miniContainer" >Deaths/10L pop</div>
                            <p className="miniContainer1" style={{ color: '#6c757d' }}>
                                {formatNumber(item.deathsPerOneMillion)}
                            </p>
                        </div>
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(32,26,162,.12549)', color: 'rgba(32,26,162,.6)', marginTop: '3%' }}>
                            <div className="miniContainer" >Tests/10L pop</div>
                            <p className="miniContainer1" style={{ color: 'rgba(32,26,162,.866667)' }}>
                                {formatNumber(item.testsPerOneMillion)}
                            </p>
                        </div>
                    </div>
                    <div className="subMainContainer">
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(0,123,255,.0627451)', color: 'rgba(0, 123, 255, 0.6)', marginTop: "3%" }}>
                            <div className="miniContainer" style={{ color: 'rgba(0,123,255,.6)' }}>Active rate</div>
                            <p className="miniContainer1" style={{ color: '#007bff' }}>
                                {formatNumber([item.active / item.cases] * 100)} %
                        </p>
                        </div>
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(40,167,69,.12549)', color: 'rgba(40,167,69,.6)', marginTop: "3%" }}>
                            <div className="miniContainer"> Recovery Rate</div>
                            <p className="miniContainer1" style={{ color: '#28a745' }}>
                                {formatNumber([item.recovered / item.cases] * 100)} %
                        </p>
                        </div>
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(108,117,125,.0627451)', color: 'rgba(108,117,125,.6)', marginTop: "3%" }}>
                            <div className="miniContainer" >Death Rate</div>
                            <p className="miniContainer1" style={{ color: '#6c757d' }}>
                                {formatNumber([item.deaths / item.cases] * 100)} %
                        </p>
                        </div>
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgb(254, 221, 206)', color: 'rgb(241, 151, 105)', marginTop: '3%' }}>
                            <div className="miniContainer" >Critical</div>
                            <p className="miniContainer1" style={{ color: 'rgb(201, 106, 72)' }}>
                                {formatNumber(item.critical)}
                            </p>
                        </div>
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgb(254, 221, 206)', color: 'rgb(241, 151, 105)', marginTop: '3%' }}>
                            <div className="miniContainer" >Critical/10L pop</div>
                            <p className="miniContainer1" style={{ color: 'rgb(201, 106, 72)' }}>
                                {formatNumber(item.criticalPerOneMillion)}
                            </p>
                        </div>
                    </div>
                    <div className="subMainContainer">
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(255,7,58,.12549)', color: 'rgba(255,7,58,.6)', marginTop: '3%' }}>
                            <div className="miniContainer" >OneCase/People</div>
                            <p className="miniContainer1" style={{ color: '#ff073a' }}>
                                {formatNumber(item.oneCasePerPeople)}
                            </p>
                        </div>
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(108,117,125,.0627451)', color: 'rgba(108,117,125,.6)', marginTop: '3%' }}>
                            <div className="miniContainer" >OneDeath/People</div>
                            <p className="miniContainer1" style={{ color: '#6c757d' }}>
                                {formatNumber(item.oneDeathPerPeople)}
                            </p>
                        </div>
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(32,26,162,.12549)', color: 'rgba(32,26,162,.6)', marginTop: '3%' }}>
                            <div className="miniContainer" >OneTest/People</div>
                            <p className="miniContainer1" style={{ color: 'rgba(32,26,162,.866667)' }}>
                                {formatNumber(item.oneTestPerPeople)}
                            </p>
                        </div>

                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgb(202, 202, 250)', color: '#8080FF', marginTop: '3%' }}>
                            <div className="miniContainer" >Continent</div>
                            <p className="miniContainer1" style={{ color: 'rgb(57, 57, 236)' }}>
                                {item.continent}
                            </p>
                        </div>

                    </div>
                </div >
            )
        }
    }
}
export default CountryOverView
