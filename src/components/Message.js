import { Avatar, makeStyles } from "@material-ui/core";
import React from "react";

export default function Message()
{
    const useStyle=makeStyles((theme)=>({
        message:
        {
            display:"flex",
            marginBottom:"5px",
            maxWidth:"90%",
            position:"relative",
        },
        message_sender_avatar:
        {
            position:"absolute",

        },
        avatar:
        {
           background:"#c9804c" 
        },
        message_info:
        {
            fontSize:"18px",
            padding:"8px",
            marginLeft:"45px",
            backgroundColor:"#ffcfad",
            borderRadius:"12px",
        },
        message_name:
        {
            fontSize:"16px",
            color:"#8a82be",
            fontWeight:"bold",

        },
        message_text:
        {

        },
        message_timestemp:
        {
            fontSize:"12px",
            textAlign:"right",
            paddingRight:"5px",
            color:"#b34a00",
        }
    }))
    const classes=useStyle();
    return(
        <div className={classes.message}>
            <div className={classes.message_sender_avatar}>
                <Avatar className={classes.avatar}/>
            </div>
            <div className={classes.message_info}>
                <div className={classes.message_name}>Jovan</div>
                    <div className={classes.message_text}>HAHAHHAHAHHAHAHA</div>
                    <div className={classes.message_timestemp}>10:00 PM</div>
                </div>
        </div>
    );
}