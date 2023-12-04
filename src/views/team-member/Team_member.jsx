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
import { markTeamMember } from "../../services/teamMember";
import { MEMBER } from "../../constant/constants";

const Team_member = () => {
  const [tMemberID, setTMemberID] = useState("");
  const [tMemberName, setTMemberName] = useState("");
  const [tMemberRadio, setTMemberRadio] = useState("unchecked");
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
  };
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setTMemberRadio(e.target.value);
  };

  const handleClear = () => {
    sign.clear();
    setSignUrl("");
  };

  const checkTeamMemberInfo = () => {
    console.log(tMemberRadio);
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

  const markTeamMemberAttendance = async () => {
    // teamleader get all ekak gahala eyage data
    // dispatch(actionLoaderCreator.loaderHandler(true));
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
      // sign: sign,
      signurl: signurl,
      execute_date: await leaderObj.execute_date,
      tool_box_no : await leaderObj.tool_box_no,
      type: MEMBER,
    };

    console.log("Team Member Details", data);
    markTeamMember(data)
      .then((response) => {
        console.log(response, "teamMember");

        if (response.data) {
          // contract_type: "SUBCON";
          // created_at: "2023-12-04T10:54:57.758Z";
          // execute_date: "2023-12-04T12:08:00.000Z";
          // execute_time: "12:08";
          // id: "a1a6e41c-b4e4-44ef-815d-474b947f5a04";
          // leader_emp_id: "1000";
          // location: null;
          // member_emp_id: "gf34g34";
          // member_name: "kukku manika";
          // signature: "signature";
          // tool_box_no: null;
          // topic: null;
          // type: "MEMBER";
          // updated_at: "2023-12-04T10:54:57.758Z";

          //**RESPONSE. DATA set value to name in team member list */
          customToastMsg("Successfully Mark Your Attendance !", 1);
          navigate("/TeamMemberList");
        }
      })
      .catch((c) => {
        console.log(c, "error");
        customToastMsg("Unsuccessful !", 0);
      })
      .finally((f) => {
        // dispatch(actionLoaderCreator.loaderHandler(false));
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

          <div
            id="signature-member"
            onWheel={handleWheel}
            onClick={handleGenerate}
          >
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
      {/* //<img src={signurl} /> */}
    </>
  );
};

export default Team_member;
