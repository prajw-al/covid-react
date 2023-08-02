import React, { Component } from 'react';
import DistrictOverView from './districtTable';
import { formatNumber, formatDate } from '../utils/commonfunctions.js';
import { STATE_POPULATIONS } from '../constants.js'
import Moment from 'react-moment';
import TopDistricts from '../Graphs/topDistricts';
class StateOverView extends Component {
    render() {
        const { item, stateData } = this.props
        if (stateData === undefined) {
            return null
        }
        else {
            const time = stateData[item.statecode].meta.last_updated
            const deltaactive = parseInt(item.deltarecovered) + parseInt(item.deltadeaths)
            return (
                <div className="mainContainer2" >
                    {
                        item.state === "Total" && item.statecode === "TT" ?
                            <span className="textValue">INDIA- (IN)</span> : <span className="textValue">{item.state} - ({item.statecode})</span>
                    }
                    < span className="textValue1" > Last Updated:<Moment fromNow ago style={{ color: "#28a745", marginLeft: "3px" }}>{time}</Moment>  <span style={{ color: "#28a745" }}>ago</span>
                    </span >
                    <div className="metaPopulation">
                        <div>
                            <p className="populationText">Population</p>
                            <p className="populationValue">{formatNumber(STATE_POPULATIONS[item.statecode])}</p>
                        </div>
                        <span className="metaSpanText">Based on 2019 population projection by NCP report</span>
                    </div>
                    <div className="subMainContainer">
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(255,7,58,.12549)', color: 'rgba(255,7,58,.6)' }}>
                            <div className="miniContainer"> Confirmed</div>
                            <p className="miniContainer1" style={{ color: '#ff073a' }}>
                                {formatNumber(item.confirmed)}
                            </p>
                            {
                                item.deltaconfirmed > 0 ? <p style={{ textAlign: "center", fontSize: "0.8em", marginTop: "-10px" }}>
                                    +{formatNumber(item.deltaconfirmed)}
                                </p>
                                    : null
                            }
                        </div>
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(0,123,255,.0627451)', color: 'rgba(0, 123, 255, 0.6)' }}>
                            <div className="miniContainer" style={{ color: 'rgba(0,123,255,.6)' }}>Active</div>
                            <p className="miniContainer1" style={{ color: '#007bff' }}>
                                {formatNumber(item.active)}
                            </p>
                            {
                                item.deltaconfirmed - deltaactive > 0 ?
                                    <p style={{ textAlign: "center", fontSize: "0.8em", marginTop: "-10px" }}>
                                        +{formatNumber(item.deltaconfirmed - deltaactive)}
                                    </p>
                                    : deltaactive - item.deltaconfirmed !== 0 ? <p style={{ textAlign: "center", fontSize: "0.8em", marginTop: "-10px" }}>
                                        -{formatNumber(deltaactive - item.deltaconfirmed)}
                                    </p> : null
                            }
                        </div>
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(40,167,69,.12549)', color: 'rgba(40,167,69,.6)' }}>
                            <div className="miniContainer"> Recovered</div>
                            <p className="miniContainer1" style={{ color: '#28a745' }}>
                                {formatNumber(item.recovered)}
                            </p>
                            {
                                item.deltarecovered > 0 ?
                                    <p style={{ textAlign: "center", fontSize: "0.8em", marginTop: "-10px" }}>
                                        +{formatNumber(item.deltarecovered)}
                                    </p>
                                    : null
                            }
                        </div>
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(108,117,125,.0627451)', color: 'rgba(108,117,125,.6)' }}>
                            <div className="miniContainer" >Deaths</div>
                            <p className="miniContainer1" style={{ color: '#6c757d' }}>
                                {formatNumber(item.deaths)}
                            </p>
                            {
                                item.deltadeaths > 0 ?
                                    <p style={{ textAlign: "center", fontSize: "0.8em", marginTop: "-10px" }}>
                                        +{formatNumber(item.deltadeaths)}
                                    </p>
                                    : null
                            }
                        </div>
                        {
                            item.statecode === "LD" ? null : item.statecode === "UN" ? null :
                                < div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(32,26,162,.12549)', color: 'rgba(32,26,162,.6)' }}>
                                    <div className="miniContainer" >Tested</div>
                                    <p className="miniContainer1" style={{ color: 'rgba(32,26,162,.866667)' }}>
                                        {formatNumber(stateData[item.statecode].total.tested)}
                                    </p>
                                    {
                                        stateData[item.statecode].delta !== undefined ?
                                            stateData[item.statecode].delta.tested > 0 && stateData[item.statecode].delta.tested !== undefined ?
                                                <p style={{ textAlign: "center", fontSize: "0.8em", marginTop: "-10px" }}>
                                                    +{formatNumber(stateData[item.statecode].delta.tested)}
                                                </p>
                                                : null
                                            : null
                                    }
                                    {
                                        stateData[item.statecode].meta.tested !== undefined ?
                                            <p style={{ textAlign: "center", fontSize: "0.9em", marginTop: "-8px" }}>
                                                As of {formatDate(stateData[item.statecode].meta.tested.last_updated, 'dd MMM')}
                                            </p> : null
                                    }
                                </div>
                        }
                    </div>
                    <div className="subMainContainer">
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(255,7,58,.12549)', color: 'rgba(255,7,58,.6)', marginTop: "2%" }}>
                            <div className="miniContainer"> Confirmed/10L pop</div>
                            <p className="miniContainer1" style={{ color: '#ff073a' }}>
                                {formatNumber([item.confirmed / STATE_POPULATIONS[item.statecode]] * 1000000)}
                            </p>
                        </div>
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(0,123,255,.0627451)', color: 'rgba(0, 123, 255, 0.6)', marginTop: "2%" }}>
                            <div className="miniContainer" style={{ color: 'rgba(0,123,255,.6)' }}>Active/10L pop</div>
                            <p className="miniContainer1" style={{ color: '#007bff' }}>
                                {formatNumber([item.active / STATE_POPULATIONS[item.statecode]] * 1000000)}
                            </p>
                        </div>
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(40,167,69,.12549)', color: 'rgba(40,167,69,.6)', marginTop: "2%" }}>
                            <div className="miniContainer"> Recovered/10L pop</div>
                            <p className="miniContainer1" style={{ color: '#28a745' }}>
                                {formatNumber([item.recovered / STATE_POPULATIONS[item.statecode]] * 1000000)}
                            </p>
                        </div>
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(108,117,125,.0627451)', color: 'rgba(108,117,125,.6)', marginTop: "2%" }}>
                            <div className="miniContainer" >Deaths/10L pop</div>
                            <p className="miniContainer1" style={{ color: '#6c757d' }}>
                                {formatNumber([item.deaths / STATE_POPULATIONS[item.statecode]] * 1000000)}
                            </p>
                        </div>
                        {
                            item.statecode === "LD" ? null : item.statecode === "UN" ? null :
                                < div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(32,26,162,.12549)', color: 'rgba(32,26,162,.6)', marginTop: "2%" }}>
                                    <div className="miniContainer" >Tested/10L pop</div>
                                    <p className="miniContainer1" style={{ color: 'rgba(32,26,162,.866667)' }}>
                                        {formatNumber([stateData[item.statecode].total.tested / STATE_POPULATIONS[item.statecode]] * 1000000)}
                                    </p>
                                </div>
                        }
                    </div>
                    <div className="subMainContainer">
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(0,123,255,.0627451)', color: 'rgba(0, 123, 255, 0.6)', marginTop: "2%" }}>
                            <div className="miniContainer" style={{ color: 'rgba(0,123,255,.6)' }}>Active rate</div>
                            <p className="miniContainer1" style={{ color: '#007bff' }}>
                                {formatNumber([item.active / item.confirmed] * 100)} %
                        </p>
                        </div>
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(40,167,69,.12549)', color: 'rgba(40,167,69,.6)', marginTop: "2%" }}>
                            <div className="miniContainer"> Recovery Rate</div>
                            <p className="miniContainer1" style={{ color: '#28a745' }}>
                                {formatNumber([item.recovered / item.confirmed] * 100)} %
                        </p>
                        </div>
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(108,117,125,.0627451)', color: 'rgba(108,117,125,.6)', marginTop: "2%" }}>
                            <div className="miniContainer" >Death Rate</div>
                            <p className="miniContainer1" style={{ color: '#6c757d' }}>
                                {formatNumber([item.deaths / item.confirmed] * 100)} %
                        </p>
                        </div>
                    </div>
                    <div className="subMainContainer">
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(255,7,58,.12549)', color: 'rgba(255,7,58,.6)', marginTop: '2%' }}>
                            <div className="miniContainer" >OneCase/People</div>
                            <p className="miniContainer1" style={{ color: '#ff073a' }}>
                                {formatNumber([STATE_POPULATIONS[item.statecode] / item.confirmed])}
                            </p>
                        </div>
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(108,117,125,.0627451)', color: 'rgba(108,117,125,.6)', marginTop: '2%' }}>
                            <div className="miniContainer" >OneDeath/People</div>
                            <p className="miniContainer1" style={{ color: '#6c757d' }}>
                                {formatNumber([STATE_POPULATIONS[item.statecode] / item.deaths])}
                            </p>
                        </div>
                        <div className="subContainer1" style={{ fontWeight: '900', backgroundColor: 'rgba(32,26,162,.12549)', color: 'rgba(32,26,162,.6)', marginTop: '2%' }}>
                            <div className="miniContainer" >OneTest/People</div>
                            <p className="miniContainer1" style={{ color: 'rgba(32,26,162,.866667)' }}>
                                {formatNumber([STATE_POPULATIONS[item.statecode] / stateData[item.statecode].total.tested])}
                            </p>
                        </div>
                    </div>
                    <TopDistricts
                        districtData={this.props.districtData}
                        stateCode={item.statecode}
                    />
                    <DistrictOverView
                        stateData={this.props.stateData}
                        districtData={this.props.districtData}
                        stateCode={item.statecode} />
                </div >
            )
        }
    }
}
export default StateOverView;
