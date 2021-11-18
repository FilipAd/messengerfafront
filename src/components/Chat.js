import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import { Avatar,IconButton} from '@material-ui/core';
import SendIcon from "@material-ui/icons/Send";
import Message from './Message';
import ExitToApp from "@material-ui/icons/ExitToApp";


export default function Chat()
{
    const useStyle = makeStyles((theme) =>({
        chat:
        {
          flex:"0.6",
          display:"flex",
          flexDirection:"column",
          boxShadow: "0 2px 4px grey",
        },
        chat_header:
        {
            height:"60px",
            display:"flex",
            alignItems:"center",
            background:"#ff964c",
            boxShadow: "0 2px 4px grey",
        },
        chat_header_avatar:
        {
            marginLeft:"10px",
            border:"2px solid #7f1e00",
            color:"#d16519",
            background:"#ffeecb",
        },
        chat_header_name:
        {
            marginLeft:"10px",
            color:"white",
            textShadow: "2px 0 0 #7f1e00, -2px 0 0 #7f1e00, 0 2px 0 #7f1e00, 0 -2px 0 #7f1e00, 1px 1px #7f1e00, -1px -1px 0 #7f1e00, 1px -1px 0 #7f1e00, -1px 1px 0 #7f1e00",
        },
        chat_body:
        {
            padding:"30px 10px",
            overflowY:"auto",
            display:"flex",
            flexDirection:"column",

        },
        chat_footer:
        {
           display:"flex",
         //  flex:"1",
           height:"100px",
           borderTop:"2px solid grey",

        },
        chat_input:
        {
            height:"95%",
            width:"95%",
            
            border:"none",
            marginLeft:"1px",
            fontSize:"20px"

        },
        chat_form:
        {
            display:"flex",
            flex:"1",
        },
        button:
        {
            background:"#ffab6f",
            width:"50px",
            height:"50px",
            marginTop: "5px",
            marginBottom: "5px",
            marginLeft: "5px",
            marginRight: "5px",
        },
        chat_exit:
        {
           position:"relative",
           alignSelf:"right",
        }
    }));
    const classes=useStyle();
    return (
        <div className={classes.chat}>
            <div className={classes.chat_header}>
            <Avatar className={classes.chat_header_avatar}/>
            <div className={classes.chat_header_name}>
                <h2>Ime i Prezime</h2>
            </div>
           
            </div>
            <div className={classes.chat_body}>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            </div>
            <div className={classes.chat_footer}>
                <form className={classes.chat_form}>
                <input type="text" placeholder="Type a message..." className={classes.chat_input}/>
                <IconButton className={classes.button}><SendIcon/></IconButton>
                </form>
            </div>
        </div>
    );
}