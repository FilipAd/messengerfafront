import React, { useState } from 'react';
import {makeStyles} from "@material-ui/core/styles";
import { Avatar,IconButton,InputBase} from '@material-ui/core';
import SendIcon from "@material-ui/icons/Send";
import Message from './Message';
import ExitToApp from "@material-ui/icons/ExitToApp";
import { PermPhoneMsg, StarTwoTone } from '@material-ui/icons';
import SockJsClient from "react-stomp";
import client from 'react-stomp';
import { serverWebSocketUrl,topicsUrl } from '../URLs';
import ChatInput from '../forms/ChatInput';
import axios from "axios";
import {membersUrl,onlineStatusEnd} from "../URLs";

export default function Chat(props)
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
            height:"80%"

        },
        chat_footer:
        {
           display:"flex",
           flex:"1",
           height:"7%",
           borderTop:"2px solid grey",
        },
        chat_input:
        {
            height:"60%",
            width:"100%",
            border:"none",
            marginLeft:"10px",
            fontSize:"20px",

        },
        chat_form:
        {
            display:"flex",
            flex:"1",
            height:"100px",
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
    const me=JSON.parse(localStorage.getItem("user"));
    const classes=useStyle();
    let [messageText,setMessageText]=useState("");
    let [messages,setMessages]=useState([]);
    const[clientRef,setClientRef]=useState(null);
  

  /*  function sendMessage(messagetxt,from)
    {
        if(messagetxt!=="")
        {
        clientRef.sendMessage('/app/user-all', JSON.stringify({  
            message: messagetxt,
            name:from

        }));
        setMessageText("");
        }
    }*/

    function sendMessage(messagetxt,from)
    {
        if(messagetxt!=="")
        {
        let msg={name:me.username,message:messagetxt};
        setMessages([...messages,msg]);
        clientRef.sendMessage('/app/websocket-chat/'+props.receiver,JSON.stringify({message: messagetxt,name:me.username}));
        setMessageText("");
        }
    }

    function handleOnChange(e)
    {
        setMessageText(e.target.value);
    }

    return (
        <div className={classes.chat}>
            <div className={classes.chat_header}>
            <Avatar className={classes.chat_header_avatar}/>
            <div className={classes.chat_header_name}>
                <h2>{props.receiver}</h2>
            </div>
           
            </div>
            <div className={classes.chat_body}>
            {
            messages.map(msg=> <Message msg={msg}/>)
            }
            </div>
            <div className={classes.chat_footer}> 
                <ChatInput setMessageText={setMessageText} messageText={messageText} sendMessage={sendMessage} handleOnChange={handleOnChange} />
            </div>
            
        <SockJsClient url={serverWebSocketUrl}
        topics={[topicsUrl+me.username]}
        onConnect={()=>{
            console.log("Connected");
            axios.get(membersUrl+me.id+onlineStatusEnd).then(console.log("you are online now")).catch(function (error)
            {
              console.log(error);
            });}}
        onDisconnect={()=>{console.log("Disconnected");
        }}
        onMessage={(msg)=>{
            setMessages([...messages,msg]);
            console.log(msg);
        }}
        ref={(client)=>{
            setClientRef(client);
        }}>
        </SockJsClient>
        </div>
    );
}