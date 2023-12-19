import React, { useEffect, useState } from "react";
import "./Team_Member_List.scss";
import { BiSolidRightArrow } from "react-icons/bi";
import { Button } from "antd";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { IoCaretBack } from "react-icons/io5";
import TeamMemberCard from "../../components/TeamMemberCard";
import { useNavigate } from "react-router-dom";
import { getAllMarkedMemberAttendanceList } from "../../services/teamMemberList";

const Team_Member_List = () => {
  const [teamMembers, setTeamMembers] = useState(2);
  const [teamMembersArray, setTeamMembersArray] = useState([]);

  useEffect(() => {
    getAllMemberAttendance();
  }, []);

  const navigate = useNavigate();

  const appendTeamMember = () => {
    setTeamMembers((prevMembers) => prevMembers + 1);
  };

  const prependTeamMember = () => {
    if (teamMembersArray.length < teamMembers) {
      setTeamMembers((prevMembers) => Math.max(1, prevMembers - 1));
    }
  };

  const renderTeamMembers = () => {
    const members = [];
    for (let i = 0; i < teamMembers; i++) {
      console.log(teamMembersArray, "all teammembers array");
      members.push(
        <TeamMemberCard key={i} teamMemberData={teamMembersArray[i]} />
      );
    }
    return members;
  };

  const getAllMemberAttendance = async () => {
    const local_storage_leader_obj = await localStorage.getItem(
      "leader_attendance_details"
    );
    const leaderObj = JSON.parse(local_storage_leader_obj);
    const data = {
      leader_emp_id: leaderObj.leader_emp_id,
      tool_box_no: leaderObj.tool_box_no,
      execute_date: leaderObj.execute_date,
    };

    await getAllMarkedMemberAttendanceList(data).then((response) => {
      if (response.data) {
        console.log(response.data, "response");
        setTeamMembersArray(response.data);
        setTeamMembers(response.data.length);
      }
    });
  };

  const genereatePdf = async () => {
    navigate("/GetPdf");
  };

  return (
    <>
      <div id="team-member-list">
        <div id="team-member-cnt">
          {renderTeamMembers()}

          <Button id="get-pdf-btn" type="primary" onClick={genereatePdf}>
            {" "}
            Get the PDF
            <BiSolidRightArrow style={{ margin: "0 0 0 10px" }} />
          </Button>
          <div id="button-div">
            <Button id="plus-btn" type="primary" onClick={appendTeamMember}>
              {" "}
              <FaPlus />
            </Button>
            <Button id="minus-btn" type="primary" onClick={prependTeamMember}>
              {" "}
              <FaMinus />
            </Button>
          </div>
          <Button
            id="back-btn"
            type="primary"
            onClick={() => {
              navigate("/TeamLeader");
            }}
          >
            {" "}
            <IoCaretBack />
          </Button>
        </div>
      </div>
    </>
  );
};

export default Team_Member_List;
