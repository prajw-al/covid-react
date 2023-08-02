import React, { Component } from 'react';
import axios from 'axios'
import WorldTable from './WorldTable.js';
import { connect } from 'react-redux';
import GlobalOverview from './globalOverview.js';
// import WorldMap from '/home/balu/covid-19/src/client/console/WorldMap/WorldMap.js';
import { bindActionCreators } from 'redux';
import * as userActions from '../redux/actions/userActions.js'
import Header from '../common/header.js';
import Footer from '../common/footer.js';
class DetailedOverView extends Component {
    _isMounted = false;
    constructor(props) {
        super(props)
        this.state = {
            areas: [],
            global: [],
            time: '',
            direction: 'asc',
            updates: []
        }
    }
    componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
            this.getResults();
            this.getAllResults();
            this.getTime();
            setInterval(this.getResults, 100000);
            setInterval(this.getAllResults, 100000);
            setInterval(this.getTime, 100000);
        }
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    getAllResults = () => {
        axios
            .get(`https://corona.lmao.ninja/v2/all`,
                {
                    revalidateOnMount: true,
                    refreshInterval: 100000,
                    revalidateOnFocus: false
                })
            .then(res => {
                const global = res.data;
                this.setState({
                    global: global,
                });
                this.props.actions.createGlobalData(this.state.global)
            })
            .catch(error => {
                console.log(error);
            });
    }
    getTime = () => {
        const today = new Date();
        const str = today.toGMTString();
        this.setState({
            time: str
        })
    }
    getResults = () => {
        axios
            .get(`https://corona.lmao.ninja/v2/countries?sort=cases`,
                {
                    revalidateOnMount: true,
                    refreshInterval: 100000,
                    revalidateOnFocus: false
                })
            .then(res => {
                const areas = res.data;
                this.setState({
                    areas: areas,
                });
                this.props.actions.createAreaData(this.state.areas)
            })
            .catch(error => {
                console.log(error);
            });
    }
    sortBy = (key) => {
        this.setState({
            areas: this.state.areas.sort((a, b) => (
                this.state.direction[key] === 'asc'
                    ? a[key] - b[key]
                    : b[key] - a[key]
            )),
            direction: {
                [key]: this.state.direction[key] === 'asc'
                    ? 'desc'
                    : 'asc'
            }
        })
    }
    render() {
        return (
            <div>
                <Header />
                <h3 className="header fadeInUp" style={{ animationDelay: "1s" }}>COVID-19 Coronavirus Pandemic</h3>
                <GlobalOverview
                    time={this.state.time}
                    global={this.state.global}
                />
                {/* ]                <WorldMap
                    areas={this.state.areas} /> */}
                <div className="text">
                    <p className="plainText">Reported Cases, Recovered and Deaths by Country, Territory, or Conveyance</p>
                    <span className="spanText1">The coronavirus COVID-19 is affecting <b style={{ color: '#337ab7' }}>{this.state.global.affectedCountries - 2} </b> countries and territories and <b style={{ color: '#337ab7' }}>2 </b> international conveyances around the world . The day is reset after midnight GMT+0.</span>
                </div>
                <WorldTable
                    areas={this.state.areas}
                    global={this.state.global}
                    sortBy={this.sortBy}
                    time={this.state.time} />
                <Footer />
            </div >
        )
    }
}
function mapStateToProps(state) {
    return {
        areas: state.areas,
        global: state.global
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(userActions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DetailedOverView)