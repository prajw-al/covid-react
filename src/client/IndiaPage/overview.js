/* eslint-disable no-lone-blocks */
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { formatNumber, formatDate } from '../utils/commonfunctions.js';
class Overview extends Component {
    render() {
        const { stateData } = this.props
        if (stateData === undefined) {
            return null
        }
        else
         {
            const active = stateData.total.confirmed - stateData.total.recovered - stateData.total.deceased
            const deltaactive = parseInt(stateData.delta.recovered) + parseInt(stateData.delta.deceased)
            return (
                <div className="container">
                    <p className="time">{formatDate(stateData.meta.last_updated, 'E d MMM yyyy, hh:mm a')} IST</p>
                    <div className="container1">
                        <div className="subContainer1" style={{ color: '#ff073a' }}>
                            <div className="miniContainer">Confirmed</div>
                            <p className="miniContainer1">
                                {formatNumber(stateData.total.confirmed)}
                            </p>
                            {
                                stateData.delta.confirmed > 0 ?
                                    <p style={{ textAlign: "center", fontSize: "0.9em" }}>
                                        <FontAwesomeIcon icon={faArrowUp} style={{ marginRight: '1px' }} />
                                        {formatNumber(stateData.delta.confirmed)}
                                    </p> : null
                            }
                        </div>
                        <div className="subContainer1" style={{ color: '#007bff' }}>
                            <div className="miniContainer">Active </div>
                            <p className="miniContainer1" >
                                {formatNumber(active)}
                            </p>
                            {
                                stateData.delta.confirmed - deltaactive > 0 ?
                                    <p style={{ textAlign: "center", fontSize: "0.9em" }}>
                                        <FontAwesomeIcon icon={faArrowUp} style={{ marginRight: '1px' }} />
                                        {formatNumber(stateData.delta.confirmed - stateData.delta.recovered - stateData.delta.deceased)}
                                    </p>
                                    : deltaactive - stateData.delta.confirmed !== 0 ?
                                        <p style={{ textAlign: "center", fontSize: "0.9em" }}>
                                            <FontAwesomeIcon icon={faArrowDown} style={{ marginRight: '1px' }} />
                                            {formatNumber(deltaactive - stateData.delta.confirmed)}
                                        </p> : null
                            }
                        </div>
                        <div className="subContainer1" style={{ color: '#28a745' }}>
                            <div className="miniContainer">Recovered </div>
                            <p className="miniContainer1">
                                {formatNumber(stateData.total.recovered)}
                            </p>
                            {
                                stateData.delta.recovered > 0 ?
                                    <p style={{ textAlign: "center", fontSize: "0.9em" }}>
                                        <FontAwesomeIcon icon={faArrowUp} style={{ marginRight: '1px' }} />
                                        {formatNumber(stateData.delta.recovered)}
                                    </p> : null
                            }
                        </div>
                        <div className="subContainer1" style={{ color: '#6c757d' }}>
                            <div className="miniContainer">Deaths </div>
                            <p className="miniContainer1">
                                {formatNumber(stateData.total.deceased)}
                            </p>
                            {
                                stateData.delta.deceased > 0 ?
                                    <p style={{ textAlign: "center", fontSize: "0.9em" }}>
                                        <FontAwesomeIcon icon={faArrowUp} style={{ marginRight: '1px' }} />
                                        {formatNumber(stateData.delta.deceased)}
                                    </p> : null
                            }
                        </div >
                        < div className="subContainer1" style={{ color: 'rgba(32,26,162,.6)' }}>
                            <div className="miniContainer" >Tested</div>
                            <p className="miniContainer1" style={{ color: 'rgba(32,26,162,.866667)' }}>
                                {formatNumber(stateData.total.tested)}
                            </p>
                            {
                                stateData.delta.tested > 0 ?
                                    <p style={{ textAlign: "center", fontSize: "0.8em" }}>
                                        <FontAwesomeIcon icon={faArrowUp} style={{ marginRight: '1px' }} />
                                        {formatNumber(stateData.delta.tested)}
                                    </p>
                                    : null
                            }
                            <p style={{ textAlign: "center", fontSize: "0.9em", marginTop: "-8px" }}>
                                As of {formatDate(stateData.meta.tested.last_updated, 'dd MMM')}
                            </p>
                        </div>
                    </div >
                </div>
            )
        }
    }
}
export default Overview;