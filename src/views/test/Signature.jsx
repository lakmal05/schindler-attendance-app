import React, { useRef, useState } from 'react';
import './Signature.scss';
import SignaturePad from '../../components/SignaturePad';

// function SignaturePad() {
//   const canvasRef = useRef(null);
//   let isDrawing = false;
//   let prevPos = { x: 0, y: 0 };
//   const [signatureData, setSignatureData] = useState(null);

//   const getTouchPos = (e) => {
//     const rect = canvasRef.current.getBoundingClientRect();
//     return {
//       x: e.touches[0].clientX - rect.left,
//       y: e.touches[0].clientY - rect.top,
//     };
//   };

//   const startDrawing = (e) => {
//     isDrawing = true;
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');
//     prevPos = getTouchPos(e);
//     ctx.beginPath();
//     ctx.moveTo(prevPos.x, prevPos.y);
//   };

//   const draw = (e) => {
//     if (isDrawing) {
//       const canvas = canvasRef.current;
//       const ctx = canvas.getContext('2d');
//       const currentPos = getTouchPos(e);
//       ctx.lineWidth = 2;
//       ctx.strokeStyle = 'black';
//       ctx.lineTo(currentPos.x, currentPos.y);
//       ctx.stroke();
//       prevPos = currentPos;
//     }
//   };

//   const endDrawing = () => {
//     isDrawing = false;
//   };

//   const clearCanvas = () => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     setSignatureData(null); // Clear signature data
//   };

//   const handleSubmit = () => {
//     const canvas = canvasRef.current;
//     const signatureDataURL = canvas.toDataURL(); // Get data URL of the signature
//     setSignatureData(signatureDataURL); // Save signature data in state
//     console.log('Signature Data:', signatureDataURL);
//   };

//   return (
//     <div>
//       <canvas
//         ref={canvasRef}
//         width={400}
//         height={200}
//         className="signatureCanvas"
//         onMouseDown={startDrawing}
//         onMouseMove={draw}
//         onMouseUp={endDrawing}
//         onMouseOut={endDrawing}
//         onTouchStart={startDrawing}
//         onTouchMove={draw}
//         onTouchEnd={endDrawing}
//       ></canvas>
//       <div>
//         <button onClick={clearCanvas}>Clear</button>
//         <button onClick={handleSubmit}>Submit</button>
//       </div>
//       {signatureData && <img src={signatureData} alt="Signature" />}
//     </div>
//   );
// }

function App() {
  return (
    <div className="App">
<SignaturePad/>
    </div>
  );
}

export default App;
