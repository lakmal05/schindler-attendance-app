import React from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { HomeFilled } from "@ant-design/icons";
import { SettingOutlined } from "@ant-design/icons";

import "./NavBar.scss"

const NavBar = () => {
  return (
    <>
        <div id="nav-bar">
            <div id='nav-bar-cnt-div'>
            <div className='nav-bar-item-divs'>
                <div>
                    <FontAwesomeIcon
                        icon={faUser}
                        style={{
                        color: "#9D9D9D",
                        fontSize: "18px",
                        }}
                    />
                    <div id="text-wrapper">Profile</div> 
                  </div>
            </div>
            <div className='nav-bar-item-divs  active'>
                <div>
                <HomeFilled style={{
                        color: "#9D9D9D",
                        fontSize: "18px",
                        }} />
                <div id="text-wrapper">Home</div>
                </div> 
            </div>
            <div className='nav-bar-item-divs'>
                <div>
                <SettingOutlined style={{
                      color: "#9D9D9D",
                      fontSize: "18px",
                    }}
                />
                <div id="text-wrapper">Settings</div> 
                </div>
            </div>
            </div>
        </div>
    </>
  )
}

export default NavBar