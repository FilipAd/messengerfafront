import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import {makeStyles,fade} from "@material-ui/core/styles";
import {Button,FormLabel,FormGroup} from "@material-ui/core"
//import "./Universal.css";
import axios from "axios";
import {Link,Navigate} from "react-router-dom";
import Background from "../background.jpg";
import { loginUrl,emailSendTokenUrl,emailTokenFrontEnd, simetricKeyS} from "../URLs";
import { certificateFrontEnd } from "../URLs";
import cryptoJs from "crypto-js";


export default function Login(props) {

  const useStyle = makeStyles((theme) =>({

   

     
   
    root:
    {
      width:"100%",
      height:"100vh",
      textAlign:"center",
      backgroundPosition:"center",
      backgroundRepeat:"no-repeat",
      backgroundSize:"cover",
      background:"#f7dbcc",
      overflowX: "scroll",
      backgroundImage:`URL(${Background})`,
    },
    button:
    {
      width:"320px",
      marginTop:"50px",
      display:"relative",
      background:"#e0e047",
      border:"2px solid #ea668e",
      color:"black",
      "&:hover":{
          background:fade("#e33269",0.75), 
          border:"2px solid yellow",
          color:"white",
      }
    },
    label:
    {
      fontSize:"20px",
      fontFamily:"Lucida Handwriting",
      padding: "10px",
      alignSelf:"center",
      color:"white",
      fontWeight:"bold",
      textShadow: "2px 0 0 black, -2px 0 0 black, 0 2px 0 black, 0 -2px 0 black, 1px 1px black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black",
    },

    title:
    {
      textAlign:"center",
      fontSize:"30px",
      fontFamily:"Lucida Handwriting",
      textShadow: "2px 0 0 #d2d9db, -2px 0 0 #d2d9db, 0 2px 0 #d2d9db, 0 -2px 0 #d2d9db, 1px 1px #d2d9db, -1px -1px 0 #d2d9db, 1px -1px 0 #d2d9db, -1px 1px 0 #d2d9db",
    },

  
    link:{
      color:"yellow",
      marginTop:"10px",
      fontSize:"21px",
      paddingLeft:"10px",
      textShadow: "0 0 5px black",
      "&:hover":{
        color:"#e3f15b"
    },
    },
    createInput : {
      margine:"10 10 10 10",
      width: "400px",
      fontSize: "22px",
      padding: "10px",
      boxSizing: "borderBox",
      borderRadius: "3px",
      border: "none",
      outlineColor: "blue",
      boxShadow: "0 2px 4px grey",
      alignSelf: "center",
      },
      
 }))


  const [userName, setUsername] = useState("");
  const [passw, setPassword] = useState("");
  const [authenticationPassed,setAuthenticationPassed]=useState(false);

  function validateForm() {
    return userName.length > 0 && passw.length > 0;
  }

  function validateUsername(name)
  {
    if(name.match(/^[a-zA-Z0-9_]+$/))
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  function storeUser(user)
  {
 
    var ciphertext = cryptoJs.AES.encrypt(JSON.stringify(user),simetricKeyS).toString();
    localStorage.setItem("user",ciphertext);

  }
  function handleSubmit() 
  {
    if(validateUsername(userName))
    {
      let credentials={username:userName,password:passw};
      axios.post(loginUrl,credentials).then(res=>{storeUser(res.data);setAuthenticationPassed(true)}).catch(function (error)
        {
          if(error.response.status===401)
            {
              alert("The user name or password is incorrect");
            }
          else
            {
              alert("The error occurred due to server problem.");
            }
        });
    }
    else
    alert("Only alphanumeric characters and underscore allowed in USERNAME.");
  }

 
   const classes=useStyle();

  if(authenticationPassed)
  {
    return <Navigate to={certificateFrontEnd}/>
  }

  return (
   
    <div className={classes.root}>
      
      <Form>
          <div className={classes.title}>
      <h1 className={classes.label}>Login :</h1>
            </div>
        <FormGroup size="large" controlid="username">
          <FormLabel className={classes.label}>Username :</FormLabel>
          <Form.Control
            className={classes.createInput}
            autoFocus
            type="username"
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e)=>{ if(e.key==="Enter")
            {
              e.preventDefault();
              if(validateForm())
              handleSubmit();
              else
              alert("Error: all fields are required");
            }}}
          />
        </FormGroup>
        <FormGroup size="large" controlid="password">
          <FormLabel className={classes.label}>Password :</FormLabel>
          <Form.Control
            className={classes.createInput}
            type="password"
            value={passw}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e)=>{ if(e.key==="Enter")
            {
              e.preventDefault();
              if(validateForm())
              handleSubmit();
              else
              alert("Error: all fields are required");
            }}}  
          />
        </FormGroup>
      <Link to={"/signup"} className={classes.link}>Create account</Link>
      </Form>
        <Button block size="large" type="submit" disabled={!validateForm()} className={classes.button} onMouseDown={()=>handleSubmit()}>
          Login
      </Button>
     </div>
  );
}