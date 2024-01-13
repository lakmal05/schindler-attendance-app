import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Drawer, Radio, Input } from "antd";
import SignatureCanvas from "react-signature-canvas";
import { HiOutlineIdentification } from "react-icons/hi2";
import { FaRegUserCircle } from "react-icons/fa";
import { RiLoader2Line } from "react-icons/ri";
import { customToastMsg } from "../utility/Utils";
import { markTeamMember } from "../services/teamMember";
import { updateTeamMember } from "../services/teamMember";
import { MEMBER } from "../constant/constants";
import "./TeamMemberDrower.scss";

const TeamMemberDrower = ({ isOpen, toggel, teamMemberDetails }) => {
  const [tMemberID, setTMemberID] = useState("");
  const [tMemberName, setTMemberName] = useState("");
  const [tMemberRadio, setTMemberRadio] = useState("unchecked");
  const [sign, setSign] = useState();
  const [signurl, setSignUrl] = useState(undefined);

  const signatureRef = useRef(null);

  const [loader, setLoader] = useState(false);

  // const navigate = useNavigate();

  useEffect(() => {
    const team_member_data = teamMemberDetails.teamMemberData;
    console.log(team_member_data, "card ekata ena team member detail eka");

    if (team_member_data !== undefined) {
      setTMemberID(team_member_data?.member_emp_id);
      setTMemberName(team_member_data?.member_name);
      setTMemberRadio(team_member_data?.contract_type);

      setSignUrl(team_member_data?.signature);
    }
  }, [isOpen, teamMemberDetails.teamMemberData]);


  useEffect(() => {
    console.log(teamMemberDetails.teamMemberData?.signature, "url");
    if ((isOpen && teamMemberDetails.teamMemberData?.signature !== undefined) || teamMemberDetails.teamMemberData?.signature !== null) {
      setSignatureToSignaturepad(teamMemberDetails.teamMemberData?.signature);
    }
  },[isOpen]);

  const onChange = (e) => {
    setTMemberRadio(e.target.value);
  };

  const handleWheel = (e) => {
    e.preventDefault(); // Prevent default scrolling behavior
  };

  const setSignatureToSignaturepad = (signaureURL) => {
    if (signatureRef.current && signaureURL) {
      signatureRef.current.clear();
      signatureRef.current.fromDataURL(signaureURL);
    }
  };

  const setSignature = (data) => {
    if (data) {
      signatureRef.current = data;
      //   signatureRef.current.off();
      setSign(data);
    } else {
      setSign(data);
    }
  };

  const handleGenerate = () => {
    // console.log("out generate");
    // console.log(signatureRef.current._sigPad._isEmpty, "log1");
    // console.log(sign, "log2");
    if (sign) {
      console.log("in");
      const generatedUrl = sign?.getTrimmedCanvas().toDataURL("image/png");
      setSignUrl(generatedUrl);
      console.log(signurl, "usestate url1");
      console.log(generatedUrl, "generate url2");
    }
  };

  const handleClear = () => {
    signatureRef.current.on();
    signatureRef.current.clear();

    if (sign) {
      console.log("clear in");
      sign.clear();
      setSignUrl(undefined);
    }
  };

  // ======================================Add TeamMember=============================================

  const checkTeamMemberInfo = () => {
    tMemberID.trim() === ""
      ? customToastMsg("Please Enter your Member ID!", 0)
      : tMemberName.trim() === ""
      ? customToastMsg("Please Enter your Name!", 0)
      : tMemberRadio === "unchecked"
      ? customToastMsg("Please Select one option!", 0)
      : markTeamMemberAttendance();
  };

  const markTeamMemberAttendance = async () => {
    setLoader(true);

    const local_storage_leader_obj = await localStorage.getItem(
      "leader_attendance_details"
    );
    const leaderObj = JSON.parse(local_storage_leader_obj);

    let data = {
      leader_emp_id: await leaderObj.leader_emp_id,
      member_name: tMemberName,
      member_emp_id: tMemberID,
      contract_type: tMemberRadio,
      signature: signurl,
      execute_date: await leaderObj.execute_date,
      tool_box_no: await leaderObj.tool_box_no,
      type: MEMBER,
    };

    console.log("Team Member Details", data);
    markTeamMember(data)
      .then((response) => {
        console.log(response, "teamMember");
        customToastMsg("Successfully Mark Your Attendance !", 1);
        toggel();
        window.location.href = "/TeamMemberList";
      })
      .catch((c) => {
        customToastMsg("Unsuccessful !", 0);
      })
      .finally((f) => {
        setLoader(false);
      });
  };

  // ======================================Update TeamMember=============================================

  const checkUpdateTeamMemberInfo = () => {
    tMemberID.trim() === ""
      ? customToastMsg("Please Enter your Member ID!", 0)
      : tMemberName.trim() === ""
      ? customToastMsg("Please Enter your Name!", 0)
      : tMemberRadio === "unchecked"
      ? customToastMsg("Please Select one option!", 0)
      : // : signurl === undefined || signurl === null
        // ? customToastMsg("Please Enter your Signature!", 0)
        updateTeamMemberAttendance();
  };

  const updateTeamMemberAttendance = async () => {
    setLoader(true);

    const updateTeamMemberObj = {
      id: teamMemberDetails.teamMemberData.id,
      member_emp_id: tMemberID,
      member_name: tMemberName,
      contract_type: tMemberRadio,
      signature: signurl,
    };

    // getall ekak danna one

    // teamMemberDetails.teamMemberData.member_emp_id = tMemberID,
    // teamMemberDetails.teamMemberData.member_name = tMemberName,
    // teamMemberDetails.teamMemberData.contract_type = tMemberRadio,
    // teamMemberDetails.teamMemberData.signature = signurl,

    console.log("update Team Member Details", updateTeamMemberObj);
    updateTeamMember(updateTeamMemberObj)
      .then((response) => {
        console.log(response.data, "teamMember");
        customToastMsg("Successfully Update Your Attendance !", 1);
        toggel();
        // window.location.href = "/TeamMemberList";
      })
      .catch((c) => {
        customToastMsg("Unsuccessful !", 0);
      })
      .finally((f) => {
        setLoader(false);
      });
  };

  return (
    <>
      <Drawer
        placement={"top"}
        width={"100%"}
        height={"100%"}
        onClose={toggel}
        open={isOpen}
      >
        <div id="team-member-drower">
          <div id="team-member-form">
            <h2 id="tm-name">{tMemberName ? tMemberName : "Team Member"}</h2>
            <h3>Team Member</h3>
            <p>Mark Your Attendance</p>
            <Input
              onChange={(e) => setTMemberID(e.target.value)}
              value={tMemberID}
              style={{ backgroundColor: "#EEEEEE", margin: "12px 0" }}
              placeholder="ID"
              type="text"
              suffix={
                <HiOutlineIdentification
                  style={{
                    color: "#9D9D9D",
                    fontSize: "18px",
                  }}
                />
              }
            />
            <Input
              style={{ backgroundColor: "#EEEEEE", margin: "12px 0" }}
              onChange={(e) => setTMemberName(e.target.value)}
              value={tMemberName}
              required
              placeholder="Name"
              type="text"
              suffix={
                <FaRegUserCircle
                  style={{
                    color: "#9D9D9D",
                    fontSize: "18px",
                  }}
                />
              }
            />

            <Radio.Group
              id="team-member-radio-btn"
              onChange={onChange}
              value={tMemberRadio}
            >
              <Radio value={"EMP"}>Employee</Radio>
              <Radio value={"SUBCON"}>Sub</Radio>
            </Radio.Group>

            <div
              id="signature-member"
              onWheel={handleWheel}
              onClick={handleGenerate}
            >
              <div id="signature-div">
                <SignatureCanvas
                  canvasProps={{ className: "sigCanvas" }}
                  ref={(ref) => {
                    setSignature(ref);
                  }}
                />
              </div>
              <Button id="signature-clear-btn" ghost onClick={handleClear}>
                {" "}
                Clear
              </Button>
            </div>

            {teamMemberDetails.teamMemberData ? (
              <Button
                id="team-member-btn"
                type="primary"
                onClick={checkUpdateTeamMemberInfo}
              >
                {" "}
                {!loader ? (
                  "Update"
                ) : (
                  <span>
                    <RiLoader2Line />
                    <span style={{ marginLeft: "5px" }}> loading ... </span>
                  </span>
                )}
              </Button>
            ) : (
              <Button
                id="team-member-btn"
                type="primary"
                onClick={checkTeamMemberInfo}
              >
                {" "}
                {!loader ? (
                  "Done"
                ) : (
                  <span>
                    <RiLoader2Line />
                    <span style={{ marginLeft: "5px" }}> loading ... </span>
                  </span>
                )}
              </Button>
            )}
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default TeamMemberDrower;
