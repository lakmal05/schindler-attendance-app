import React, { useRef, useEffect, useState } from 'react';
import SignaturePad from 'signature_pad';

const SignaturePadModal = ({ signatureUrlFromDatabase }) => {
  const canvasRef = useRef(null);
  const signaturePadRef = useRef(null);
  const [initialSignature, setInitialSignature] = useState('');

  useEffect(() => {
    const canvas = canvasRef.current;
    const signaturePad = new SignaturePad(canvas, {
      minWidth: 5,
      maxWidth: 10,
      penColor: 'rgb(66, 133, 244)'
    });

    // Save the SignaturePad instance for future use
    signaturePadRef.current = signaturePad;

    // Set the initial signature if it exists
    if (initialSignature) {
      signaturePad.fromDataURL(initialSignature);
    }

    // Cleanup on component unmount
    return () => {
      signaturePad.off(); // Unbind event handlers
    };
  }, [initialSignature]);

  const handleClear = () => {
    if (signaturePadRef.current) {
      signaturePadRef.current.clear();
    }
  };

  const handleSave = () => {
    if (signaturePadRef.current) {
      const signatureDataURL = signaturePadRef.current.toDataURL();
      console.log(signatureDataURL);
      // You can now use the signatureDataURL as needed, e.g., send it to the server.
    }
  };

  // Set the initial signature value from your state or database response
  useEffect(() => {
    if (signatureUrlFromDatabase) {
      setInitialSignature(signatureUrlFromDatabase);
    }
  }, [signatureUrlFromDatabase]);

  return (
    <div>
      <canvas ref={canvasRef} width={400} height={200}></canvas>
      <button onClick={handleClear}>Clear</button>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default SignaturePadModal;