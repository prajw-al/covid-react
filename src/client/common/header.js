import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
class Header extends Component {
    render() {
        return (
            <div className="navBar">
                <div className="navBarMiddle">
                    <NavLink to="/" className="linkText">COVID-19<span className="bold">PANDEMIC</span></NavLink></div>
                <div className="navBarRight">
                    {/* <NavLink to="/india" className="navLink2" activeStyle={{ backgroundColor: 'rgba(36, 81, 218, 0.418)', fontWeight: "900", color: 'black' }}>COVID19-<span className="bold2" >INDIA</span></NavLink> */}
                    <NavLink to="/world" className="navLink2" activeStyle={{ backgroundColor: 'rgba(36, 81, 218, 0.418)', fontWeight: "900", color: 'black' }}>COVID19-<span className="bold2">WORLD</span></NavLink>
                    <NavLink to="/about" className="navLink2" activeStyle={{ backgroundColor: 'rgba(36, 81, 218, 0.418)', fontWeight: "900", color: 'black' }}>ABOUT</NavLink>
                </div>
            </div>
        )
    }
}

export default Header;
