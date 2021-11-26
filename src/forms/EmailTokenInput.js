import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import {makeStyles,fade} from "@material-ui/core/styles";
import {Button,FormLabel,FormGroup} from "@material-ui/core"
//import "./Universal.css";
import axios from "axios";
import {Link,Navigate} from "react-router-dom";
import Background from "../background.jpg";
import { loginUrl,homeFrontEnd } from "../URLs";



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
      fontFamily:"Arial",
      padding: "10px",
      alignSelf:"center",
      color:"white",
      fontWeight:"bold",
      textShadow: "2px 0 0 black, -2px 0 0 black, 0 2px 0 black, 0 -2px 0 black, 1px 1px black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black",
    },
    title:
    {
      fontSize:"20px",
      fontFamily:"Lucida Handwriting",
      padding: "10px",
      alignSelf:"center",
      color:"white",
      fontWeight:"bold",
      textShadow: "2px 0 0 black, -2px 0 0 black, 0 2px 0 black, 0 -2px 0 black, 1px 1px black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black",
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


  const [emailToken, setEmailToken] = useState("");
  const [authenticationPassed,setAuthenticationPassed]=useState(false);

  function validateForm() {
    return emailToken.length > 0;
  }


  function handleSubmit() 
  {
   /* let emailTokenSend={emailToken};
  //  axios.post(nekaAdresa,credentials).then(res=>{console.log(res.data);storeUser(res.data);setAuthenticationPassed(true)}).catch(function (error)
    {
      if(error.response.status===401)
      {
        alert("The user name or password is incorrect");
      }
      else
      {
        alert("The error occurred due to server problem.");
      }
    });*/
  }

 
   const classes=useStyle();

  if(authenticationPassed)
  {
    return <Navigate to={homeFrontEnd}/>
  }

  return (
   
    <div className={classes.root}>
      
      <Form>
          <div>
      <h1 className={classes.title}>Token :</h1>
            </div>
        <FormGroup size="large" controlid="token">
          <FormLabel className={classes.label}>Enter the TOKEN you received at your e-mail :</FormLabel>
          <Form.Control
            className={classes.createInput}
            autoFocus
            value={emailToken}
            onChange={(e) => setEmailToken(e.target.value)}
          />
        </FormGroup>
      </Form>
        <Button block size="large" disabled={!validateForm()} className={classes.button} onMouseDown={()=>handleSubmit()}>
          VERIFY
      </Button>
     </div>
  );
}