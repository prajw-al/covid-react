import React, { Component } from 'react';
import Header from './header';
import Footer from './footer';
class About extends Component {
    render() {
        return (
            <React.Fragment>
                <Header />
                <h2>Page Under Construction</h2>
                <h3 className="footerText">#StaySafe #StayHealthy</h3>
                <h3 className="footerText">#WorldFightsCorona</h3>
                <Footer />
            </React.Fragment>
        )
    }
}
export default About