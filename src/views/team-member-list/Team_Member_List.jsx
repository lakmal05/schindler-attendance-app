import React from "react";
import "./Team_Member_List.scss";
import { GoDotFill } from "react-icons/go";
import { IoCaretDown } from "react-icons/io5";
import { BiSolidRightArrow } from "react-icons/bi";
import { Button } from "antd";
import { FaPlus } from "react-icons/fa6";

const Team_Member_List = () => {

    const appendTeamMember = () =>{

    }
    const prependTeamMember = () =>{

    }

  return (
    <>
      <div id="team-member-list">
        <div id="team-member-cnt">
          <div id="team-member-div">
            <h4>Team Member</h4>
            <IoCaretDown id="down-arrow" />
            <GoDotFill id="online-offline" />
          </div>
          <div id="team-member-div">
            <h4>Team Member</h4>
            <IoCaretDown id="down-arrow" />
            <GoDotFill id="online-offline" />
          </div>

          <Button id="get-pdf-btn" type="primary">
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
