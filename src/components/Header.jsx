import React from 'react'
import logo from "../assets/logo.png";
import './Header.scss'

const Header = () => {
  return (
    <>
    <div id="header">
        <div id="header-cnt">
            <img id='logo' src={logo} alt="logo" />
            <h2 id="text-wrapper">Trade Promoters Limited</h2>
        </div>
    </div>
    </>
  )
}

export default Header


