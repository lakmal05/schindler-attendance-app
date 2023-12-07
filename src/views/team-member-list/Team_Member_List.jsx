import React, { useEffect, useState } from "react";
import "./Team_Member_List.scss";
import { BiSolidRightArrow } from "react-icons/bi";
import { Button } from "antd";
import { FaPlus } from "react-icons/fa6";
import TeamMemberCard from "../../components/TeamMemberCard";
import { useNavigate } from "react-router-dom";
import { getAllMarkedAttendanceList } from "../../services/teamMemberList";
import FirstTeamMemberCard from "../../components/FirstTeamMemberCard";

import { getAllAttendance } from "../../utility/CommonFun";

const Team_Member_List = () => {
  const [teamMembers, setTeamMembers] = useState(2);
  const [teamMembersArray, setTeamMembersArray] = useState([]);
  useEffect(() => {
    // const attendanceArray = getAllAttendance()
    // console.log(attendanceArray,"attendanceArray");
    // setTeamMembersArray(attendanceArray,);
    // console.log(teamMembersArray,"array in list");
    // setTeamMembers(attendanceArray.length)
    // console.log(teamMembers,"array length in list");
getAllAttendance();
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

   const getAllAttendance = async () => {
    const local_storage_leader_obj = await localStorage.getItem(
      "leader_attendance_details"
    );
    const leaderObj = JSON.parse(local_storage_leader_obj);
    const data = {
      leader_emp_id: leaderObj.leader_emp_id,
      tool_box_no: leaderObj.tool_box_no,
      execute_date: leaderObj.execute_date,
    };
    //send tool_box_num and execute date and leader_emp_id as a parameters or object
    await getAllMarkedAttendanceList(data).then((response) => {
      if (response.data) {
        console.log(response.data,"response");
        console.log(response.data.length);
        setTeamMembersArray(response.data);
        setTeamMembers(response.data.length);
        // methanin response eken ena data eka   <FirstTeamMemberCard /> mekata yawanna one
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
          {/* <FirstTeamMemberCard/> */}
          {/* methenta 1 weni ekkenage object eka yawanna one get all eken */}
          {/* mekata thama set krnna one 1 weni employeege data tika.ganna data tika prop ekak wage yawala modal ekata set krnna one meka kranna puluwanda kiyala hithanna one ekama component eka api methana call krnne.e hinda tikak balanna one eka */}
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
              -
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Team_Member_List;
