import React, { useState } from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {IconButton,InputBase} from '@material-ui/core';
import SendIcon from "@material-ui/icons/Send";





export default function ChatInput(props)
{
    const useStyle = makeStyles((theme) =>({
    chat_input:
    {
        height:"60%",
        width:"100%",
        border:"none",
        marginLeft:"10px",
        fontSize:"20px",

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
    chat_form:
        {
            display:"flex",
            flex:"1",
            height:"100px",
        },
  
}));
const classes=useStyle();
let [messageTextPom,setMessageTextPom]=useState("");
function handleOnChange(e)
{
    setMessageTextPom(e.target.value);
}
function sendMessage()
{
    props.sendMessage(messageTextPom);
    setMessageTextPom("");
}
    return(<div className={classes.chat_form}>
    <InputBase placeholder="Type a message..." className={classes.chat_input} value={messageTextPom} onChange={handleOnChange}/>
    <IconButton className={classes.button} onMouseDown={sendMessage}><SendIcon/></IconButton>
    </div>);
}