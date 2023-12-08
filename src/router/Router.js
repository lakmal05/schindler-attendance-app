import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { ToastContainer } from "react-toastify";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

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
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const temp = localStorage.getItem("leader_object") !== null;
    setIsLogin(temp);
  }, []);

  return (
    <>
      <ToastContainer />

      <Router>
        <ScrollToTop />
        {isLogin ? (
          <div>
            <Header />
            <Routes>
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/TeamLeader" element={<Team_leader />} />
              <Route path="/TeamMember" element={<Team_member />} />
              <Route path="/TeamMemberList" element={<Team_Member_List />} />
              <Route path="/GetPdf" element={<GetPdf />} />
              {/* Redirect to dashboard if logged in */}
              <Route path="/" element={<Navigate to="/Dashboard" />} />
            </Routes>
            <NavBar />
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<Login_page />} />
            <Route path="/NotAuthorized" element={<NotAuthorized />} />
            {/* Redirect to login page if not logged in or leader_object is null */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </Router>
    </>
  );
};

export default RouterHandler;
