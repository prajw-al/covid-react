import React, { Component } from 'react'
import { formatNumber, } from '../utils/commonfunctions.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../redux/actions/userActions.js'
import StateOverView from './stateOverView.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faBell, faBellSlash } from '@fortawesome/free-solid-svg-icons'
import IndiaOverView from './indiaOverView';
import IndiaUpdates from './indiaUpdates';
function searchingFor(search) {
    return function (x) {
        return x.state.toLowerCase().includes(search.toLowerCase()) || !search
    }
}
class Table extends Component {
    state = {
        search: "",
        selectedState: '',
        item: [],
        submitted: false,
        hover: false,
        show: false,
        alert: true,
    }
    handleClick = () => {
        this.setState({
            show: true,
            alert: false,
        })
    }
    handleClick1 = () => {
        this.setState({
            show: false,
            alert: true
        })
    }
    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value,
        })
    }
    render() {
        const { search } = this.state
        const { statewise, stateData } = this.props
        const TT = 'TT'
        if (stateData === undefined) {
            return null
        }
        else if (stateData[TT] === undefined) {
            return null
        }
        else {
            const active = stateData[TT].total.confirmed - stateData[TT].total.recovered - stateData[TT].total.deceased
            return (
                <div>
                    <p className="plainText1">
                        Looking for a complete details of Country/State then type in the name and click ENTER and for updates click
                    <FontAwesomeIcon icon={faBell} style={{ marginLeft: "10px", marginRight: "2px" }} /> icon
                </p>
                    <div style={{ display: "flex" }}>
                        <input type="text" name="search" onSubmit={this.handleSubmit} className="inputField" value={this.state.search} placeholder="Search Your State" onChange={this.handleChange} />
                        {
                            this.state.alert === false ?
                                <FontAwesomeIcon className="fontIcon" style={{ width: '50px', height: "100%", marginRight: '2px', marginTop: "12px", marginLeft: "-8px" }} icon={faBellSlash} onClick={this.handleClick1} />
                                :
                                <FontAwesomeIcon className="fontIcon" onClick={this.handleClick} icon={faBell} style={{ marginRight: '1px', width: '35px', height: "60%", marginTop: "12px" }} />
                        }
                    </div>
                    <IndiaUpdates
                        show={this.state.show}
                        updates={this.props.updates} />
                    <p className="textValue4">Click on the row or Country to view the complete data of that specific row or complete data of that specific State</p>
                    <div className="mainContainer">
                        <div>
                            <table id="table">
                                <thead >
                                    <tr >
                                        <th style={{ width: '20%' }}>State/UT</th>
                                        <th onClick={() => this.props.sortBy('confirmed')}>Total<br />Cases</th>
                                        <th style={{ width: '10%' }}> New < br /> Cases</th>
                                        <th>Total<br />Deaths</th>
                                        <th>New<br />Deaths</th>
                                        <th>Total<br />Recovered</th>
                                        <th>New<br />Recoveries</th>
                                        <th>Active<br />Cases</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {
                                        statewise.filter(searchingFor(search)).map((total, id) => (
                                            total.state === "Total" || total.confirmed <= 0 ? null :
                                                total.confirmed || total.deaths || total.recovered > 0 ?
                                                    total.active > 0 ?
                                                        <tr key={id} className="activeCases"
                                                            onClick={() => {
                                                                this.setState({
                                                                    item: total,
                                                                    submitted: true
                                                                })
                                                                // }} onMouseEnter={() => {
                                                                //     this.setState({
                                                                //         item: total,
                                                                //         submitted: true
                                                                //     })
                                                            }}>
                                                            <td>
                                                                {total.state}

                                                            </td>
                                                            {/* {
                                                        total.state === 'Total' || total.state === 'State Unassigned' ?
                                                            <td className="nonLink">{total.state}</td> :
                                                            <td>{total.state}</td>
                                                    } */}
                                                            < td >
                                                                {formatNumber(total.confirmed)}
                                                            </td>
                                                            {
                                                                total.deltaconfirmed > 0 ? <td className="tabledata1">
                                                                    <FontAwesomeIcon icon={faArrowUp} style={{ marginRight: '1px' }} />
                                                                    {formatNumber(total.deltaconfirmed)}
                                                                </td> : <td></td>
                                                            }
                                                            < td >
                                                                {formatNumber(total.deaths)}
                                                            </td>
                                                            {
                                                                total.deltadeaths > 0 ? <td className="tabledata2">
                                                                    <FontAwesomeIcon icon={faArrowUp} style={{ marginRight: '1px' }} />
                                                                    {formatNumber(total.deltadeaths)}
                                                                </td> : <td></td>
                                                            }
                                                            <td>
                                                                {formatNumber(total.recovered)}
                                                            </td>
                                                            {
                                                                total.deltarecovered > 0 ? <td className="tabledata3">
                                                                    <FontAwesomeIcon icon={faArrowUp} style={{ marginRight: '1px' }} />
                                                                    {formatNumber(total.deltarecovered)}
                                                                </td> : <td></td>
                                                            }
                                                            <td>
                                                                {formatNumber(total.active)}
                                                            </td>

                                                        </tr> : <tr key={id} className="noActiveCases" onClick={() => {
                                                            this.setState({
                                                                item: total,
                                                                submitted: true
                                                            })
                                                            // }} onMouseEnter={() => {
                                                            //     this.setState({
                                                            //         item: total,
                                                            //         submitted: true
                                                            //     })
                                                        }
                                                        }>
                                                            <td className="stateValue">
                                                                {total.state}
                                                            </td>
                                                            <td>
                                                                {formatNumber(total.confirmed)}
                                                            </td>
                                                            {
                                                                total.deltaconfirmed > 0 ? <td className="tabledata1">
                                                                    +{formatNumber(total.deltaconfirmed)}
                                                                </td> : <td></td>
                                                            }
                                                            <td>
                                                                {formatNumber(total.deaths)}
                                                            </td>
                                                            {
                                                                total.deltadeaths > 0 ? <td className="tabledata2">
                                                                    +{formatNumber(total.deltadeaths)}
                                                                </td> : <td></td>
                                                            }
                                                            <td>
                                                                {formatNumber(total.recovered)}
                                                            </td>
                                                            {
                                                                total.deltarecovered > 0 ? <td className="tabledata3">
                                                                    +  {formatNumber(total.deltarecovered)}
                                                                </td> : <td></td>
                                                            }
                                                            <td>
                                                                {formatNumber(total.active)}
                                                            </td>
                                                        </tr>
                                                    : null
                                        ))
                                    }
                                </tbody>
                                <tfoot>
                                    <tr onClick={() => {
                                        this.setState({
                                            submitted: false
                                        })
                                        // }} onMouseEnter={() => {
                                        //     this.setState({
                                        //         submitted: false
                                        //     })
                                    }}>
                                        <td style={{ textAlign: "right", color: "black" }}>INDIA</td>
                                        <td>
                                            {formatNumber(stateData[TT].total.confirmed)}
                                        </td>
                                        {
                                            stateData[TT].delta.confirmed > 0 ? <td className="tabledata1">
                                                <FontAwesomeIcon icon={faArrowUp} style={{ marginRight: '1px' }} />
                                                {formatNumber(stateData[TT].delta.confirmed)}
                                            </td> : <td></td>
                                        }
                                        < td >
                                            {formatNumber(stateData[TT].total.deceased)}
                                        </td>
                                        {
                                            stateData[TT].delta.deceased > 0 ? <td className="tabledata2">
                                                <FontAwesomeIcon icon={faArrowUp} style={{ marginRight: '1px' }} />
                                                {formatNumber(stateData[TT].delta.deceased)}
                                            </td> : <td></td>
                                        }
                                        <td>
                                            {formatNumber(stateData[TT].total.recovered)}
                                        </td>
                                        {
                                            stateData[TT].delta.recovered > 0 ? <td className="tabledata3">
                                                <FontAwesomeIcon icon={faArrowUp} style={{ marginRight: '1px' }} />
                                                {formatNumber(stateData[TT].delta.recovered)}
                                            </td> : <td></td>
                                        }
                                        <td>
                                            {formatNumber(active)}
                                        </td>
                                    </tr>
                                </tfoot>
                            </table >
                        </div>
                        {
                            this.state.submitted === false ?
                                <IndiaOverView
                                    total={this.props.total}
                                    stateData={this.props.stateData[TT]}
                                    statewise={this.props.statewise}
                                /> : < StateOverView
                                    total={this.props.total}
                                    item={this.state.item}
                                    stateData={this.props.stateData}
                                    districtData={this.props.districtData} />
                        }
                    </div >
                    <p className="highlightedText1"><span className="highlightedSpanText">Highlighted in green</span> <span>= All cases had an outcome(no active cases) (Corona Free State/UT or District)</span></p>
                </div >
            )
        }

    }
}
function mapStateToProps(state) {
    return {
        selectedState: state.selectedState
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(userActions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Table)

