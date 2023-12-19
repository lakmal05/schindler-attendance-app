import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import { IoCaretDown } from "react-icons/io5";
import { ScrollToTop } from "../utility/CommonFun";
import "./TeamMemberCard.scss";
import TeamMemberDrower from "./TeamMemberDrower";

const TeamMemberCard = (teamMemberDetails) => {
  const [isTeamMemberDrower, setIsTeamMemberDrower] = useState(false);

  const toggleTeamMemberDrower = () => {
    setIsTeamMemberDrower(!isTeamMemberDrower);
  };

  const memberName =
    teamMemberDetails?.teamMemberData?.member_name || "Team Member";

  const signature = teamMemberDetails?.teamMemberData?.signature;

  return (
    <>
      <ScrollToTop />
      <div id="team-member-div">
        <TeamMemberDrower
          isOpen={isTeamMemberDrower}
          toggel={toggleTeamMemberDrower}
          teamMemberDetails={teamMemberDetails}
        />

        <h4>{memberName}</h4>
        <IoCaretDown id="down-arrow" onClick={toggleTeamMemberDrower} />

        <GoDotFill
          id="online-offline"
          style={{
            color:
              signature === null ||
              signature === undefined ||
              signature ===
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAAtJREFUGFdjYAACAAAFAAGq1chRAAAAAElFTkSuQmCC"
                ? "red"
                : "green",
            margin: "0 20px 0 0",
            fontSize: "20px",
          }}
        />
      </div>
    </>
  );
};

export default TeamMemberCard;
