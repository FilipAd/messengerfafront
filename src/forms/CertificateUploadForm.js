import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import {makeStyles,fade} from "@material-ui/core/styles";
import {Button,FormLabel,FormGroup} from "@material-ui/core"
//import "./Universal.css";
import axios from "axios";
import {Link,Navigate} from "react-router-dom";
import Background from "../background.jpg";
import { loginUrl,emailSendTokenUrl,emailTokenFrontEnd, certificateUploadUrl, loginEnd, simetricKeyS} from "../URLs";
import cryptoJs from "crypto-js";



export default function CertificateUploadForm(props) {

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
      height:"150px",
      width: "400px",
      fontSize: "22px",
      padding: "10px",
      boxSizing: "borderBox",
      borderRadius: "3px",
      borderStyle:"dotted",
      border: "solid",
      borderColor:"white",
      outlineColor: "blue",
      boxShadow: "0 2px 4px grey",
      alignSelf: "center",
      },
      
 }))



  function handleSubmit() 
  {
   
  }

 
   const classes=useStyle();
   let [selectedFile,setSelectedFile]=useState(null);
   let [uploadEnabled,setUploadEnabled]=useState(true);
   let [redirectToEmail,setRedirectToEmail]=useState(false);
   let [redirectToLogin,setRedirectToLogin]=useState(false);
   let me=null;
   let configToken=null;
 if(localStorage.getItem("user")!==null)
 {
    try
   {
   var bytes = cryptoJs.AES.decrypt(localStorage.getItem("user"),simetricKeyS);
   me = JSON.parse(bytes.toString(cryptoJs.enc.Utf8));
   
 
    if(me!==null)
    {
      configToken={ headers: {Authorization:"Bearer "+me.token,UserName:me.username}};
    }
    }
    catch(error)
    {
      alert("Bad decrypt");
    }
 }

   function onFileChangeHandler(e){

    if(e.target.files[0])
    {
     if(e.target.files[0].size<1048576)
     {  
       e.preventDefault();
       setSelectedFile(e.target.files[0]);
       setUploadEnabled(false);
     }
     else
     {
     alert("file is too large");
     setSelectedFile(null);
     setUploadEnabled(true);
     }
    }
    
    };
    function sendEmailToken(id)
    {
   //   axios.get(emailSendTokenUrl+id).then(console.log("mejl poslat")).catch(function (error) {console.log("error:"+error)});
   //   sendEmailToken(res.data.id)
    }
  

    function handleCertificateIsValid()
    {
    //  sendEmailToken(res.data.id)
    //  setRedirectToEmail(true);
    }

    function uploadFile()
    {
    const formData = new FormData();
    formData.append('file',selectedFile);
      axios.post(certificateUploadUrl,formData,configToken).then(res=>(res.data)?setRedirectToEmail(true):alert("Your certificate is not valid or is not yours")).catch(function (error)
       { 
        if(error.response.status===403)
        {
          alert("You are not logged in. Please log in and try again");
          setRedirectToLogin(true);
        }
        else
        {
          alert("The error occurred due to server problem or your file is too large");
        }
        });
    }

  if(redirectToLogin)
  {
    return <Navigate to={loginEnd}/>
  }
  if(redirectToEmail)
  {
    return <Navigate to={emailTokenFrontEnd}/>
  }
  return (
   
    <div className={classes.root}>
       <Form>
          <div className={classes.title}>
      <h1 className={classes.label}>Upload your certificate :</h1>
            </div>
        <FormGroup size="large" controlid="file">
          <FormLabel className={classes.label}>File :</FormLabel>
          <Form.Control
            className={classes.createInput}
            autoFocus
            type="file"
            onChange={onFileChangeHandler}
            onKeyDown={(e)=>{ if(e.key==="Enter")
            {
            
            }}}
          />
        </FormGroup>
        </Form>
        <Button block size="large" disabled={uploadEnabled} className={classes.button} onMouseDown={()=>uploadFile()}>
          Upload
      </Button>
     </div>
  );
}