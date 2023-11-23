import { React, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login_page from "../views/login/Login_page";
import Dashboard from "../views/dashboard/Dashboard";
import Team_leader from "../views/team-leader/Team_leader";
import Team_member from "../views/team-member/Team_member";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import NotAuthorized from "../views/NotAuthorized";
import Team_Member_List from "../views/team-member-list/Team_Member_List";
import { ScrollToTop } from "../utility/CommonFun";
import GetPdf from "../views/get-pdf/GetPdf";

const RouterHandler = () => {
  const [isLogin, setIsLogin] = useState(true);

  //   useEffect(() => {
  //     let temp = Cookies.get("userDetails") !== undefined;
  //       Cookies.get("userDetails") !== undefined
  //         ? JSON.parse(Cookies.get("userDetails"))
  //         : [];
  //     setIsLogin(temp);
  //     console.log();
  //   }, []);

  return (
    <>
      <ToastContainer />

      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Login_page />} />
        </Routes>
      </Router>

      {isLogin ? (
        <>
          <Router>
            <ScrollToTop />
            <div>
              <Header />
              <Routes>
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/TeamLeader" element={<Team_leader />} />
                <Route path="/TeamMember" element={<Team_member />} />
                <Route path="/TeamMemberList" element={<Team_Member_List />} />
                <Route path="/GetPdf" element={<GetPdf />} />
              </Routes>
              <NavBar />
            </div>
          </Router>
        </>
      ) : (
        <Router>
          <Routes>
            <Route path="/NotAuthorized" element={<NotAuthorized />} />
          </Routes>
        </Router>
      )}
    </>
  );
};

export default RouterHandler;
