import logo from './logo.svg';
import './App.css';
import Router from './router/Router';
import RouterHandler from './router/Router';
import Team_Member_List from './views/team-member-list/Team_Member_List';
import TeamMemberDrower from './components/TeamMemberDrower';
import GetPdf from './views/get-pdf/GetPdf';

function App() {
  return (
    <>
          <head>
              <title>SCHINDLER</title>
              <meta name="description" content="SCHINDLER"/>
              <meta name="viewport" content="width=device-width, initial-scale=1 , user-scalable=no"/>
              <link rel="icon" href="/favicon.ico"/>

              <link rel="preconnect" href="https://fonts.googleapis.com"/>
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
              <link href="https://fonts.googleapis.com/css2?family=Passion+One&family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
          </head>


          <main>
            {/* <RouterHandler/> */}
            {/* <Team_Member_List/> */}
            {/* <TeamMemberDrower/> */}
            <GetPdf/>
          </main>
      
    </>
  );
}

export default App;
