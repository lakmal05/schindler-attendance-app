import React, { useState } from "react";
import "./Team_Member_List.scss";
import { BiSolidRightArrow } from "react-icons/bi";
import { Button } from "antd";
import { FaPlus } from "react-icons/fa6";
import TeamMemberCard from "../../components/TeamMemberCard";
import { useNavigate } from "react-router-dom";

const Team_Member_List = () => {
  const [teamMembers, setTeamMembers] = useState(2);

  const navigate = useNavigate();

  const appendTeamMember = () => {
    setTeamMembers((prevMembers) => prevMembers + 1);
  };

  const prependTeamMember = () => {
    setTeamMembers((prevMembers) => Math.max(1, prevMembers - 1));
  };

  const renderTeamMembers = () => {
    const members = [];
    for (let i = 0; i < teamMembers; i++) {
      members.push(
        // <div id="team-member-div" key={i}>
        //   <h4>Team Member</h4>
        //   <IoCaretDown id="down-arrow" onClick={toggleTeamMemberModal}/>
        //   <GoDotFill id="online-offline" />
        // </div>
        <TeamMemberCard key={i} />
      );
    }
    return members;
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
              -
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Team_Member_List;
