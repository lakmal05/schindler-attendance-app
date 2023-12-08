import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { Input } from "antd";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import SignatureCanvas from "react-signature-canvas";
import { TimePicker } from "antd";
import { LiaToolboxSolid } from "react-icons/lia";
import { SlLocationPin } from "react-icons/sl";
import { RiLoader2Line } from "react-icons/ri";
import { MdOutlineTopic } from "react-icons/md";
import { customToastMsg } from "../../utility/Utils";
import "./Team_leader.scss";
import {
  getTeamLeader,
  markTeamLeader,
  getTeamLeaderAttendance,
  getLeaderAttendanceByAttendanceId,
  updateTeamleader,
} from "../../services/teamLeader";
import { LEADER, CONTRACT_TYPE_EMP } from "../../constant/constants";
import { async } from "q";

const Team_leader = () => {
  const [toolBoxNo, setToolBoxNo] = useState("");
  const [location, setLocation] = useState("");
  const [topic, setTopic] = useState("");
  const [tLDate, setTLDate] = useState(null);
  const [tlTtime, setTLTime] = useState("");
  const [sign, setSign] = useState("");
  const [signurl, setSignUrl] = useState();

  const [leaderObj, setLeaderObj] = useState({});

  const [loader, setLoader] = useState(false);
  const signatureRef = useRef(null);

  useEffect(() => {
    const local_storage_leader_obj = localStorage.getItem("leader_object");
    const leaderObj = JSON.parse(local_storage_leader_obj);
    setLeaderObj(leaderObj);
    console.log(leaderObj, "leaderObj");
    getLeaderMarkedAttendance();
  }, []);

  const navigate = useNavigate();
  const format = "HH:mm";

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

  const onChangeDate = async (date, dateString) => {
    console.log(date, dateString);
    await setTLDate(dateString);
  };
  const onChangeTime = async (time, timeString) => {
    console.log(time, timeString);
    await setTLTime(timeString);
  };

  const handleClear = () => {
    signatureRef.current.on();
    signatureRef.current.clear();
    console.log(signatureRef, "clear krhama");

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

  const getLeaderMarkedAttendance = async () => {
    const leader_attendance_details = await localStorage.getItem(
      "leader_attendance_details"
    );
    const marked_attendance_obj = JSON.parse(leader_attendance_details);

    getLeaderAttendanceByAttendanceId(marked_attendance_obj?.id)
      .then(async (response) => {
        console.log(response.data, "=============");

        const leaderAtendance = response.data;
        // execute_date = await new Date(leaderAtendance.execute_date);

        setToolBoxNo(leaderAtendance.tool_box_no);
        setLocation(leaderAtendance.location);
        setTopic(leaderAtendance.topic);
        setTLDate(leaderAtendance.execute_date);
        setTLTime(leaderAtendance.execute_time);
        setSignUrl(leaderAtendance.signature);
        setSignatureToSignaturepad(signurl);
      })
      .catch(() => {
        console.log("load All TeamLeader Attendance not working");
      });
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
      console.log(signatureRef, "set karana hana");
      //   signatureRef.current.off();
      setSign(data);
    } else {
      setSign(data);
    }
  };

  const checkTeamLeaderInfo = () => {
    toolBoxNo.trim() === ""
      ? customToastMsg("Please Enter your ToolBox No!", 0)
      : location.trim() === ""
      ? customToastMsg("Please Enter your Location!", 0)
      : topic.trim() === ""
      ? customToastMsg("Please Enter your Topic!", 0)
      : tLDate.trim() === ""
      ? customToastMsg("Please Enter Date!", 0)
      : tlTtime.trim() === ""
      ? customToastMsg("Please Enter Time!", 0)
      : // : sign.trim() === ""
        // ? customToastMsg("Please Enter your Signature!", 0)
        markTeamLeaderAttendance();
  };

  const markTeamLeaderAttendance = async () => {
    const local_storage_leader_obj = await localStorage.getItem(
      "leader_object"
    );
    const leaderObj = JSON.parse(local_storage_leader_obj);

    setLoader(true);

    let data = {
      leader_emp_id: await leaderObj.emp_id,
      member_name: await (leaderObj.first_name + " " + leaderObj.last_name),
      member_emp_id: await leaderObj.emp_id,
      contract_type: CONTRACT_TYPE_EMP,
      tool_box_no: toolBoxNo,
      location: location,
      topic: topic,
      execute_date: tLDate,
      execute_time: tlTtime,
      // sign: sign,
      signature: signurl,
      type: LEADER,
    };

    markTeamLeader(data)
      .then(async (response) => {
        //   {
        //     "id": "8d07526e-8ef4-422a-8852-9f8e68df6101",
        //     "leader_emp_id": "1000",  -------
        //     "member_name": "lakmal madushani",
        //     "member_emp_id": "1000",
        //     "execute_date": "2023-12-04T12:08:00.000Z", ----
        //     "execute_time": "12:08",
        //     "location": "adn",
        //     "contract_type": "EMP",
        //     "tool_box_no": "121",  -----
        //     "topic": "asdfasdf",
        //     "signature": "signature",
        //     "created_at": "2023-12-04T10:38:29.797Z",
        //     "updated_at": "2023-12-04T10:38:29.797Z",
        //     "type": "LEADER"
        // }

        customToastMsg("Successfully Mark Your Attendance !", 1);
        const leaderAttendance = {
          id: response.data.id,
          leader_emp_id: response.data.leader_emp_id,
          execute_date: response.data.execute_date,
          tool_box_no: response.data.tool_box_no,
          // created_at: response.data.created_at,
        };
        await localStorage.setItem(
          "leader_attendance_details",
          JSON.stringify(leaderAttendance)
        );

        navigate("/TeamMember");
      })
      .catch((c) => {
        customToastMsg("Unsuccessful !", 0);
      })
      .finally((f) => {
        setLoader(false);
      });
  };

  const checkUpdateTeamLeaderInfo = () => {
    toolBoxNo.trim() === ""
      ? customToastMsg("Please Enter your ToolBox No!", 0)
      : location.trim() === ""
      ? customToastMsg("Please Enter your Location!", 0)
      : topic.trim() === ""
      ? customToastMsg("Please Enter your Topic!", 0)
      : tLDate.trim() === ""
      ? customToastMsg("Please Enter Date!", 0)
      : tlTtime.trim() === ""
      ? customToastMsg("Please Enter Time!", 0)
      : // : sign.trim() === ""
        // ? customToastMsg("Please Enter your Signature!", 0)
        updateTeamLeaderAttendance();
  };

  const updateTeamLeaderAttendance = async () => {
    // const local_storage_leader_obj = await localStorage.getItem(
    //   "leader_object"
    // );
    // const leaderObj = JSON.parse(local_storage_leader_obj);

    setLoader(true);

    const leader_attendance_details = JSON.parse(
      await localStorage.getItem("leader_attendance_details")
    );

    leader_attendance_details.tool_box_no = toolBoxNo;
    leader_attendance_details.location = location;
    leader_attendance_details.execute_date = tLDate;
    leader_attendance_details.execute_time = tlTtime;
    leader_attendance_details.topic = topic;
    leader_attendance_details.signature = signurl;

    // let data = {
    //   leader_emp_id: await leaderObj.emp_id,
    //   member_name: await (leaderObj.first_name + " " + leaderObj.last_name),
    //   member_emp_id: await leaderObj.emp_id,
    //   contract_type: CONTRACT_TYPE_EMP,
    //   tool_box_no: toolBoxNo,
    //   location: location,
    //   topic: topic,
    //   execute_date: tLDate,
    //   execute_time: tlTtime,
    //   // sign: sign,
    //   signurl: signurl,
    //   type: LEADER,
    // };

    updateTeamleader(leader_attendance_details)
      .then(async (response) => {
        customToastMsg("Successfully Update Your Attendance !", 1);
        const leaderAttendance = {
          id: response.data.id,
          leader_emp_id: response.data.leader_emp_id,
          execute_date: response.data.execute_date,
          tool_box_no: response.data.tool_box_no,
          // created_at: response.data.created_at,
        };
        await localStorage.setItem(
          "leader_attendance_details",
          JSON.stringify(leaderAttendance)
        );

        navigate("/TeamMemberList");
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
      <div id="team-leader">
        <div id="team-leader-form">
          <h2 id="tl-name">
            {leaderObj.first_name +
              " " +
              (leaderObj.last_name
                ? leaderObj.last_name.charAt(0).toUpperCase() +
                  leaderObj.last_name.slice(1)
                : "")}
          </h2>
          <h2 id="tl-id">ID : {leaderObj.emp_id}</h2>
          <h3>Team Leader</h3>
          <p>Mark Your Attendance</p>

          <Input
            onChange={async (e) => await setToolBoxNo(e.target.value)}
            value={toolBoxNo}
            style={{ backgroundColor: "#EEEEEE", margin: "12px 0" }}
            placeholder="Tool Box Num"
            type="number"
            suffix={
              <LiaToolboxSolid
                style={{
                  color: "#9D9D9D",
                  fontSize: "18px",
                }}
              />
            }
          />
          <Input
            onChange={async (e) => await setLocation(e.target.value)}
            value={location}
            style={{ backgroundColor: "#EEEEEE", margin: "12px 0" }}
            placeholder="Location"
            type="text"
            suffix={
              <SlLocationPin
                style={{
                  color: "#9D9D9D",
                  fontSize: "18px",
                }}
              />
            }
          />
          <DatePicker
            id="date-picker"
            // value={tLDate}
            onChange={onChangeDate}
            style={{
              backgroundColor: "#EEEEEE",
              margin: "12px 0",
              width: "100%",
            }}
            placeholder="Project Date"
          />

          <TimePicker
            id="time-picker"
            onChange={onChangeTime}
            // value={tlTtime}
            defaultOpenValue={dayjs("12:08", format)}
            format={format}
            style={{
              backgroundColor: "#EEEEEE",
              margin: "12px 0",
              width: "100%",
            }}
            placeholder="Project Time"
          />

          <Input
            onChange={async (e) => await setTopic(e.target.value)}
            value={topic}
            style={{ backgroundColor: "#EEEEEE", margin: "12px 0" }}
            placeholder="Topic"
            type="text"
            suffix={
              <MdOutlineTopic
                style={{
                  color: "#9D9D9D",
                  fontSize: "18px",
                }}
              />
            }
          />

          <div id="signature" onWheel={handleWheel} onClick={handleGenerate}>
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

          {localStorage.getItem("leader_attendance_details") ? (
            <Button
              id="team-leader-btn"
              type="primary"
              onClick={checkUpdateTeamLeaderInfo}
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
              id="team-leader-btn"
              type="primary"
              onClick={checkTeamLeaderInfo}
            >
              {" "}
              {!loader ? (
                "Next"
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
    </>
  );
};

export default Team_leader;
