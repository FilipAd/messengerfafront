import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Chat from './Chat';
import {makeStyles} from "@material-ui/core/styles";
import { Grid } from '@material-ui/core';
import Background from "../background.jpg";
import { loginEnd, membersUrl, messageUrl, offlineStatusEnd, onlineMembersUrl, onlineStatusEnd, sendNoticeOnlineStatusUrl, serverWebSocketUrl, simetricKeyS } from '../URLs';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import SockJsClient from "react-stomp";
import cryptoJs from 'crypto-js';


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
    let me=null;
    let configToken=null;
  if(localStorage.getItem("user")!==null)
  {
    var bytes = cryptoJs.AES.decrypt(localStorage.getItem("user"),simetricKeyS);
    me = JSON.parse(bytes.toString(cryptoJs.enc.Utf8));
  if(me!==null)
  {
   configToken={ headers: {Authorization:"Bearer "+me.token,UserName:me.username}};
  }
  }

  let [receiver,setReceiver]=useState({});
  let [redirectToLogin,setRedirectToLogin]=useState(false);
  let [onlineMembers,setOnlineMembers]=useState([]);
  const[clientRef2,setClientRef2]=useState(null);
  let notice={name:"bye",message:"bye"}
  let [messages,setMessages]=useState([]);

  React.useEffect(()=>{axios.get(onlineMembersUrl,configToken).then(res=>{setOnlineMembers(res.data);console.log(res.data)}).catch(function (error){console.log(error)});},[]);
  React.useEffect(()=>{axios.get(messageUrl+me.id+"/"+((receiver.id===undefined)?"0":receiver.id),configToken).then(res=>{setMessages(res.data)}).catch(function (error){console.log(error)});},[]);
  function logout()
  { 
    axios.get(membersUrl+me.id+offlineStatusEnd,configToken).then(console.log("you are online now")).catch(function (error) //podesi svoj status na offline
            {
              console.log(error);
            });
    axios.post(sendNoticeOnlineStatusUrl,notice,configToken).then(console.log("you are offline now")).catch(function (error) //posalji svima obavjest da si offline
    {
      console.log(error);
    });
    localStorage.removeItem("user");
    sessionStorage.removeItem("emailTokenStored");
    setRedirectToLogin(true);
  }

  function updateOnline()
  {
    axios.get(onlineMembersUrl,configToken).then(res=>{setOnlineMembers(res.data);console.log("punimo bazu online iz metode")}).catch(function (error){console.log(error)});
  }

  function loadMessagesForChat(receiverDirect)
  {
    axios.get(messageUrl+me.id+"/"+receiverDirect.id,configToken).then(res=>{setMessages(res.data)}).catch(function (error){console.log(error)});
  }

  if(redirectToLogin)
  {
    return <Navigate to={loginEnd}/>
  }
  return (<div className={classes.app}>
    <div className={classes.app_body}>
    <Sidebar setReceiver={setReceiver} logout={logout} onlineMembers={onlineMembers} loadMessagesForChat={loadMessagesForChat}/>
    <Chat receiver={receiver} messages={messages} setMessages={setMessages} logout={logout}/>
    <SockJsClient url={serverWebSocketUrl}
        topics={["/topic/user"]}
        onConnect={()=>{
            console.log("Socket for online status connected");
            axios.get(membersUrl+me.id+onlineStatusEnd,configToken).then(console.log("you are online now")).catch(function (error)
            {
              console.log(error);
            })
            let notice={name:me.username,message:me.usernmae};
            axios.post(sendNoticeOnlineStatusUrl,notice,configToken).then(console.log("everybody i am online")).catch(function (error) //posalji svima obavjest da si offline
            {
              console.log(error);
            });
            ;}}

        onDisconnect={()=>{console.log("Disconnected");
        axios.get(membersUrl+me.id+offlineStatusEnd,configToken).then(console.log("you are offline now")).catch(function (error)
        {
          console.log(error);
        });
        axios.post(sendNoticeOnlineStatusUrl,notice,configToken).then(console.log("everybody i am offline")).catch(function (error) //posalji svima obavjest da si offline
        {
          console.log(error);
        });
        }}

        onMessage={(msg)=>{
          updateOnline();
        }}
        onClose={(e)=>{
          axios.get(membersUrl+me.id+offlineStatusEnd,configToken).then(console.log("you are offline now")).catch(function (error)
          {
            console.log(error);
          });
          axios.post(sendNoticeOnlineStatusUrl,notice,configToken).then(console.log("everybody i am offline")).catch(function (error) //posalji svima obavjest da si offline
          {
            console.log(error);
          });

        
           
        }}

        ref={(client)=>{
            setClientRef2(client);
        }}>
        </SockJsClient>

    </div>
  </div>
  
);
}

