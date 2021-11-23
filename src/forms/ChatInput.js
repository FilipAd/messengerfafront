import React, { useState } from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {IconButton,InputBase} from '@material-ui/core';
import SendIcon from "@material-ui/icons/Send";





export default function ChatInput(props)
{
    const useStyle = makeStyles((theme) =>({
    chat_input:
    {
        height:"100%",
        width:"100%",
        border:"none",
        marginLeft:"10px",
        fontSize:"20px",

    },
    button:
    {
        background:"#ffab6f",
        width:"5%",
        height:"70%",
        marginTop: "1%",
        marginBottom: "1%",
        marginLeft: "1%",
        marginRight: "1%",
    },
    chat_form:
        {
            display:"flex",
            flex:"1",
            height:"100%",
           
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
    <InputBase placeholder="Type a message..." className={classes.chat_input} value={messageTextPom} onChange={handleOnChange}
    onKeyDown={(e)=>{ if(e.key=="Enter")
    {
        e.preventDefault();
        sendMessage();
    }}}/>
    <IconButton className={classes.button} onMouseDown={sendMessage}><SendIcon/></IconButton>
    </div>);
}