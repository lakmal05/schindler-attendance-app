import React from "react";
import { Button } from "antd";
import { useState } from "react";
import { RiLoader2Line } from "react-icons/ri";
import { Document, Text, Page ,PDFViewer} from "@react-pdf/renderer";
import "./GetPdf.scss";

const GetPdf = () => {
  const [loader, setLoader] = useState(false);

  return (
    <>
      <div id="get-pdf">
        <div id="get-pdf-cnt">
          <h2 id="tl-name">Employee Details</h2>
          <p>Download Employee Attendance Detail Sheet</p>

          <PDFViewer id="pdf-viewer">
            <Document>
              <Page>
                <Text>Hello There</Text>
                <Text>hansika There</Text><Text>lakmal There</Text><Text>lakmal jayawardhana There</Text>
              </Page>
            </Document>
          </PDFViewer>

          <Button
            id="genarate-pdf-btn"
            type="primary"
            // onClick={}
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
