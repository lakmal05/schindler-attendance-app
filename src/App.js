import "./App.css";
import RouterHandler from "./router/Router";
import Signature from "./views/test/Signature";

function App() {
  return (
    <>
      <head>
        <title>SCHINDLER</title>
        <meta name="description" content="SCHINDLER" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1 , user-scalable=no"
        />
        <link rel="icon" href="/favicon.ico" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Passion+One&family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>

      <main>
        <RouterHandler/> 
        {/* <Team_Member_List/> */}
        {/* <TeamMemberDrower/> */}
        {/* <GetPdf/> */}
        {/* <PdfTest/> */}
        {/* <Signature></Signature>  */}
      </main>
    </>
  );
}

export default App;
