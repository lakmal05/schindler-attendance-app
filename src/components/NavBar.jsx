import React from "react";
import { FaRegUser ,FaUser} from "react-icons/fa";
import { AiFillHome ,AiOutlineHome} from "react-icons/ai";
import { RiSettings4Line,RiSettings4Fill } from "react-icons/ri";

import "./NavBar.scss";

const NavBar = () => {
  return (
    <>
      <div id="nav-bar">
        <div id="nav-bar-cnt-div">
          <div className="nav-bar-item-divs  ">
            <div>
              <FaRegUser
              className="unactive-icon"
                style={{
                  color: "#9D9D9D",
                  fontSize: "18px",
                }}
              />
              <FaUser
              className="active-icon"
               style={{
                color: '#ff3e3ec0',
                fontSize: "18px",
              }}/>
              <div id="text-wrapper">Profile</div>
            </div>
          </div>
          <div className="nav-bar-item-divs active " onClick={(e)=> window.location.href = '/Dashboard'}>
            <div>
              <AiFillHome
                className="active-icon"
                style={{
                color: '#ff3e3ec0',
                  fontSize: "20px",
                }}
              />

              <AiOutlineHome
              className="unactive-icon"
                style={{
                  color: "#9D9D9D",
                  fontSize: "20px",
                }}
              />
              <div id="text-wrapper">Home</div>
            </div>
          </div>
          <div className="nav-bar-item-divs  ">
            <div>
              <RiSettings4Line
              className="unactive-icon"
                style={{
                  color: "#9D9D9D",
                  fontSize: "20px",
                }}                
              />
              <RiSettings4Fill  
              className="active-icon"
              style={{
                  fontSize: "20px",
                  color: '#ff3e3ec0'
                }} />
              <div id="text-wrapper">Settings</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
