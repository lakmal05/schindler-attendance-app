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
import logo from "../../assets/logo.png";
import "./GetPdf.scss";

const GetPdf = () => {
  const [loader, setLoader] = useState(false);

  const conponentPDF = useRef();
  const [userData, setUserdata] = useState([]);

  useEffect(() => {
    const getAllEmployeeAttendance = async () => {
      //  axios.get("http://localhost:7000/api/registeruserdata")
      //  .then(res=>setUserdata(res.data) )
      //  .catch(error=>console.log(error));
      // getAllTeamMembers().then((response)=>{
      //     // object array ekaka enne methenta
      //     // fixedData = ...response.data thiyna array ekata me ena data ojbect array eka set krnwa
      // })
    };
    getAllEmployeeAttendance();
  }, []);

  const generatePDF = useReactToPrint({
    content: () => conponentPDF.current,
    documentTitle: "Userdata",
    // onAfterPrint: () => alert("Data saved in PDF"),
  });

  const fixedColumns = [
    {
      title: "No",
      dataIndex: "key",
      rowScope: "row",
      fixed: true,
    },
    {
      title: "Name",
      dataIndex: "name",
      fixed: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      fixed: true,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      fixed: true,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      fixed: true,
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      fixed: true,
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      fixed: true,
    },
  ];
  const fixedData = [];
  fixedData.push(
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
      action: "active",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
      action: "active",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
      action: "active",
    },
    {
      key: "4",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
      action: "active",
    },
    {
      key: "5",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
      action: "active",
    },
    {
      key: "6",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
      action: "active",
    },
    {
      key: "7",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
      action: "active",
    },{
      key: "8",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
      action: "active",
    },
    {
      key: "9",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
      action: "active",
    },
    {
      key: "10",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
      action: "active",
    },
    {
      key: "11",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
      action: "active",
    },
    {
      key: "12",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
      action: "active",
    },
    {
      key: "13",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
      action: "active",
    },
    {
      key: "14",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
      action: "active",
    },{
      key: "15",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
      action: "active",
    },
    {
      key: "16",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
      action: "active",
    },
    {
      key: "17",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
      action: "active",
    },
    {
      key: "18",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
      action: "active",
    },
    {
      key: "18",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
      action: "active",
    },
    {
      key: "20",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
      action: "active",
    },
    {
      key: "21",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
      action: "active",
    },{
      key: "22",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
      action: "active",
    },
    {
      key: "23",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
      action: "active",
    },
    {
      key: "24",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
      action: "active",
    },
    {
      key: "25",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
      action: "active",
    },
    {
      key: "26",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
      action: "active",
    },
    {
      key: "27",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
      action: "active",
    },
    {
      key: "28",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
      action: "active",
    }, {
      key: "29",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
      action: "active",
    },
    {
      key: "30",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
      action: "active",
    }
  );

  const teamLeader = "active";
  const dateOfPDF = "20th of January 2023";
  const sign = { logo: logo };

  return (
    <>
      <div id="get-pdf">
        <div id="get-pdf-cnt">
          <h2 id="tl-name">Employee Details</h2>
          <p>Download Employee Attendance Detail Sheet</p>

          <div ref={conponentPDF} id="pdf-cnt-view">
            <div
              style={{ marginLeft: 40, marginRight: 40, marginBottom:40, position: "relative" }}
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
                January - 2023
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
                TPL-SCH-TBT - 002
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
                    Mandatory safe sections
                  </span>
                </h3>
              </div>

              <div style={{ position: "relative", top: 130 }}>
                <Table
                  style={{ width: "100%",zIndex:6 }}
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
                  Name of PM/AM/GL/TL : {teamLeader}
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
                  Date : {dateOfPDF}
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
                    margin:0
                  }}
                >
                  Signature :{" "}
                  <img
                    style={{
                      height: "auto",
                      width: 50,
                    }}
                    src={sign.logo}
                    alt="logo"
                  />
                </h3>
                </div>

                <h3
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: 400,
                    fontSize: 12,
                    position: "fixed",
                    left:40,
                    bottom: 30,
                    zIndex:0
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
                    zIndex :0
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

          <Button id="genarate-pdf-btn" type="primary" onClick={generatePDF}>
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
