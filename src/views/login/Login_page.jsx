import React, { useState } from "react";
import "./Login_page.scss";
import { Button } from "antd";
import { Input } from "antd";
import { HiOutlineUser, HiOutlineLockClosed } from "react-icons/hi";
import { customToastMsg } from "../../utility/Utils";
import { RiLoader2Line } from "react-icons/ri";
import shadow01 from "../../assets/login-shadow-01.png";
import shadow02 from "../../assets/login-shadow-02.png";
import logo from "../../assets/logo.png";

const Login_page = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loader, setLoader] = useState(false);

  const checkLoginInfor = () => {
    console.log(username, password);
    username.trim() === ""
      ? customToastMsg("Please Enter your Username!", 0)
      : password.trim() === ""
      ? customToastMsg("Please Enter your Password!", 0)
      : loginUser();
  };

  const loginUser = () => {
    // dispatch(actionLoaderCreator.loaderHandler(true));
    setLoader(true);
    let data = {
      username: username,
      password: password,
    };

    console.log("Login deails",data);
    // loginUser(data)
    //   .then((res) => {
    //     Cookies.set(constant.ACCESS_TOKEN, res.access_token);
    //     Cookies.set(constant.REFRESH_TOKEN, res.refresh_token);
    //     Cookies.set("expires_in", res.expires_in);

    //     getUserDetails()
    //       .then((res) => {
    //         Cookies.set("userDetails", JSON.stringify(res.data));
    //         window.location.href = "/Dashboard";
    //       })
    //       .catch((c) => {
    //         Cookies.remove(constant.ACCESS_TOKEN);
    //         Cookies.remove(constant.REFRESH_TOKEN);
    //         Cookies.remove("expires_in");
    //         Cookies.remove("userDetails");
    //       })
    //       .finally((f) => {
    //         // dispatch(actionLoaderCreator.loaderHandler(false));
    //         setLoader(false);
    //       });
    //   })
    //   .catch((c) => {
    //     // dispatch(actionLoaderCreator.loaderHandler(false));
    //     setLoader(false);
    //     customToastMsg("Your User Name or password incorrect! Try Again ", 0);
    //   })
    //   .finally((f) => {
    //     // dispatch(actionLoaderCreator.loaderHandler(false));
    //     setLoader(false);
    //   });
  };

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
                onChange={async (e) => await setUsername(e.target.value)}
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
                onChange={async (e) => await setPassword(e.target.value)}
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

              <Button id="login-btn" type="primary" onClick={checkLoginInfor}>
                {" "}
                {!loader ? (
                  "Login"
                ) : (
                  <span>
                    <RiLoader2Line />
                    <span style={{ marginLeft: "5px" }}> loading ... </span>
                  </span>
                )}
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
