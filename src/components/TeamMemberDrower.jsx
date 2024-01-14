import React from "react";

import { Drawer } from "antd";
import DrowerTeamMemberForm from "./DrowerTeamMemberForm";

const TeamMemberDrower = ({ isOpen, toggel, teamMemberDetails }) => {
  return (
    <>
      <Drawer
        placement={"top"}
        width={"100%"}
        height={"100%"}
        onClose={toggel}
        open={isOpen}
      >
        <DrowerTeamMemberForm
          isOpen={isOpen}
          toggel={toggel}
          teamMemberDetails={teamMemberDetails}
        />
      </Drawer>
    </>
  );
};

export default TeamMemberDrower;
