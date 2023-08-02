import React, { Component } from 'react';
class StateWise extends Component {

    render() {
        const { total } = this.state
        return (
            <div>
                <h3 className="header">COVID-19 Coronavirus Pandemic in <b>INDIA</b></h3>
                <div className="container">
                    {/* <p className="time">Last Updated :  {total.lastupdatedtime}</p> */}
                    <div className="container1">
                        <div className="subContainer1" style={{ backgroundColor: '#fff', color: 'black' }}>
                            <div className="miniContainer">Total</div>
                            <p className="miniContainer1"> {total.confirmed}</p>
                        </div>
                        <div className="subContainer1" style={{ backgroundColor: '#ffc107', color: 'black' }}>
                            <div className="miniContainer">Active</div>
                            <p className="miniContainer1"> {total.active}</p>
                        </div>
                        <div className="subContainer1" style={{ backgroundColor: '#28a745', color: 'white' }}>
                            <div className="miniContainer">Recovered</div>
                            <p className="miniContainer1"> {total.recovered}</p>
                        </div>
                        <div className="subContainer1" style={{ backgroundColor: '#dc3545', color: 'white' }}>
                            <div className="miniContainer">Deaths</div>
                            <p className="miniContainer1"> {total.deaths}</p>
                        </div>
                    </div>
                </div >
            </div>
        )
    }
}

export default StateWise;
