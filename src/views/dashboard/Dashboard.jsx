import React from 'react'
import { useNavigate } from "react-router-dom";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { Button } from "antd";
import "./Dashboard.scss"
import NavBar from '../../components/NavBar'
import Header from '../../components/Header'

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <>
    {/* <Header/> */}
      <div id='dashboard'>

        <div id='dashboard-profile-div'>
          <div id='profile-img'></div>
          <div id='prifile-details'>
            <h4 id='profile-name'>Hi Lakmal !</h4>
            <h4 id='profile-postion'>Team Leader</h4>
          </div>
        </div>

        <div id="calander">
        <div id="calander-div">
          <div className="date-box">
            <div className="calander-day">Mo</div>
            <div className="calander-date">19</div>
          </div>
          <div className="date-box">
            <div className="calander-day">Tu</div>
            <div className="calander-date">20</div>
          </div>
          <div className="date-box">
            <div className="calander-day">We</div>
            <div className="calander-date">21</div>
          </div>
          <div className="date-box active">
            <div className="calander-day">Th</div>
            <div className="calander-date">22</div>
          </div>
          <div className="date-box">
            <div className="calander-day">Fr</div>
            <div className="calander-date">23</div>
          </div>
          <div className="date-box">
            <div className="calander-day">Sa</div>
            <div className="calander-date">24</div>
          </div>
          <div className="date-box">
            <div className="calander-day">Su</div>
            <div className="calander-date">25</div>
          </div>
        </div>
      </div>

      <div id='mark-attendance'>
        <div id='mt-cnt-div'>
          <h3 id='mt-heading'>Let’s Check-in</h3>
          <Button id="mt-btn" type="primary" onClick={(e)=> navigate("/TeamLeader")}>Mark Attendance</Button>
        </div>
        <div id='mt-icon-div'>
            <div id='mt-inner-div'>
            <AiOutlineCheckCircle id='mt-icon' />
            </div>
        </div>
      </div>
      </div>
      {/* <NavBar/> */}
    </>
  )
}

export default Dashboard


