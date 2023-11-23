import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { Input } from "antd";
import { Radio } from "antd";
import SignatureCanvas from "react-signature-canvas";
import { HiOutlineIdentification } from "react-icons/hi2";
import { FaRegUserCircle } from "react-icons/fa";
import { RiLoader2Line } from "react-icons/ri";
import { customToastMsg } from "../../utility/Utils";

import "./Team_member.scss";

const Team_member = () => {
  const [tMemberID, setTMemberID] = useState("");
  const [tMemberName, setTMemberName] = useState("");
  const [tMemberRadio, setTMemberRadio] = useState(1);
  const [sign, setSign] = useState();
  const [signurl, setSignUrl] = useState();

  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const handleWheel = (e) => {
    e.preventDefault(); // Prevent default scrolling behavior
  };

  const handleGenerate = () => {
    const generatedUrl = sign.getTrimmedCanvas().toDataURL("image/png");
    setSignUrl(generatedUrl);
    // console.log(signurl, "usestate url");
    // console.log(generatedUrl, "generate url");
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
    navigate("/TeamMemberList");
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
     // dispatch(actionLoaderCreator.loaderHandler(true));
     setLoader(true);

     let data = {
       tMemberID: tMemberID,
       tMemberName: tMemberName,
       tMemberRadio: tMemberRadio,
       sign: sign,
       signurl: signurl,
     };
 
     console.log("Team Member Details", data);
    //  markTeamMemberAttendance(data)
    //    .then((res) => {
    //      customToastMsg("Successfully Mark Your Attendance !", 1);
    //       //window.location.href = "/TeamMemberList";
    //      navigate("/TeamMemberList");
    //    })
    //    .catch((c) => {
    //      customToastMsg("Unsuccessful !", 0);
    //    }).finally(f => {
    //      // dispatch(actionLoaderCreator.loaderHandler(false));
    //      setLoader(false);
    //    });
  };

  return (
    <>
      <div id="team-member">
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
            <Radio value={"sub"}>Sub</Radio>
            <Radio value={"no-sub"}>No Sub</Radio>
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
      <img src={signurl} />
    </>
  );
};

export default Team_member;
