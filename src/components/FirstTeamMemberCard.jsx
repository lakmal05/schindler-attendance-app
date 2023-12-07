import React, { useEffect, useState, useRef } from "react";
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
import { updateTeamMember } from "../services/teamMember";
import "./TeamMemberCard.scss";

const FirstTeamMemberCard = () => {
  const [open, setOpen] = useState(false);

  const [tMemberID, setTMemberID] = useState("");
  const [tMemberName, setTMemberName] = useState("");
  const [tMemberRadio, setTMemberRadio] = useState("unchecked");
  const [sign, setSign] = useState(null);
  const [signurl, setSignUrl] = useState(undefined);

  const signatureRef = useRef(null);

  const [online, setOnline] = useState();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const firstTeamMember = JSON.parse(
      localStorage.getItem("first-team-member")
    );

    console.log(firstTeamMember, "firstMemb");
    setTMemberID(firstTeamMember.member_emp_id);
    setTMemberName(firstTeamMember.member_name);
    setTMemberRadio(firstTeamMember.contract_type);

    setSignUrl(firstTeamMember.signurl);
    setSignatureToSignaturepad(signurl);
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
      if(signurl === undefined || signurl === 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAAtJREFUGFdjYAACAAAFAAGq1chRAAAAAElFTkSuQmCC'){
        console.log("empty signature");
        return(
          <GoDotFill
          id="online-offline"
          style={{ color: "red", margin: "0 20px 0 0", fontSize: "20px" }}
        />
        )
      }else{
        console.log("empty na sig");
        return(
          <GoDotFill
          id="online-offline"
          style={{ color: "green", margin: "0 20px 0 0", fontSize: "20px" }}
        />
        )
      }
      // return signurl === undefined ? (
      //   <GoDotFill
      //     id="online-offline"
      //     style={{ color: "red", margin: "0 20px 0 0", fontSize: "20px" }}
      //   />
      // ) : (
      //   <GoDotFill
      //     id="online-offline"
      //     style={{ color: "green", margin: "0 20px 0 0", fontSize: "20px" }}
      //   />
      // );
    };

    setOnline(onlineOrOffline);
  }, [signurl]);

  const handleOnClickArrow = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleWheel = (e) => {
    e.preventDefault(); // Prevent default scrolling behavior
  };

  const handleGenerate = () => {
    console.log("out generate");
    console.log(signatureRef.current._sigPad._isEmpty, "log1");
    console.log(sign, "log2");
    // ======================if eka athulata yanne na=====================================
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
    // sign.clear();
    // setSignUrl(undefined);

    // methana signature pad eka wagema signature detail eka nathi wela update ekak wenna one
    // signature eka clear kaloth online button eka para rathu wenna one
    // generate wena url eke hariyata thiynwan .eth state eke clear wenne na url clear url ekak thiyna.eth state eke parana ekamai thiyanne clear wela na.aluh ekaka gahuwoth eka enwa.clear krl mukuth nogha  thibboth parana ekama thiynwa

    // hariyata wada krnne na meka

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

  const markTeamMemberAttendance = () => {
    setLoader(true);

    const firstTeamMember = JSON.parse(
      localStorage.getItem("first-team-member")
    );
    firstTeamMember.contract_type = tMemberRadio;
    firstTeamMember.member_emp_id = tMemberID;
    firstTeamMember.member_name = tMemberName;
    firstTeamMember.signurl = signurl;
    console.log(firstTeamMember.signurl, "url");

    // meka ai kalpana krnna useeffect eka drower eka open wena hama welema wada krnwa.e hinda eka krnna puluwan weida--->localstorage eken aragena eka set karala eken credentials object eka hadala eka passe krnwa update ekata
    // meke apiset karapu value ai update krnna puluwan wennath one

    // let credentials = {
    //   //   leader_emp_id: await firstTeamMember.leader_emp_id,
    //   member_name: tMemberName,
    //   member_emp_id: tMemberID,
    //   contract_type: tMemberRadio,
    //   // sign: sign,
    //   signurl: signurl,
    //   //   execute_date: await leaderObj.execute_date,
    //   //   tool_box_no: await leaderObj.tool_box_no,
    //   type: MEMBER,
    // };

    console.log("Team Member Details", firstTeamMember);
    updateTeamMember(firstTeamMember)
      .then((response) => {
        console.log(response, "teamMember");
        localStorage.setItem(
          "first-team-member",
          JSON.stringify(firstTeamMember)
        );
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
        <h4>{tMemberName ? tMemberName : "First Team Member"}</h4>
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
            <h2 id="tm-name">
              {tMemberName ? tMemberName : "First Team Member"}
            </h2>
            <h3>Team Member</h3>
            <p>Mark Your Attendance</p>
            <Input
              onChange={(e) => setTMemberID(e.target.value)}
              style={{ backgroundColor: "#EEEEEE", margin: "12px 0" }}
              placeholder="ID"
              type="text"
              value={tMemberID}
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
              required
              placeholder="Name"
              type="text"
              value={tMemberName}
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
                  //   ref={(ref) => {
                  //     if (ref) {
                  //       signatureRef.current = ref;
                  //       signatureRef.current.onBegin = () => {};
                  //     } else {
                  //       setSign(ref);
                  //     }
                  //   }}
                />
              </div>
              <Button id="signature-clear-btn" ghost onClick={handleClear}>
                {" "}
                Clear
              </Button>
            </div>

            <Button
              id="team-member-btn"
              type="primary"
              onClick={checkTeamMemberInfo}
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
          </div>
        </div>
        {/* <img src={url} /> */}
      </Drawer>
    </>
  );
};

export default FirstTeamMemberCard;
