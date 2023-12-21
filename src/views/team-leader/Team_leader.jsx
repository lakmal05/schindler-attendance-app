import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "antd";
import { FormGroup, Label } from "reactstrap";

// import Flatpickr from "react-flatpickr";
// import "flatpickr/dist/themes/material_red.css";
import moment from "moment";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import SignatureCanvas from "react-signature-canvas";
// import { TimePicker } from "antd";
// import { DatePicker } from "antd";
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
  const [tLDate, setTLDate] = useState("");
  const [tlTtime, setTLTime] = useState("");
  const [sign, setSign] = useState("");
  const [signurl, setSignUrl] = useState(undefined);

  
  const [leaderObj, setLeaderObj] = useState({});

  const [loader, setLoader] = useState(false);
  const signatureRef = useRef(null);

  useEffect(() => {
    const local_storage_leader_obj = localStorage.getItem("leader_object");
    const leaderObj = JSON.parse(local_storage_leader_obj);
    setLeaderObj(leaderObj);
    getLeaderMarkedAttendance();
  }, []);

  const navigate = useNavigate();
  const format = "HH:mm";

  const onChangeDate = async (e) => {
    await setTLDate(e.target.value);
  };
  const onChangeTime = async (e) => {
    await setTLTime(e.target.value);
  };

  const handleWheel = (e) => {
    e.preventDefault(); // Prevent default scrolling behavior
  };

  const handleGenerate = () => {
    // console.log("out generate");
    /// console.log(signatureRef.current._sigPad._isEmpty, "log1");
    // console.log(sign, "log2");
    if (sign) {
      console.log("in");
      const generatedUrl = sign?.getTrimmedCanvas().toDataURL("image/png");
      setSignUrl(generatedUrl);
      // console.log(signurl, "usestate url1");
      //  console.log(generatedUrl, "generate url2");
    }
  };

  const handleClear = () => {
    signatureRef.current.on();
    signatureRef.current.clear();

    // console.log(signatureRef, "clear krhama");
    // console.log(signatureRef.current._sigPad._isEmpty, "clear out");
    // console.log(sign, "sign eka thiynwada");

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

    if (marked_attendance_obj !== null) {
      getLeaderAttendanceByAttendanceId(marked_attendance_obj?.id)
        .then(async (response) => {
          const leaderAtendance = response.data;

          setToolBoxNo(leaderAtendance.tool_box_no);
          setLocation(leaderAtendance.location);
          setTopic(leaderAtendance.topic);
          setTLDate(moment(leaderAtendance.execute_date).format("yyyy-MM-DD"));
          setTLTime(leaderAtendance.execute_time);
          setSignUrl(leaderAtendance.signature);
          setSignatureToSignaturepad(leaderAtendance.signature);
        })
        .catch(() => {
          console.log("load All TeamLeader Attendance not working");
        });
    }
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
      //console.log(signatureRef, "set karana hana");
      //   signatureRef.current.off();
      setSign(data);
    } else {
      setSign(data);
    }
  };

  // ===============================================Add Leader Attendance=============================================
  const checkTeamLeaderInfo = () => {
    toolBoxNo.trim() === ""
      ? customToastMsg("Please Enter your ToolBox No!", 0)
      : location.trim() === ""
      ? customToastMsg("Please Enter your Location!", 0)
      : tLDate.trim() === ""
      ? customToastMsg("Please Enter Date!", 0)
      : tlTtime.trim() === ""
      ? customToastMsg("Please Enter Time!", 0)
      : topic.trim() === ""
      ? customToastMsg("Please Enter your Topic!", 0)
      : signurl === undefined || signurl === null
      ? customToastMsg("Please Enter your Signature!", 0)
      : markTeamLeaderAttendance();
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
      execute_date: moment(tLDate).format("yyyy-MM-DD"),
      execute_time: tlTtime,
      signature: signurl,
      type: LEADER,
    };

    markTeamLeader(data)
      .then(async (response) => {
        customToastMsg("Successfully Mark Your Attendance !", 1);
        const leaderAttendance = {
          id: response.data.id,
          leader_emp_id: response.data.leader_emp_id,
          execute_date: moment(response.data.execute_date).format("yyyy-MM-DD"),
          tool_box_no: response.data.tool_box_no,
          created_at: response.data.created_at,
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

  // ===============================================Update Leader Attendance=============================================
  const checkUpdateTeamLeaderInfo = () => {
    toolBoxNo.trim() === ""
      ? customToastMsg("Please Enter your ToolBox No!", 0)
      : location.trim() === ""
      ? customToastMsg("Please Enter your Location!", 0)
      : tLDate.trim() === ""
      ? customToastMsg("Please Enter Date!", 0)
      : tlTtime.trim() === ""
      ? customToastMsg("Please Enter Time!", 0)
      : topic.trim() === ""
      ? customToastMsg("Please Enter your Topic!", 0)
      : signurl === undefined || signurl === null
      ? customToastMsg("Please Enter your Signature!", 0)
      : updateTeamLeaderAttendance();
  };

  const updateTeamLeaderAttendance = async () => {
    setLoader(true);

    const leader_attendance_details = JSON.parse(
      await localStorage.getItem("leader_attendance_details")
    );

    getLeaderAttendanceByAttendanceId(leader_attendance_details?.id)
      .then(async (res) => {
        const oldLeaderAtendance = {
          id: res.data.id,
          leader_emp_id: res.data.leader_emp_id,
          execute_date: res.data.execute_date,
          tool_box_no: res.data.tool_box_no,
        };

        const leaderAtendanceById = {
          tool_box_no: toolBoxNo,
          location: location,
          execute_date: moment(tLDate).format("yyyy-MM-DD"),
          execute_time: tlTtime,
          topic: topic,
          signature: signurl,
        };

        console.log("update wena obj eka", leaderAtendanceById);

        const updateLeaderAttendance = {
          oldAttendance: oldLeaderAtendance,
          updateAttendance: leaderAtendanceById,
        };

        console.log(updateLeaderAttendance, " new full objef6");
        updateTeamleader(updateLeaderAttendance)
          .then(async (response) => {
            customToastMsg("Successfully Update Your Attendance !", 1);
            console.log(response, "response eka yko");
            const leaderAttendance = {
              id: response.data.id,
              leader_emp_id: response.data.leader_emp_id,
              execute_date: response.data.execute_date,
              tool_box_no: response.data.tool_box_no,
              // created_at: response.data.created_at,
            };
            console.log(response, "respose");
            console.log(leaderAttendance, "ledaer-attendance");
            console.log(response.data.leader_emp_id, "response data id");
            localStorage.setItem(
              "leader_attendance_details",
              JSON.stringify(leaderAttendance)
            );
            const update_object = localStorage.getItem(
              "leader_attendance_details"
            );

            console.log(JSON.parse(update_object), "===========new ");

            navigate("/TeamMemberList");
          })
          .catch((c) => {
            customToastMsg("Unsuccessful !", 0);
          })
          .finally((f) => {
            setLoader(false);
          });
      })
      .catch((c) => {
        console.log(c, "error");
        console.log("load All TeamLeader Attendance not working");
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
          {/* <DatePicker
            // id="date-picker"
            value={tLDate ? moment(tLDate) : null}
            onChange={onChangeDate}
            style={{
              backgroundColor: "#EEEEEE",
              margin: "12px 0",
              width: "100%",
            }}
            placeholder="Project Date"
          /> */}

          <Input
            id="date-picker"
            name="date"
            value={tLDate}
            onChange={onChangeDate}
            style={{
              backgroundColor: "#EEEEEE",
              margin: "12px 0",
              width: "100%",
            }}
            placeholder="Project Date"
            type="date"
          />

          <Input
            name="time"
            type="time"
            id="time-picker"
            onChange={onChangeTime}
            value={tlTtime}
            defaultOpenValue={dayjs("12:08", format)}
            format={format}
            style={{
              backgroundColor: "#EEEEEE",
              margin: "12px 0",
              width: "100%",
            }}
            placeholder="Project Time"
          />

          {/* <Flatpickr
            // id="date-picker"
            placeholder="Project Date"
            className="form-control"
            value={tLDate === "" ? null : tLDate}
            onChange={([date]) => {
              setTLDate(moment(date).format("yyyy-MM-DD"));
            }}
            options={{
              defaultDate: null,
              disableMobile: "false"
            }}
          />
          <Flatpickr
            // id="time-picker"
            placeholder="Project Time"
            className="form-control"
            data-enable-time
            value={tlTtime === "" ? null : tlTtime}
            onChange={([time]) => {
              setTLTime(moment(time).format("HH:MM"));
            }}
            options={{
              enableTime: true,
              noCalendar: true,
              dateFormat: "H:i",
              time_24hr: true,
              disableMobile: "false"
            }}
          /> */}

          {/* <TimePicker
            id="time-picker"
            onChange={onChangeTime}
            value={tlTtime ? moment(tlTtime, format) : null}
            defaultOpenValue={dayjs("12:08", format)}
            format={format}
            style={{
              backgroundColor: "#EEEEEE",
              margin: "12px 0",
              width: "100%",
            }}
            placeholder="Project Time"
          /> */}

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
