import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
class Footer extends Component {
    render() {
        return (
            <div style={{ color: "black", textAlign: "center", }} >
                <a target="_blank" rel="noopener noreferrer" href="https://github.com/prajw-al/covid-19-react" className="githubFooter" >
                    <FontAwesomeIcon icon={faGithub} style={{ marginRight: '1px' }} />
                     Open Sourced on GitHub
                    </a>
                <p style={{ marginTop: "2%" }}></p>
            </div>
        )
    }
}

export default Footer;
