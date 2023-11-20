import React, { useState } from "react";
import { Button, Drawer, Radio, Space, Input } from "antd";
import SignatureCanvas from "react-signature-canvas";
import { HiOutlineIdentification } from "react-icons/hi2";
import { FaRegUserCircle } from "react-icons/fa";
import "../components/TeamMemberDrover.scss";
import Header from "./Header";

function TeamMemberDrower() {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("top");

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

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
    onClose();
  };

  return (
    <>
      <Header />
      <Space>
        <Button type="primary" onClick={showDrawer} style={{ margin: "6rem" }}>
          Open
        </Button>
      </Space>
      <Drawer
        placement={placement}
        width={"100%"}
        height={"100%"}
        onClose={onClose}
        open={open}
        // extra={
        //   <Space>
        //     <Button onClick={onClose}>Cancel</Button>
        //     <Button type="primary" onClick={onClose}>
        //       OK
        //     </Button>
        //   </Space>
        // }
      >
        <div id="team-member-drower">
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

            <Button
              id="team-member-btn"
              type="primary"
              onClick={handleGenerate}
            >
              {" "}
              Done
            </Button>
          </div>
        </div>
        {/* <img src={url} /> */}
      </Drawer>
    </>
  );
}
export default TeamMemberDrower;
