import React, { useState } from "react";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import { Button } from "antd";
import { Input } from "antd";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import SignatureCanvas from "react-signature-canvas";
import { TimePicker } from "antd";
import { LiaToolboxSolid } from "react-icons/lia";
import { SlLocationPin } from "react-icons/sl";
import "./Team_leader.scss";

const Team_leader = () => {
  const [sign, setSign] = useState();
  const [url, setUrl] = useState();

  const handleWheel = (e) => {
    e.preventDefault(); // Prevent default scrolling behavior
  };

  const onChangeDate = (date, dateString) => {
    console.log(date, dateString);
  };
  const onChangeTime = (time, timeString) => {
    console.log(time, timeString);
  };

  const handleClear = () => {
    sign.clear();
    setUrl("");
  };
  const handleGenerate = () => {
    setUrl(sign.getTrimmedCanvas().toDataURL("image/png"));
  };
  return (
    <>
      <Header />
      <div id="team-leader">
        <div id="team-leader-form">
          <h2 id="tl-name">Lakmal Jayawardhana </h2>
          <h2 id="tl-id">ID : 4759862</h2>
          <h3>Team Leader</h3>
          <p>Mark Your Attendance</p>

          <Input
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
            defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
            style={{
              backgroundColor: "#EEEEEE",
              margin: "12px 0",
              width: "100%",
            }}
            placeholder="Time"
          />
          <div id="signature" onWheel={handleWheel}>
            <div id="signature-div">
              <SignatureCanvas
                canvasProps={{ className: "sigCanvas" }}
                ref={(data) => setSign(data)}
              />
            </div>
            <Button id="signature-clear-btn" ghost onClick={handleClear}>
              {" "}
              Clear
            </Button>
          </div>

          <Button id="team-leader-btn" type="primary" onClick={handleGenerate}>
            {" "}
            Next
          </Button>
        </div>
      </div>
      {/* <img src={url} /> */}
      <NavBar />
    </>
  );
};

export default Team_leader;
