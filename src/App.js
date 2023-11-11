import logo from './logo.svg';
import './App.css';
import Router from './router/Router';
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
              <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
          </head>


          <main>
              <Router/>
          </main>
      
    </>
  );
}

export default App;