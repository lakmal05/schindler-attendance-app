import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import { IoCaretDown } from "react-icons/io5";
import "./TeamMemberCard.scss";
import { Button, Drawer, Radio, Space, Input } from "antd";
import SignatureCanvas from "react-signature-canvas";
import { HiOutlineIdentification } from "react-icons/hi2";
import { FaRegUserCircle } from "react-icons/fa";
import { ScrollToTop } from "../utility/CommonFun";
import { RiLoader2Line } from "react-icons/ri";
import { customToastMsg } from "../utility/Utils";
import { markTeamMember } from "../services/teamMember";
import "./TeamMemberCard.scss"

const TeamMemberCard = () => {
  const [open, setOpen] = useState(false);

  const [tMemberID, setTMemberID] = useState("");
  const [tMemberName, setTMemberName] = useState("");
  const [tMemberRadio, setTMemberRadio] = useState(1);
  const [sign, setSign] = useState();
  const [signurl, setSignUrl] = useState();

  const [loader, setLoader] = useState(false);

  
  const navigate = useNavigate();


  // let online = "";
  // useEffect(() => {
  //   teamMember == "TeamMember" ? (
  //    online = "red"
  //   ) : (
  //     online = "green"
  //   );
  // });

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
    const generatedUrl = sign.getTrimmedCanvas().toDataURL("image/png");
    setSignUrl(generatedUrl);
  }
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setTMemberRadio(e.target.value);
  };

  const handleClear = () => {
    sign.clear();
    setSignUrl("");
  };

  const checkTeamMemberInfo = () => {
    // navigate("/TeamMemberList");
    console.log(tMemberID, tMemberName, tMemberRadio, sign, signurl);
    tMemberID.trim() === ""
      ? customToastMsg("Please Enter your Member ID!", 0)
      : tMemberName.trim() === ""
      ? customToastMsg("Please Enter your Name!", 0)
      : tMemberRadio.trim() === ""
      ? customToastMsg("Please Select one option!", 0)
      : // : sign.trim() === ""
        // ? customToastMsg("Please Enter your Signature!", 0)
        markTeamMemberAttendance();
  };

  const markTeamMemberAttendance = () => {
     setLoader(true);

     let credentials = {
       tMemberID: tMemberID,
       tMemberName: tMemberName,
       tMemberRadio: tMemberRadio,
       sign: sign,
       signurl: signurl,
     };
 
     console.log("Team Member Details", credentials);
     markTeamMember(credentials)
       .then((response) => {
        console.log(response,"teamMember");
         customToastMsg("Successfully Mark Your Attendance !", 1);
          onChange();
         navigate("/TeamMemberList");
       })
       .catch((c) => {
        console.log(c , "error");
         customToastMsg("Unsuccessful !", 0);
       }).finally(f => {
         setLoader(false);
       });
  };


  // const teamMember = "Team Member";

  return (
    <>
      <ScrollToTop />
      <div id="team-member-div">
        <h4>{tMemberName ? tMemberName : "Team Member"}</h4>
        <IoCaretDown id="down-arrow" onClick={handleOnClickArrow} />

       { signurl == undefined ? <GoDotFill id="online-offline" style={{ color: "red" ,margin: '0 20px 0 0',fontSize: "20px"}} />
       :
       <GoDotFill id="online-offline" style={{ color: "green" ,margin: '0 20px 0 0',fontSize: "20px"}} />
       }
        
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
            value={tMemberRadio}
          >
            <Radio value={"employee"}>Employee</Radio>
            <Radio value={"sub"}>Sub</Radio>
          </Radio.Group>

          <div id="signature-member" onWheel={handleWheel} onClick={handleGenerate}>
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
          </div>
        </div>
        {/* <img src={url} /> */}
      </Drawer>
    </>
  );
};

export default TeamMemberCard;
