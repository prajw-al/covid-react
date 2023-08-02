import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { formatNumber, } from '../utils/commonfunctions.js';
class districtOverView extends Component {
    render() {
        const { districtData } = this.props
        if (districtData === undefined) {
            return null
        }
        else {
            return (
                < div className="mainContainer4" >
                    {
                        this.props.districtData.map((data, id) => (
                            data.statecode === this.props.stateCode ?
                                <div key={id} style={{ height: "500px", overflow: "auto", marginRight: "0.5%", width: "92%", fontSize: '14px' }}>
                                    <table id="table2">
                                        <thead >
                                            <tr >
                                                <th >District</th>
                                                <th>Total<br />Cases</th>
                                                <th>Total<br />Deaths</th>
                                                <th>Total<br />Recovered</th>
                                                <th>Active<br />Cases</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                            data.districtData.sort((a, b) => b.confirmed - a.confirmed).map((district, id) => (
                                                    district.active > 0 ?
                                                        <tr key={id} className="activeCases" >
                                                            <td className="stateValue">
                                                                {
                                                                    district.district === "Foreign Evacuees" || district.district === "Unassigned"
                                                                        || district.district === "Other State" || district.district === "Railway Quarantine"
                                                                        || district.district === "Airport Quarantine" || district.district === "Unknown"
                                                                        || district.district === "Evacuees" || district.district === "Italians"
                                                                        ?
                                                                        null
                                                                        : district.active === 0 ?
                                                                            <span style={{ border: '5px solid green', marginLeft: '-6px', marginRight: '2px' }}></span> :
                                                                            district.active <= 20 ?
                                                                                <span style={{ border: '5px solid orange', marginLeft: '-6px', marginRight: '2px' }}></span> :
                                                                                <span style={{ border: '5px solid red', marginLeft: '-6px', marginRight: '2px' }}></span>
                                                                }
                                                                {district.district}
                                                            </td>
                                                            {
                                                                district.delta.confirmed > 0 ? <td>
                                                                    <span className="tabledata1" style={{ margin: '7px', fontSize: '14px' }}>
                                                                        <FontAwesomeIcon icon={faArrowUp} style={{ marginRight: '1px' }} />{district.delta.confirmed}
                                                                    </span>
                                                                    {formatNumber(district.confirmed)}
                                                                </td> : <td>
                                                                        {formatNumber(district.confirmed)}
                                                                    </td>
                                                            }
                                                            {
                                                                district.delta.deceased > 0 ? <td >
                                                                    <span className="tabledata2" style={{ margin: '7px', fontSize: '13px' }}>
                                                                        <FontAwesomeIcon icon={faArrowUp} style={{ marginRight: '1px' }} />{district.delta.deceased}
                                                                    </span>
                                                                    {formatNumber(district.deceased)}
                                                                </td> : <td>
                                                                        {formatNumber(district.deceased)}
                                                                    </td>
                                                            }
                                                            {
                                                                district.delta.recovered > 0 ? <td >
                                                                    <span className="tabledata3" style={{ margin: '7px', fontSize: '13px' }}>
                                                                        <FontAwesomeIcon icon={faArrowUp} style={{ marginRight: '1px' }} />{district.delta.recovered}
                                                                    </span>
                                                                    {formatNumber(district.recovered)}
                                                                </td> : <td>
                                                                        {formatNumber(district.recovered)}
                                                                    </td>
                                                            }
                                                            {
                                                                district.delta.confirmed - district.delta.recovered - district.delta.deaths > 0 ?
                                                                    <td>
                                                                        <span className="tabledata4" style={{ fontSize: '13px' }}>
                                                                            <FontAwesomeIcon icon={faArrowUp} style={{ marginRight: '1px' }} />
                                                                            {district.delta.confirmed - district.delta.recovered - district.delta.deaths}
                                                                        </span>
                                                                        {formatNumber(district.active)}
                                                                    </td>
                                                                    : parseInt(district.delta.recovered) + parseInt(district.delta.deaths) - district.delta.confirmed > 0 ?
                                                                        <td>
                                                                            <span className="tabledata4" style={{ fontSize: '13px' }}>
                                                                                <FontAwesomeIcon icon={faArrowDown} style={{ marginRight: '1px' }} />
                                                                                {district.delta.confirmed - district.delta.recovered - district.delta.deaths}
                                                                            </span>
                                                                            {formatNumber(district.active)}
                                                                        </td> :
                                                                        <td>
                                                                            {formatNumber(district.active)}
                                                                        </td>
                                                            }
                                                        </tr> : <tr key={id} className="noActiveCases" >
                                                            <td className="stateValue">
                                                                {
                                                                    district.district === "Foreign Evacuees" || district.district === "Unassigned"
                                                                        || district.district === "Other State" || district.district === "Railway Quarantine"
                                                                        || district.district === "Airport Quarantine" || district.district === "Unknown"
                                                                        || district.district === "Evacuees" || district.district === "Italians"
                                                                        ?
                                                                        null
                                                                        : district.active === 0 ?
                                                                            <span style={{ border: '5px solid green', marginLeft: '-6px', marginRight: '2px' }}></span> :
                                                                            district.active <= 20 ?
                                                                                <span style={{ border: '5px solid orange', marginLeft: '-6px', marginRight: '2px' }}></span> :
                                                                                <span style={{ border: '5px solid red', marginLeft: '-6px', marginRight: '2px' }}></span>
                                                                }
                                                                {district.district}
                                                            </td>
                                                            {
                                                                district.delta.confirmed > 0 ? <td>
                                                                    <span className="tabledata1" style={{ margin: '7px', fontSize: '13px' }}>
                                                                        <FontAwesomeIcon icon={faArrowUp} style={{ marginRight: '1px' }} />{district.delta.confirmed}
                                                                    </span>
                                                                    {formatNumber(district.confirmed)}
                                                                </td> : <td>
                                                                        {formatNumber(district.confirmed)}
                                                                    </td>
                                                            }
                                                            {
                                                                district.delta.deceased > 0 ? <td >
                                                                    <span className="tabledata2" style={{ margin: '7px', fontSize: '13px' }}>
                                                                        <FontAwesomeIcon icon={faArrowUp} style={{ marginRight: '1px' }} />{district.delta.deceased}
                                                                    </span>
                                                                    {formatNumber(district.deceased)}
                                                                </td> : <td>
                                                                        {formatNumber(district.deceased)}
                                                                    </td>
                                                            }
                                                            {
                                                                district.delta.recovered > 0 ?
                                                                    <td >
                                                                        <span className="tabledata3" style={{ margin: '7px', fontSize: '13px' }}>
                                                                            <FontAwesomeIcon icon={faArrowUp} style={{ marginRight: '1px' }} />{district.delta.recovered}
                                                                        </span>
                                                                        {formatNumber(district.recovered)}

                                                                    </td> : <td>
                                                                        {formatNumber(district.active)}
                                                                    </td>
                                                            }
                                                            {
                                                                district.delta.confirmed - district.delta.recovered - district.delta.deaths > 0 ?
                                                                    <td>
                                                                        <span className="tabledata4" style={{ margin: '7px', fontSize: '13px' }}>
                                                                            <FontAwesomeIcon icon={faArrowUp} style={{ marginRight: '1px' }} />
                                                                            {district.delta.confirmed - district.delta.recovered - district.delta.deaths}
                                                                        </span>
                                                                        {formatNumber(district.active)}
                                                                    </td> :

                                                                    <td>{
                                                                        district.active < 0 ?
                                                                            '0' :
                                                                            <span>{formatNumber(district.active)}</span>
                                                                    }
                                                                    </td>
                                                            }
                                                        </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table >
                                </div> : null
                        ))
                    }
                    < div style={{ width: '22%', marginTop: "1%" }
                    } >
                        <p style={{ width: "100% ", border: '5px solid red', color: 'red', fontWeight: 'bold', textAlign: "center" }}> <span>  Red Zone</span></p>
                        <p style={{ width: "100% ", border: '5px solid orange', color: 'orange', fontWeight: 'bold', textAlign: "center" }}><span>  Orange Zone</span></p>
                        <p style={{ width: "100% ", border: '5px solid green', color: 'green', fontWeight: 'bold', textAlign: "center" }}><span>  Green Zone</span></p>
                    </div >
                </div >
            )
        }
    }
}
export default districtOverView;
