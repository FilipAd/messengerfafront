import React,{useState} from "react";
import './App.css';
import Login from './forms/Login';
import Home from './components/Home';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import {makeStyles} from "@material-ui/core/styles";
import { Grid } from '@material-ui/core';
import { BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Signup from "./forms/Signup";
import EmailTokenInput from "./forms/EmailTokenInput";
import CertificateUploadForm from "./forms/CertificateUploadForm";
import NotFoundPage from "./components/NotFoundPage";
import { simetricKeyS } from "./URLs";
import cryptoJs from "crypto-js";


/*function App() 
{

  const useStyle = makeStyles((theme) =>({
    app:
    {
      display:"grid",
      placeItems:"center",
      backgroundColor:"#ffdfc9",
      height:"100vh",
    },
    app_body:
    {
        display:"flex",
        backgroundColor:"white",
        height:"90vh",
        width:"90vw",
        boxShadow: "-1px 4px 20px -6px rgba(0,0,0,0.2)",
    },
    }));
    const classes=useStyle();
  return (<div className={classes.app}>
    <div className={classes.app_body}>
    <Sidebar/>
    <Chat/>
    

    </div>
  
  </div>
  
);

  <Route exect path={`/home/`} element={<Home/>} />
}*/
function App() 
{
  function decryptEmailToken(eMailToken)
  {
    if(eMailToken!==null)
    {
      var bytes = cryptoJs.AES.decrypt(eMailToken,simetricKeyS);
      return (bytes.toString(cryptoJs.enc.Utf8));
    }
    else
    return null;
  }
  console.log("rezultat funckije"+decryptEmailToken(sessionStorage.getItem("emailTokenStored")));
  let [emailToken,setEmailToken]=useState(decryptEmailToken(sessionStorage.getItem("emailTokenStored")));

  
  return (
    <Router>
      <Routes>
      <Route exact path='/' element={<Login/>} />
      <Route exact path='/signup' element={<Signup/>}/>    
      <Route exact path='/home/null' element={<NotFoundPage/>}/>
      <Route exect path={`/home/${emailToken}`} element={<Home/>} />
      <Route exact path='/login' element={<Login/>} />
      <Route exact path='/certificate' element={<CertificateUploadForm/>} />
      <Route exact path='/emailtoken' element={<EmailTokenInput setEmailToken={setEmailToken}/>} />
      <Route path="*" element={<NotFoundPage/>}/>
    </Routes>
    </Router>
  
);
}


export default App;
