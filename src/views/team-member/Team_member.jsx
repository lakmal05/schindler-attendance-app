import React, { useState } from "react";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import { Button } from "antd";
import { Input } from "antd";
import { Radio } from "antd";
import SignatureCanvas from "react-signature-canvas";
import { HiOutlineIdentification } from "react-icons/hi2";
import { FaRegUserCircle } from "react-icons/fa";

import "./Team_member.scss";

const Team_member = () => {
  const [sign, setSign] = useState();
  const [url, setUrl] = useState();
  const [tMemberName, setTMemberName] = useState("");

  const handleWheel = (e) => {
    e.preventDefault(); // Prevent default scrolling behavior
  };

  const [value, setValue] = useState(1);
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
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
      {/* <Header /> */}
      <div id="team-member">
        <div id="team-member-form">
          <h2 id="tm-name">{tMemberName ? tMemberName : "Team Member"}</h2>
          <h3>Team Member</h3>
          <p>Mark Your Attendance</p>
          <Input
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
            value={value}
          >
            <Radio value={1}>Sub</Radio>
            <Radio value={2}>No Sub</Radio>
          </Radio.Group>

          <div id="signature-member" onWheel={handleWheel}>
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

          <Button id="team-member-btn" type="primary" onClick={handleGenerate}>
            {" "}
            Done
          </Button>
        </div>
      </div>
      {/* <img src={url} /> */}
      {/* <NavBar /> */}
    </>
  );
};

export default Team_member;
