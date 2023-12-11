import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import { IoCaretDown } from "react-icons/io5";
import "./TeamMemberCard.scss";
import { Button, Drawer, Radio, Input } from "antd";
import SignatureCanvas from "react-signature-canvas";
import { HiOutlineIdentification } from "react-icons/hi2";
import { FaRegUserCircle } from "react-icons/fa";
import { ScrollToTop } from "../utility/CommonFun";
import { RiLoader2Line } from "react-icons/ri";
import { customToastMsg } from "../utility/Utils";
import { markTeamMember } from "../services/teamMember";
import { updateTeamMember } from "../services/teamMember";
import { MEMBER } from "../constant/constants";
import "./TeamMemberCard.scss";



const TeamMemberCard = (teamMemberDetails) => {
  const [open, setOpen] = useState(false);

  const [tMemberID, setTMemberID] = useState("");
  const [tMemberName, setTMemberName] = useState("");
  const [tMemberRadio, setTMemberRadio] = useState("unchecked");
  const [sign, setSign] = useState();
  const [signurl, setSignUrl] = useState(undefined);

  const signatureRef = useRef(null);
  const [online, setOnline] = useState();
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(
      teamMemberDetails.teamMemberData,
      "card ekata ena team member detail eka"
    );
    const team_member_data = teamMemberDetails.teamMemberData;
    console.log(team_member_data, "card ekata ena team member detail eka");

    // if(team_member_data !== undefined){
    setTMemberID(team_member_data?.member_emp_id);
    setTMemberName(team_member_data?.member_name);
    setTMemberRadio(team_member_data?.contract_type);

    setSignUrl(team_member_data?.signature);
    setSignatureToSignaturepad(team_member_data?.signature);
    // }
  }, [open]);

  const setSignatureToSignaturepad = (signaureURL) => {
    if (signatureRef.current && signaureURL) {
      signatureRef.current.clear();
      signatureRef.current.fromDataURL(signaureURL);
    }
  };

  const setSignature = (data) => {
    if (data) {
      signatureRef.current = data;
      console.log(signatureRef, "set karana hana");
      //   signatureRef.current.off();
      setSign(data);
    } else {
      setSign(data);
    }
  };

  useEffect(() => {
    const onlineOrOffline = () => {
      if (
        signurl === undefined ||
        signurl ===
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAAtJREFUGFdjYAACAAAFAAGq1chRAAAAAElFTkSuQmCC"
      ) {
        console.log("empty signature");
        return (
          <GoDotFill
            id="online-offline"
            style={{ color: "red", margin: "0 20px 0 0", fontSize: "20px" }}
          />
        );
      } else {
        console.log("empty na sig");
        return (
          <GoDotFill
            id="online-offline"
            style={{ color: "green", margin: "0 20px 0 0", fontSize: "20px" }}
          />
        );
      }
    };

    setOnline(onlineOrOffline);
  }, [signurl]);

  const handleOnClickArrow = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
    navigate("/TeamMemberList");
  };

  const handleWheel = (e) => {
    e.preventDefault(); // Prevent default scrolling behavior
  };

  const handleGenerate = () => {
    console.log("out generate");
    console.log(signatureRef.current._sigPad._isEmpty, "log1");
    console.log(sign, "log2");
    if (sign) {
      console.log("in");
      const generatedUrl = sign?.getTrimmedCanvas().toDataURL("image/png");
      setSignUrl(generatedUrl);
      console.log(signurl, "usestate url1");
      console.log(generatedUrl, "generate url2");
    }
  };

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setTMemberRadio(e.target.value);

  };

  const handleClear = () => {
    signatureRef.current.on();
    signatureRef.current.clear();
    
    console.log(signatureRef, "clear krhama");

    console.log(signatureRef.current._sigPad._isEmpty, "clear out");

    console.log(sign, "sign eka thiynwada");

    if (sign) {
      console.log("clear in");
      sign.clear();
      setSignUrl(undefined);
    }
  };

  const checkTeamMemberInfo = () => {
    // console.log(tMemberID, tMemberName, tMemberRadio, sign, signurl);
    tMemberID.trim() === ""
      ? customToastMsg("Please Enter your Member ID!", 0)
      : tMemberName.trim() === ""
      ? customToastMsg("Please Enter your Name!", 0)
      : tMemberRadio === "unchecked"
      ? customToastMsg("Please Select one option!", 0)
      : // : sign.trim() === ""
        // ? customToastMsg("Please Enter your Signature!", 0)
        markTeamMemberAttendance();
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
      // sign: sign,
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
        onClose();
      })
      .catch((c) => {
        console.log(c, "error");
        customToastMsg("Unsuccessful !", 0);
      })
      .finally((f) => {
        setLoader(false);
      });
  };


  const checkUpdateTeamMemberInfo = () => {
    tMemberID.trim() === ""
      ? customToastMsg("Please Enter your Member ID!", 0)
      : tMemberName.trim() === ""
      ? customToastMsg("Please Enter your Name!", 0)
      : tMemberRadio === "unchecked"
      ? customToastMsg("Please Select one option!", 0)
      : // : sign.trim() === ""
        // ? customToastMsg("Please Enter your Signature!", 0)
       updateTeamMemberAttendance();
  }

  const updateTeamMemberAttendance = async () => {
    setLoader(true);

    teamMemberDetails.teamMemberData.member_emp_id=tMemberID,
    teamMemberDetails.teamMemberData.member_name=tMemberName,
    console.log(tMemberRadio,'udate');
    teamMemberDetails.teamMemberData.contract_type = tMemberRadio,
    teamMemberDetails.teamMemberData.signature=signurl,

    console.log("Team Member Details", teamMemberDetails.teamMemberData);
    updateTeamMember(teamMemberDetails.teamMemberData)
      .then((response) => {
        console.log(response, "teamMember");
        customToastMsg("Successfully Update Your Attendance !", 1);
        onClose();
      })
      .catch((c) => {
        console.log(c, "error");
        customToastMsg("Unsuccessful !", 0);
      })
      .finally((f) => {
        setLoader(false);
      });
  };

  return (
    <>
      <ScrollToTop />
      <div id="team-member-div">
        <h4>{tMemberName ? tMemberName : "Team Member"}</h4>
        <IoCaretDown id="down-arrow" onClick={handleOnClickArrow} />

        {online}
      </div>

      {/* ---------------------drower ---------------------------------------------------*/}
      <Drawer
        placement={"top"}
        width={"100%"}
        height={"100%"}
        onClose={onClose}
        open={open}
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
                  // ref={(data) => setSign(data)}
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
        {/* <img src={url} /> */}
      </Drawer>
    </>
  );
};

export default TeamMemberCard;
