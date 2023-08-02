import React, { Component } from 'react'
import { formatNumber, } from '../utils/commonfunctions.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import CountryOverView from './countryOverView';
import WorldOverView from './worldOverView';
import RootGraph from '../Graphs';
function searchingFor(search) {
    return function (x) {
        return x.country.toLowerCase().includes(search.toLowerCase()) || !search
    }
}
class WorldTable extends Component {
    state = {
        search: "",
        submitted: false,
        item: [],
    }
    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    handleSubmit = (event) => {
        console.log("working");
        console.log(this.state.search)
    }
    render() {
        const { search } = this.state
        return (
            <div>
                <form className="formField" onSubmit={this.handleSubmit}>
                    <p className="plainText1">Looking for a complete details of Country/State then type in the name and click GO</p>
                    <input type="text" name="search" className="worldInputField" value={this.state.search} placeholder="Search Your Country" onChange={this.handleChange} />
                </form>
                <p className="textValue4">Click on the row or Country to view the complete data of that specific row or complete data of that specific Country</p>
                <div className="mainContainer">
                    <div style={{ height: "1300px", overflow: "auto", width: "2200px", marginRight: "0.5%" }}>
                        <table id="table1">
                            <thead >
                                <tr >
                                    <th style={{ width: '20%' }}>Country or Other</th>
                                    <th onClick={() => this.props.sortBy('cases')}>Total<br />Cases<FontAwesomeIcon icon={faSort} style={{ marginLeft: '30%' }} /></th>
                                    <th onClick={() => this.props.sortBy('todayCases')}>New<br />Cases<FontAwesomeIcon icon={faSort} style={{ marginLeft: '4%' }} /></th>
                                    <th onClick={() => this.props.sortBy('deaths')}>Total<br />Deaths<FontAwesomeIcon icon={faSort} style={{ marginLeft: '2%' }} /></th>
                                    <th onClick={() => this.props.sortBy('todayDeaths')}>New<br />Deaths<FontAwesomeIcon icon={faSort} style={{ marginLeft: '5%' }} /></th>
                                    <th onClick={() => this.props.sortBy('recovered')}>Total<br />Recovered<FontAwesomeIcon icon={faSort} style={{ marginLeft: '2%' }} /></th>
                                    <th onClick={() => this.props.sortBy('todayRecovered')}>New<br />Recoveries<FontAwesomeIcon icon={faSort} style={{ marginLeft: '3%' }} /></th>
                                    <th onClick={() => this.props.sortBy('active')}>Active<br />Cases<FontAwesomeIcon icon={faSort} style={{ marginLeft: '34%' }} /></th>
                                    {/* <th onClick={() => this.props.sortBy('critical')} >Critical<br />Cases<FontAwesomeIcon icon={faSort} style={{ marginLeft: '5%' }} /></th>
                            <th onClick={() => this.props.sortBy('casesPerOneMillion')}>Cases/<br />10L pop<FontAwesomeIcon icon={faSort} style={{ marginLeft: '2%' }} /></th>
                            <th onClick={() => this.props.sortBy('deathsPerOneMillion')}>Deaths/<br />10L pop<FontAwesomeIcon icon={faSort} style={{ marginLeft: '2%' }} /></th>
                            <th onClick={() => this.props.sortBy('tests')} >Total<br />Tests<FontAwesomeIcon icon={faSort} style={{ marginLeft: '48%' }} /></th>
                            <th onClick={() => this.props.sortBy('testsPerOneMillion')}>Tests/<br />10L pop<FontAwesomeIcon icon={faSort} style={{ marginLeft: '2%' }} /></th>
                            <th onClick={() => this.props.sortBy('activePerOneMillion')}>Active/<br />10L pop<FontAwesomeIcon icon={faSort} style={{ marginLeft: '11%' }} /></th>
                            <th onClick={() => this.props.sortBy('recoveredPerOneMillion')}>Recovered/<br />10L pop<FontAwesomeIcon icon={faSort} style={{ marginLeft: '20%' }} /></th>
                            <th onClick={() => this.props.sortBy('criticalPerOneMillion')}>Critical/<br />10L pop<FontAwesomeIcon icon={faSort} style={{ marginLeft: '2%' }} /></th>
                            <th onClick={() => this.props.sortBy('population')}>Population<FontAwesomeIcon icon={faSort} style={{ marginLeft: '22%' }} /></th> */}
                                </tr>
                            </thead>
                            <tbody >
                                {
                                    this.props.areas.filter(searchingFor(search)).map((total, id) => (
                                        total.cases || total.deaths || total.recovered > 0 ?
                                            total.active > 0 ? <tr key={id} className="activeCases" onClick={() => {
                                                this.setState({
                                                    item: total,
                                                    submitted: true
                                                })
                                            }}
                                            // onMouseEnter={() => {
                                            //     this.setState({
                                            //         item: total,
                                            //         submitted: true
                                            //     })
                                            // }}
                                            >
                                                <td><img src={total.countryInfo.flag} alt="country" style={{ width: '31px', height: '22px', marginRight: '4px' }} />{total.country}</td>
                                                <td>
                                                    {formatNumber(total.cases)}
                                                </td>
                                                {
                                                    total.todayCases > 0 ? <td className="tabledata1">
                                                        <FontAwesomeIcon icon={faArrowUp} style={{ marginRight: '1px' }} />
                                                        {formatNumber(total.todayCases)}
                                                    </td> : <td></td>
                                                }

                                                <td>
                                                    {formatNumber(total.deaths)}
                                                </td>
                                                {
                                                    total.todayDeaths > 0 ? <td className="tabledata2">
                                                        <FontAwesomeIcon icon={faArrowUp} style={{ marginRight: '1px' }} />
                                                        {formatNumber(total.todayDeaths)}
                                                    </td> : <td></td>
                                                }

                                                <td>
                                                    {formatNumber(total.recovered)}
                                                </td>
                                                {
                                                    total.todayRecovered > 0 ? <td className="tabledata3">
                                                        <FontAwesomeIcon icon={faArrowUp} style={{ marginRight: '1px' }} />
                                                        {formatNumber(total.todayRecovered)}
                                                    </td> : <td></td>
                                                }
                                                <td>
                                                    {formatNumber(total.active)}
                                                </td>
                                                {/* <td>
                                            <NumberFormat value={total.critical} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" />
                                        </td>
                                        <td>
                                            <NumberFormat value={total.casesPerOneMillion} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" />
                                        </td>
                                        <td>
                                            <NumberFormat value={total.deathsPerOneMillion} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" />
                                        </td>
                                        <td>
                                            <NumberFormat value={total.tests} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" />
                                        </td>
                                        <td>
                                            <NumberFormat value={total.testsPerOneMillion} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" />
                                        </td>
                                        <td>
                                            <NumberFormat value={total.activePerOneMillion} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" />
                                        </td>
                                        <td>
                                            <NumberFormat value={total.recoveredPerOneMillion} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" />
                                        </td>
                                        <td>
                                            <NumberFormat value={total.criticalPerOneMillion} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" />
                                        </td>
                                        <td className="populationColumn">
                                            <NumberFormat value={total.population} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" />
                                        </td> */}
                                            </tr> :
                                                <tr key={id} className="noActiveCases"
                                                    onClick={() => {
                                                        this.setState({
                                                            item: total,
                                                            submitted: true,
                                                        })
                                                        // }} onMouseEnter={() => {
                                                        //     this.setState({
                                                        //         item: total,
                                                        //         submitted: true
                                                        //     })
                                                    }
                                                    }>
                                                    <td><img src={total.countryInfo.flag} alt="country" style={{ width: '31px', height: '22px', marginRight: '4px' }} />{total.country}</td>
                                                    <td>
                                                        {formatNumber(total.cases)}
                                                    </td>
                                                    {
                                                        total.todayCases > 0 ? <td className="tabledata1">
                                                            <FontAwesomeIcon icon={faArrowUp} style={{ marginRight: '1px' }} />
                                                            {formatNumber(total.todayCases)}
                                                        </td> : <td></td>
                                                    }

                                                    <td>
                                                        {formatNumber(total.deaths)}
                                                    </td>
                                                    {
                                                        total.todayDeaths > 0 ? <td className="tabledata2">
                                                            <FontAwesomeIcon icon={faArrowUp} style={{ marginRight: '1px' }} />
                                                            {formatNumber(total.todayDeaths)}
                                                        </td> : <td></td>
                                                    }

                                                    <td>
                                                        {formatNumber(total.recovered)}
                                                    </td>
                                                    {
                                                        total.todayRecovered > 0 ? <td className="tabledata3">
                                                            <FontAwesomeIcon icon={faArrowUp} style={{ marginRight: '1px' }} />
                                                            {formatNumber(total.todayRecovered)}
                                                        </td> : <td></td>
                                                    }
                                                    <td>
                                                        {formatNumber(total.active)}
                                                    </td>
                                                    {/* <td>
                                                <NumberFormat value={total.critical} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" />
                                            </td>
                                            <td>
                                                <NumberFormat value={total.casesPerOneMillion} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" />
                                            </td>
                                            <td>
                                                <NumberFormat value={total.deathsPerOneMillion} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" />
                                            </td>
                                            <td>
                                                <NumberFormat value={total.tests} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" />
                                            </td>
                                            <td>
                                                <NumberFormat value={total.testsPerOneMillion} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" />
                                            </td>
                                            <td>
                                                <NumberFormat value={total.activePerOneMillion} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" />
                                            </td>
                                            <td>
                                                <NumberFormat value={total.recoveredPerOneMillion} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" />
                                            </td>
                                            <td>
                                                <NumberFormat value={total.criticalPerOneMillion} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" />
                                            </td>
                                            <td className="populationColumn">
                                                <NumberFormat value={total.population} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" />
                                            </td> */}
                                                </tr>
                                            : null

                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    {this.state.submitted === false ?
                        <WorldOverView
                            global={this.props.global}
                            time={this.props.time} /> :
                        <div className="mainContainer3">
                            <CountryOverView
                                item={this.state.item}
                                time={this.props.time}
                            />
                            <RootGraph
                                areas={this.props.areas}
                                item={this.state.item}
                            />
                        </div>
                    }
                </div>
                <p className="highlightedText"><span className="highlightedSpanText">Highlighted in green</span> <span>= All cases had an outcome(no active cases) (i.e Corona Free Country/International Conveyance)</span></p>
                <h3 className="footerText">#WorldFightsCorona</h3>

            </div >
        )
    }
}
export default WorldTable
