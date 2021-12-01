import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Chat from './Chat';
import {makeStyles} from "@material-ui/core/styles";
import { Grid } from '@material-ui/core';
import Background from "../background.jpg";


export default function Home() 
{

  const useStyle = makeStyles((theme) =>({
    app:
    {
      display:"grid",
      placeItems:"center",
      backgroundColor:"#ffdfc9",
      height:"100vh",
      backgroundSize:"cover",
      backgroundRepeat:"no-repeat",
      backgroundImage:`URL(${Background})`,
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
  const userFromStorage=JSON.parse(localStorage.getItem("user"))
  let [receiver,setReceiver]=useState(null);
  return (<div className={classes.app}>
    <div className={classes.app_body}>
    <Sidebar setReceiver={setReceiver}/>
    <Chat receiver={receiver}/>
    </div>
  
  </div>
  
);
}

