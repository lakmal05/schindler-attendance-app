import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { Button } from "antd";
import { getWeekDates } from "../../utility/Utils";
import "./Dashboard.scss";
import { logOutLeader } from "../../utility/CommonFun";

const Dashboard = () => {
  const navigate = useNavigate();

  const [weekElements, setWeekElements] = useState([]);
  const [leader_first_name, setLeaderObj] = useState(null);

  useEffect(() => {
    const local_storage_leader_obj = localStorage.getItem("leader_object");
    const parsedLeaderObj = JSON.parse(local_storage_leader_obj);
    setLeaderObj(parsedLeaderObj.first_name);

    const today = new Date(); // Get the current date
    const todayDateNumber = today.getDate();
    console.log(todayDateNumber);
    const thisWeek = getWeekDates();

    const weekDivs = thisWeek.map((date, index) => {
      // Check if it's the current date and assign a class accordingly
      let activation = "date-box";
      if (date.dayNumber === todayDateNumber) {
        activation = "date-box active";
      } else {
        activation = "date-box";
      }

      return (
        <div className={activation} key={index}>
          <div className="calander-day">{date.weekName}</div>
          <div className="calander-date">{date.dayNumber}</div>
        </div>
      );
    });

    setWeekElements(weekDivs);
  }, []);

  const logout =() => {
    logOutLeader();
  }

  return (
    <>
      <div id="dashboard">
        <div id="dashboard-profile-div">
          <div id="profile-img"></div>
          <div id="prifile-details">
            <h4 id="profile-name">Hi {leader_first_name}</h4>
            <h4 id="profile-postion">Team Leader</h4>
            <Button
              id="mt-btn"
              type="primary"
              onClick={logout}
            >
              LOGoUT
            </Button>
          </div>
        </div>

        <div id="calander">
          <div id="calander-div">
            {weekElements}
          </div>
        </div>

        <div id="mark-attendance">
          <div id="mt-cnt-div">
            <h3 id="mt-heading">Let’s Check-in</h3>
            <Button
              id="mt-btn"
              type="primary"
              onClick={(e) => navigate("/TeamLeader")}
            >
              Mark Attendance
            </Button>
          </div>
          <div id="mt-icon-div">
            <div id="mt-inner-div">
              <AiOutlineCheckCircle id="mt-icon" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
