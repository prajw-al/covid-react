/* eslint-disable no-lone-blocks */
import React, { Component } from 'react';
import { formatNumber, formatDate } from '../utils/commonfunctions.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
// import { formatDistance } from 'date-fns';
class GlobalOverview extends Component {
    state = {
        time: ''
    }
    render() {
        const { global } = this.props
        if (global.updated === undefined) {
            return null
        }
        else {
            const Updated = new Date(global.updated)
            const deltaactive = parseInt(global.todayRecovered) + parseInt(global.todayDeaths)
            return (
                <div className="container">
                    {/* <p className="time"> {formatDate(Updated, 'E d MMM yyyy hh:mm:ss a')} IST
                    </p> */}
                    <div className="container1">
                        <div className="subContainer1" style={{ color: '#ff073a' }}>
                            <div className="miniContainer">Confirmed</div>
                            <p className="miniContainer1">
                                {formatNumber(global.cases)}
                            </p>
                            {
                                global.todayCases > 0 ? <p style={{ textAlign: "center", fontSize: "0.9em" }}> <FontAwesomeIcon icon={faArrowUp} style={{ marginRight: '1px' }} />
                                    {formatNumber(global.todayCases)}
                                </p>
                                    : null
                            }
                        </div>
                        <div className="subContainer1" style={{ color: '#007bff' }}>
                            <div className="miniContainer">Active</div>
                            <p className="miniContainer1">
                                {formatNumber(global.active)}
                            </p>
                            {
                                global.todayCases - deltaactive > 0 ?
                                    <p style={{ textAlign: "center", fontSize: "0.9em" }}>
                                        <FontAwesomeIcon icon={faArrowUp} style={{ marginRight: '1px' }} />
                                        {formatNumber(global.todayCases - deltaactive)}
                                    </p>
                                    : deltaactive - global.todayCases !== 0 ? <p style={{ textAlign: "center", fontSize: "0.9em" }}>
                                        <FontAwesomeIcon icon={faArrowDown} style={{ marginRight: '1px' }} />
                                        {formatNumber(deltaactive - global.todayCases)}
                                    </p> : null
                            }
                        </div>
                        <div className="subContainer1" style={{ color: '#28a745' }}>
                            <div className="miniContainer">Recovered</div>
                            <p className="miniContainer1">
                                {formatNumber(global.recovered)}
                            </p>
                            {
                                global.todayRecovered > 0 ?
                                    <p style={{ textAlign: "center", fontSize: "0.9em" }}> <FontAwesomeIcon icon={faArrowUp} style={{ marginRight: '1px' }} />
                                        {formatNumber(global.todayRecovered)}
                                    </p> : null
                            }

                        </div>
                        <div className="subContainer1" style={{ color: '#6c757d' }}>
                            <div className="miniContainer">Deaths</div>
                            <p className="miniContainer1" >
                                {formatNumber(global.deaths)}
                            </p>
                            {
                                global.todayDeaths > 0 ?
                                    <p style={{ textAlign: "center", fontSize: "0.9em" }}> <FontAwesomeIcon icon={faArrowUp} style={{ marginRight: '1px' }} />
                                        {formatNumber(global.todayDeaths)}
                                    </p> : null
                            }
                        </div>
                        < div className="subContainer1" style={{ color: 'rgba(32,26,162,.6)' }}>
                            <div className="miniContainer" >Tested</div>
                            <p className="miniContainer1" style={{ color: 'rgba(32,26,162,.866667)' }}>
                                {formatNumber(global.tests)}
                            </p>
                            
                        </div>
                    </div>
                </div >
            )
        }
    }
}
export default GlobalOverview;
