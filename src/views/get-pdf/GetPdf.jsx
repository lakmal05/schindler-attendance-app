// import React from "react";
import { Button } from "antd";
// import { useState } from "react";
import { RiLoader2Line } from "react-icons/ri";
import { Document, Text, Page, PDFViewer } from "@react-pdf/renderer";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// npm install react-to-print (please install)
import { useReactToPrint } from "react-to-print";
import { Table } from "antd";
import { getAllMarkedAttendanceList } from "../../services/teamMemberList";
import logo from "../../assets/logo.png";
import "./GetPdf.scss";
import { useNavigate } from "react-router-dom";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";


const GetPdf = () => {
  const [loader, setLoader] = useState(false);
  const [leaderObj, setLeaderObj] = useState({});
  const [leaderAttendance, setLeaderAttendance] = useState({});
  const [attendanceArray, setAttendanceArray] = useState([]);
  const conponentPDF = useRef();

  const navigate = useNavigate();
  useEffect(() => {
    getAllAttendance();
  }, []);

  useEffect(() => {
    findLeader();
  }, [attendanceArray]);

  const getAllAttendance = async () => {
    const local_storage_leader_obj = await localStorage.getItem(
      "leader_attendance_details"
    );
    const leaderObj = JSON.parse(local_storage_leader_obj);
    setLeaderObj(leaderObj);
    const data = {
      leader_emp_id: leaderObj.leader_emp_id,
      tool_box_no: leaderObj.tool_box_no,
      execute_date: leaderObj.execute_date,
    };
    await getAllMarkedAttendanceList(data).then((response) => {
      if (response.data) {
        console.log(response.data, "response of GenaratePDF");
        setAttendanceArray(response.data);
      }
    });
  };

  const findLeader = () => {
    const leaderIndex = attendanceArray.findIndex(
      (item) => item.type === "LEADER"
    );

    if (leaderIndex !== -1) {
      const leader = attendanceArray[leaderIndex];
      setLeaderAttendance(leader);

      // Remove leader from attendanceArray and update the state
      const updatedArray = attendanceArray.filter(
        (_, index) => index !== leaderIndex
      );
      setAttendanceArray(updatedArray);
    }
  };

  const capitalizeEachWord = (str) => {
    return str?.replace(/\b\w/g, function (char) {
      return char.toUpperCase();
    });
  };

  const clickGeneratePDF = async () => {
    await localStorage.removeItem("leader_attendance_details");
    navigate("/Dashboard");
    generatePDF();
  };

  
  // const clickGeneratePDF = () => {
  //   setLoader(true);
  
  //   html2canvas(conponentPDF.current).then((canvas) => {
  //     const imgData = canvas.toDataURL("image/png");
  
  //     const pdf = new jsPDF({
  //       orientation: "portrait",
  //       unit: "mm",
  //       format: "a4",
  //     });
  
  //     const imgWidth = 210;
  //     const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
  //     pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
  //     pdf.save("userdata.pdf");
  
  //     setLoader(false);

  //     localStorage.removeItem("leader_attendance_details");
  //     generatePDF();
  //   });
  // };
  

  const generatePDF = useReactToPrint({
    content: () => conponentPDF.current,
    documentTitle: "Userdata",
  });
  // const generatePDF = useReactToPrint({
  //   content: () => {
  //     navigate("/Dashboard");
  //     // Return the component you want to print
  //     return conponentPDF.current;
  //   },
  //   documentTitle: "Userdata",
  // });

  const fixedColumns = [
    {
      title: "No",
      dataIndex: "key",
      rowScope: "row",
      fixed: true,
    },
    {
      title: "Name",
      dataIndex: "member_name",
      fixed: true,
    },
    {
      title: "EMP/SUBCON",
      dataIndex: "contract_type",
      fixed: true,
    },
    {
      title: "ID No",
      dataIndex: "member_emp_id",
      fixed: true,
    },
    {
      title: "Signature",
      dataIndex: "signature",
      render: (text, record) => (
        <img
          src={record.signature}
          alt="Image"
          style={{ width: "100px", height: "auto" }}
        />
      ),

      fixed: true,
    },
  ];
  let fixedData = [];
  fixedData = attendanceArray.map((item, index) => ({
    key: (index + 1).toString(),
    member_name: item.member_name,
    contract_type: item.contract_type,
    member_emp_id: item.member_emp_id,
    signature: item.signature,
  }));
  console.log(fixedData, "fixed data array");

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();

  // Format the date as YYYY-MM-DD
  const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  }`;

  const monthIndex = currentDate.getMonth();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = months[monthIndex];

  // const execution_date = `${month < 10 ? "0" + month : monthName}-${year}`;
  const sign = { logo: logo };

  return (
    <>
      <div id="get-pdf">
        <div id="get-pdf-cnt">
          <h2 id="tl-name">Employee Details</h2>
          <p>Download Employee Attendance Detail Sheet</p>

          <div ref={conponentPDF} id="pdf-cnt-view">
            <div
              style={{
                marginLeft: 40,
                marginRight: 40,
                marginBottom: 40,
                position: "relative",
              }}
            >
              <img
                style={{
                  height: "auto",
                  width: 100,
                  position: "absolute",
                  right: 0,
                  top: 20,
                }}
                src={logo}
                alt="logo"
              />

              <h3
                style={{
                  fontFamily: "Poppins",
                  fontWeight: 400,
                  fontSize: 15,
                  position: "relative",
                  float: "left",
                  top: 120,
                }}
              >
                {leaderAttendance.execute_date?.split("T")[0]}
              </h3>
              <h3
                style={{
                  fontFamily: "Poppins",
                  fontWeight: 400,
                  fontSize: 15,
                  position: "relative",
                  float: "right",
                  top: 120,
                }}
              >
                {leaderAttendance?.tool_box_no}
              </h3>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  position: "relative",
                  top: 120,
                }}
              >
                <h3
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: 400,
                    fontSize: 18,
                    margin: 0,
                  }}
                >
                  Topic :{" "}
                  <span
                    style={{
                      fontWeight: 600,
                      textTransform: "uppercase",
                    }}
                  >
                    {leaderAttendance?.topic}
                  </span>
                </h3>
              </div>

              <div style={{ position: "relative", top: 130 }}>
                <Table
                  style={{ width: "100%", zIndex: 6 }}
                  id="pdf-data-table"
                  columns={fixedColumns}
                  dataSource={fixedData}
                  pagination={false}
                  bordered
                />

                <h3
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: 400,
                    fontSize: 15,
                    position: "relative",
                    float: "left",
                    top: 30,
                  }}
                >
                  Name of PM/AM/GL/TL :{" "}
                  {capitalizeEachWord(leaderAttendance?.member_name)}
                </h3>

                <h3
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: 400,
                    fontSize: 15,
                    position: "relative",
                    float: "right",
                    top: 30,
                  }}
                >
                  Date : {formattedDate}
                </h3>

                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "start",
                    position: "relative",
                    top: 30,
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: 400,
                      fontSize: 15,
                      margin: 0,
                    }}
                  >
                    Signature :{" "}
                    <img
                      style={{
                        height: "auto",
                        width: 150,
                      }}
                      src={leaderAttendance.signature}
                      alt="sign"
                    />
                  </h3>
                </div>

                <h3
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: 400,
                    fontSize: 12,
                    position: "fixed",
                    left: 40,
                    bottom: 30,
                    zIndex: 0,
                  }}
                >
                  FQE - Safety and Health
                </h3>

                <h3
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: 400,
                    fontSize: 12,
                    position: "fixed",
                    right: 40,
                    bottom: 30,
                    zIndex: 0,
                  }}
                >
                  Trade Promoters Limited
                </h3>
              </div>
              {/* <div style={{backgroundColor : "red",position: "fixed",
                    right: 40,
                    bottom: 30,
                    width : "100%",
                    height:20}}></div> */}
            </div>
          </div>

          <Button
            id="genarate-pdf-btn"
            type="primary"
            onClick={clickGeneratePDF}
          >
            {" "}
            {!loader ? (
              "Download"
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

export default GetPdf;
