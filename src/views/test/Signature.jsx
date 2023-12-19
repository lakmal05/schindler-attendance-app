import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import "./Signature.scss"; 

const Signature = () => {
  const signatureCanvasRef = useRef();
  const [signatureData, setSignatureData] = useState(null);

  const saveSignature = () => {
    if (signatureCanvasRef.current.isEmpty()) {
      alert("Please provide a signature before saving.");
      return;
    }

    const dataURL = signatureCanvasRef.current.toDataURL(); 
    setSignatureData(dataURL);
    console.log(dataURL,"=============");
  };

  const clearSignature = () => {
    signatureCanvasRef.current.clear();
    setSignatureData(null);
  };

  return (
    <div className="signature-container">
      <div className="signature-header">Sign Below</div>
      <SignatureCanvas
        ref={signatureCanvasRef}
        penColor="black"
        canvasProps={{ className: "signature-canvas" }}
      />
      <button className="save-button" onClick={saveSignature}>
        Save Signature
      </button>
      <button className="clear-button" onClick={clearSignature}>
        Clear Signature
      </button>
      {/* {signatureData && (
        <div className="saved-signature">
          <p>Saved Signature:</p>
          <img src={signatureData} alt="Saved Signature" />
        </div>
      )} */}
    </div>
  );
};

export default Signature;
