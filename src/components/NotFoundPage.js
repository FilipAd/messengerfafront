import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Button,Paper} from "@material-ui/core";
import Background from "../NotFound.png";




const useStyle = makeStyles((theme) =>({
    root:{
        textAlign:"center",
        height:"100vh",
        padding:"30px",
        backgroundImage:`URL(${Background})`,
        backgroundPosition:"center",
        backgroundRepeat:"no-repeat",
     //   backgroundSize:"cover",
       // overflowX: "scroll",
    },
    button:
    {
        background:"green",
        align:"center",
        width:"200px",
        height:"50px",
        color:"white"
    },
    label:
    {
        fontSize:"50px",
        fontWeight:"bold"
    }
}))



export default function NotFoundPage(props) {
    const classes=useStyle();

  return (
    <div className={classes.root}>
        <h className={classes.label}>Page Not Found</h>
    </div>
  );
}