import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { Input } from "antd";
import { Radio } from "antd";
import { HiOutlineIdentification } from "react-icons/hi2";
import { FaRegUserCircle } from "react-icons/fa";
import { RiLoader2Line } from "react-icons/ri";
import { customToastMsg } from "../../utility/Utils";
import "./Team_member.scss";
import { markTeamMember } from "../../services/teamMember";
import { MEMBER } from "../../constant/constants";
import SignaturePad from "signature_pad";

const Team_member = () => {
  const [tMemberID, setTMemberID] = useState("");
  const [tMemberName, setTMemberName] = useState("");
  const [tMemberRadio, setTMemberRadio] = useState("unchecked");
  const [signurl, setSignUrl] = useState(null);

  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const canvasRef = useRef(null);
  const signaturePadRef = useRef(null);
  const [disabledSignaturePad, setDisabledSignaturePad] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const signaturePad = new SignaturePad(canvas, {
      minWidth: 2,
      maxWidth: 2,
      throttle: 16,
      minDistance: 5,
      velocityFilterWeight: 0.2,
    });

    // Save the SignaturePad instance for future use
    signaturePadRef.current = signaturePad;

    // Cleanup on component unmount
    return () => {
      signaturePad.off(); // Unbind event handlers
    };
  }, []);

  const handleClear = () => {
    if (signaturePadRef.current) {
      signaturePadRef.current.clear();
      setSignUrl(null);
      setDisabledSignaturePad(!disabledSignaturePad);
    }
  };

  useEffect(() => {
    console.log(signurl, "+++++++++++++++++");
  }, [signurl]);

  const handleSave = () => {
    if (signaturePadRef.current) {
      const signatureDataURL = signaturePadRef.current.toDataURL();
      console.log(signatureDataURL);
      setSignUrl(signatureDataURL);
      setDisabledSignaturePad(!disabledSignaturePad);
      customToastMsg("Successfully Enterd Signature!", 1);
    }
  };

  const onChange = (e) => {
    setTMemberRadio(e.target.value);
  };

  const checkTeamMemberInfo = () => {
    tMemberID.trim() === ""
      ? customToastMsg("Please Enter your Member ID!", 0)
      : tMemberName.trim() === ""
      ? customToastMsg("Please Enter your Name!", 0)
      : tMemberRadio === "unchecked"
      ? customToastMsg("Please Select one option!", 0)
      : markTeamMemberAttendance();
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
      signature: signurl,
      execute_date: await leaderObj.execute_date,
      tool_box_no: await leaderObj.tool_box_no,
      type: MEMBER,
    };

    console.log("Team Member Details", data);
    markTeamMember(data)
      .then((response) => {
        if (response.data) {
          customToastMsg("Successfully Mark Your Attendance !", 1);
          navigate("/TeamMemberList");
        }
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
            <Radio value={"EMP"}>Employee</Radio>
            <Radio value={"SUBCON"}>Sub</Radio>
          </Radio.Group>

          <div id="signature-member">
            <canvas
              id="signature-div"
              width={600}
              height={200}
              ref={canvasRef}
            ></canvas>

            <div className="button-div">
              <Button id="signature-save-btn" ghost onClick={handleSave}>
                {" "}
                Save Signature
              </Button>
              <Button id="signature-clear-btn" ghost onClick={handleClear}>
                {" "}
                Clear
              </Button>
            </div>
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
    </>
  );
};

export default Team_member;
