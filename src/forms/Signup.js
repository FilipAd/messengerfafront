import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import {makeStyles,fade} from "@material-ui/core/styles";
import {Button,FormLabel,FormGroup} from "@material-ui/core"
import axios from "axios";
import {Link} from "react-router-dom";
import Background from "../background.jpg";



export default function Signup(props) {

  const useStyle = makeStyles((theme) =>({

   

     
   
    root:
    {
      width:"100%",
      height:"100vh",
      textAlign:"center",
      backgroundPosition:"center",
      backgroundRepeat:"no-repeat",
      backgroundSize:"cover",
      background:"",
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


  const [userName, setUsername] = useState("");
  const [passw, setPassword] = useState("");
  const [repassw,setRePassword]=useState("");
  const [authenticationPassed,setAuthenticationPassed]=useState(false);


  function validateForm() {
    return userName.length > 0 && passw.length > 0 && repassw.length>0;
  }

  function storeUser(user)
  {
   

  }

  function handleSubmit(event) 
  {
    
  }

 
   const classes=useStyle();

  if(authenticationPassed)
  {
    
  }

  return (
   
    <div className={classes.root}>
      
      <Form onSubmit={handleSubmit}>
          <div className={classes.title}>
      <h1 className={classes.label}>Signup :</h1>
            </div>
        <FormGroup size="large" controlid="username">
          <FormLabel className={classes.label}>Username :</FormLabel>
          <Form.Control
            className={classes.createInput}
            autoFocus
            type="username"
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormGroup>
        <FormGroup size="large" controlid="password">
          <FormLabel className={classes.label}>Password :</FormLabel>
          <Form.Control
            className={classes.createInput}
            type="password"
            value={passw}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup> 
        <FormGroup size="large" controlid="confirmPassword">
          <FormLabel className={classes.label}>Retype Password :</FormLabel>
          <Form.Control
            className={classes.createInput}
            type="password"
            value={repassw}
            onChange={(e) => setRePassword(e.target.value)}
          />
        </FormGroup>
        <Link to={"/"} className={classes.link}>Already have an account? Sign in</Link>
      </Form>
     
      <Button block size="large" type="submit" disabled={!validateForm()} className={classes.button}>
          Create
      </Button>
     </div>
  );
}