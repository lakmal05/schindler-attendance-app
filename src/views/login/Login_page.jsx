import React from "react";
import "./Login_page.scss";
import { Button } from "antd";
import { Input } from "antd";
import { HiOutlineUser,HiOutlineLockClosed } from "react-icons/hi";
import shadow01 from "../../assets/login-shadow-01.png";
import shadow02 from "../../assets/login-shadow-02.png";
import logo from "../../assets/logo.png";

const Login_page = () => {
  return (
    <>
      <div id="login-page">
        <img id="shadow-01" src={shadow01} alt="shadow-01" />
        <img id="shadow-02" src={shadow02} alt="shadow-02" />
        <div id="login-page-cnt-div">
          <div id="cnt-div">
            <div id="logo">
              <img id="logo" src={logo} alt="logo" />
            </div>
            <div id="login-cnt">
              <h2>Log In</h2>
              <p>Login to your existing account by entering your details.</p>
              <Input
                style={{ backgroundColor: "#EEEEEE", margin: "12px 0" }}
                placeholder="User Name"
                prefix={
                  <HiOutlineUser
                    style={{
                      color: "#9D9D9D",
                      margin: "0 10px",
                      fontSize: "18px",
                    }}
                  />
                }
              />
              <Input
                style={{ backgroundColor: "#EEEEEE", margin: "12px 0" }}
                placeholder="Password"
                prefix={
                  <HiOutlineLockClosed
                    style={{
                      color: "#9D9D9D",
                      margin: "0 10px",
                      fontSize: "18px",
                    }}
                  />
                }
              />
              
              <Button id="login-btn" type="primary">
                Login
              </Button>
              <h5>Forgot Password</h5>
              <h4>
                Don’t have an account ? Let’s <a href="">Sign Up</a>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login_page;
