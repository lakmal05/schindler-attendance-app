import React, { useState, useEffect } from "react";
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
import { markTeamLeader } from "../../services/teamLeader";
import { LEADER, CONTRACT_TYPE_EMP } from "../../constant/constants";

const Team_leader = () => {
  const [toolBoxNo, setToolBoxNo] = useState("");
  const [location, setLocation] = useState("");
  const [topic, setTopic] = useState("");
  const [tLDate, setTLDate] = useState("");
  const [tlTtime, setTLTime] = useState("");
  const [sign, setSign] = useState("");
  const [signurl, setSignUrl] = useState();
  const [leaderObj, setLeaderObj] = useState({});

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const local_storage_leader_obj = localStorage.getItem("leader_object");
    const leaderObj = JSON.parse(local_storage_leader_obj);
    setLeaderObj(leaderObj);
  }, []);

  const navigate = useNavigate();
  const format = "HH:mm";

  const handleWheel = (e) => {
    e.preventDefault(); // Prevent default scrolling behavior
  };

  const handleGenerate = () => {
    const generatedUrl = sign.getTrimmedCanvas().toDataURL("image/png");
    setSignUrl(generatedUrl);
    // console.log(signurl, "usestate url");
    // console.log(generatedUrl, "generate url");
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
    sign.clear();
    setSignUrl("");
  };

  const checkTeamLeaderInfo = () => {
    //  console.log(toolBoxNo, location, tLDate, tlTtime, sign, signurl);
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

    // dispatch(actionLoaderCreator.loaderHandler(true));
    setLoader(true);

    let data = {
      leader_emp_id: await leaderObj.emp_id,
      member_name: await (leaderObj.first_name + " " + leaderObj.last_name),
      member_emp_id: await leaderObj.emp_id,
      contract_type: CONTRACT_TYPE_EMP,
      tool_box_no: toolBoxNo,
      location: location,
      topic: topic,
      date: tLDate,
      time: tlTtime,
      sign: sign,
      signurl: signurl,
      type: LEADER,
    };

    console.log("Team Leader Details", data);
    markTeamLeader(data)
      .then((response) => {
        //console.log(response, "teamLeader");
        customToastMsg("Successfully Mark Your Attendance !", 1);
        // props.toggleContactModal();
        //window.location.href = "/TeamMember";
        // navigate("/TeamMember");
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
            {leaderObj.first_name + " " + leaderObj.last_name}
          </h2>
          <h2 id="tl-id">ID : {leaderObj.emp_id}</h2>
          <h3>Team Leader</h3>
          <p>Mark Your Attendance</p>

          <Input
            onChange={async (e) => await setToolBoxNo(e.target.value)}
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
            onChange={onChangeDate}
            style={{
              backgroundColor: "#EEEEEE",
              margin: "12px 0",
              width: "100%",
            }}
            placeholder="Date"
          />

          <TimePicker
            id="time-picker"
            onChange={onChangeTime}
            defaultOpenValue={dayjs("12:08", format)}
            format={format}
            style={{
              backgroundColor: "#EEEEEE",
              margin: "12px 0",
              width: "100%",
            }}
            placeholder="Time"
          />

          <Input
            onChange={async (e) => await setTopic(e.target.value)}
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
                ref={(data) => setSign(data)}
                sign
              />
            </div>
            <Button id="signature-clear-btn" ghost onClick={handleClear}>
              {" "}
              Clear
            </Button>
          </div>

          <Button
            id="team-leader-btn"
            type="primary"
            onClick={checkTeamLeaderInfo}
          >
            {" "}
            {!loader ? (
              "  Next"
            ) : (
              <span>
                <RiLoader2Line />
                <span style={{ marginLeft: "5px" }}> loading ... </span>
              </span>
            )}
          </Button>
        </div>
      </div>
      {/* <img src={signurl} /> */}
    </>
  );
};

export default Team_leader;
