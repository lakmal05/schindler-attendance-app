import React, { useRef, useEffect, useState } from 'react';
import SignaturePad from 'signature_pad';

const SignaturePadModal = () => {
  const canvasRef = useRef(null);
  const signaturePadRef = useRef(null);
  const [sign , setSign] = useState(null)

  useEffect(() => {
    const canvas = canvasRef.current;
    const signaturePad = new SignaturePad(canvas, {
      minWidth: 5,
      maxWidth: 10,
      penColor: 'rgb(66, 133, 244)',
      backgroundColor:"green"
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
    }
  };

  const handleSave = () => {
    if (signaturePadRef.current) {
      const signatureDataURL = signaturePadRef.current.toDataURL();
      console.log(signatureDataURL);
      setSign(signatureDataURL);
      // You can now use the signatureDataURL as needed, e.g., send it to the server.
    }
  };

  return (
    <div>
      <canvas ref={canvasRef} width={400} height={200}></canvas>
      <button onClick={handleClear}>Clear</button>
      <button onClick={handleSave}>Save</button>
      <img src={sign}></img>
    </div>
  );
};

export default SignaturePadModal;