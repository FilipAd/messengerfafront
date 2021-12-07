import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import {makeStyles,fade} from "@material-ui/core/styles";
import {Button,FormLabel,FormGroup} from "@material-ui/core"
import axios from "axios";
import Background from "../background.jpg";
import {loginEnd,signUpUrl} from "../URLs";
import {Navigate,Link} from "react-router-dom";





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
  const [email,setEmail]=useState("");
  const [redirect,setRedirect]=useState(false);


  function validateForm() {
    return userName.length > 0 && passw.length > 0 && repassw.length>0 && email.length>0;
  }
  function validateEmail()
  {
    if (email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
    return true;
    else
    {
    alert("Invalid email");
    return false;
    }
  }
  function validatePassword()
  {
    if(passw===repassw)
    return true;
    else
    {
      alert("Password and confirm password does not match")
      return false;
    }
  }
  function validateUsername()
  {
    if(userName.match(/^[a-zA-Z0-9_]+$/))
    {
      return true;
    }
    else
    {
      alert("Only alphanumeric characters and underscore allowed in USERNAME.");
      return false;
    }
  }
  function validate()
  {
    return validateEmail() && validatePassword() && validateUsername();
  }

  function createUser(user)
  {
   if(validate())
   {
    let user={username:userName,password:passw,email:email,online:0};
    axios.post(signUpUrl,user).then(()=>{setRedirect(true);}).catch(function (error)
    {
      if(error.response.status)
      {
        alert("This username is already taken. Please choose another name.");
      }
      else
      alert("The error occurred due to server problem.");
    });
  }
} 

  function handleSubmit(event) 
  {
    
  }

 
   const classes=useStyle();

  if(redirect)
  {
    return <Navigate to={loginEnd}/>
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
            onKeyDown={(e)=>{ if(e.key==="Enter")
            {
              e.preventDefault();
              if(validateForm())
              createUser();
              else
              alert("Error: all fields are required");
            }}}  
          />
        </FormGroup>
        <FormGroup size="large" controlid="email">
          <FormLabel className={classes.label}>email :</FormLabel>
          <Form.Control
            className={classes.createInput}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e)=>{ if(e.key==="Enter")
            {
              e.preventDefault();
              if(validateForm())
              createUser();
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
              createUser();
              else
              alert("Error: all fields are required");
            }}}  
          />
        </FormGroup> 
        <FormGroup size="large" controlid="confirmPassword">
          <FormLabel className={classes.label}>Retype Password :</FormLabel>
          <Form.Control
            className={classes.createInput}
            type="password"
            value={repassw}
            onChange={(e) => setRePassword(e.target.value)}
            onKeyDown={(e)=>{ if(e.key==="Enter")
            {
              e.preventDefault();
              if(validateForm())
              createUser();
              else
              alert("Error: all fields are required");
            }}}  
          />
        </FormGroup>
        <Link to={"/"} className={classes.link}>Already have an account? Sign in</Link>
      </Form>
     
      <Button block size="large" type="submit" disabled={!validateForm()} className={classes.button} onMouseDown={()=>createUser()}>
          Create
      </Button>
     </div>
  );
  }