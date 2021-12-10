import React, { useState } from 'react';
import {makeStyles} from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import SidebarChat from './SidebarChat';
import ExitToApp from "@material-ui/icons/ExitToApp";
import { Avatar, IconButton } from '@material-ui/core';
import ComputerIcon from "@material-ui/icons/Computer";
import localIpUrl from 'local-ip-url';
import localIpV4Address from 'local-ipv4-address';
import {membersEnd,onlineMembersUrl, simetricKeyS} from "../URLs"
import axios from 'axios';
import cryptoJs from 'crypto-js';



export default function Sidebar(props)
{
    let localIpV4Address=require("local-ipv4-address");
    const useStyle = makeStyles((theme) =>({
        sidebar:
        {
            flex:"0.4",
            display:"flex",
            flexDirection:"column",
            borderRight:"3px solid #ecc1a3",
            boxShadow: "0 2px 4px grey",
        },
        sidebar_header:
        {
            flex:0.07,
            height:"80px",
            display:"flex",
            background:"#ff964c",
            boxShadow: "0 2px 4px grey", 
        },
        sidebar_search_input:
        {
            display:"flex",
            alignItems:"center",
            padding:"4px",
            borderRadius:"50px",
            backgroundColor:"#f0f1f1",
            marginLeft:"5px",
            marginTop:"7px",
            marginBottom:"5px",
            marginRight:"20px",
            height:"30px",
            width:"30%",
        },
        sidebar_header_name:
        {
            marginLeft:"10px",
            color:"white",
            textShadow: "2px 0 0 #7f1e00, -2px 0 0 #7f1e00, 0 2px 0 #7f1e00, 0 -2px 0 #7f1e00, 1px 1px #7f1e00, -1px -1px 0 #7f1e00, 1px -1px 0 #7f1e00, -1px 1px 0 #7f1e00",
            fontSize:"12px",
    
        },

        sidebar_search_icon:
        {
            backgroundColor:"inherit",

        },
        sidebar_search_input_field:
        {
            border:"none",
            width:"100%",
            backgroundColor:"inherit",
            outline:"none",

        },
        sidebar_chats:
        {
            overflowY:"auto"
        },
        sidebar_exit:
        {
            align:"right",
            marginLeft:"30px",
            marginTop:"3px",
            
        },
        side_name_all:
        {
            display:"flex",
            alignItems:"center",
            marginLeft:"10px",
            color:"white",
            textShadow: "2px 0 0 #7f1e00, -2px 0 0 #7f1e00, 0 2px 0 #7f1e00, 0 -2px 0 #7f1e00, 1px 1px #7f1e00, -1px -1px 0 #7f1e00, 1px -1px 0 #7f1e00, -1px 1px 0 #7f1e00",
            fontSize:"12px",
            width:"180px"

        },
        side_header_avatar:
        {
            color:"#a34d17",
        },
        address:
        {
            marginLeft:"10px"
        },
        name:
        {
            marginLeft:"10px"
        }
    }))
    const classes=useStyle();
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
 
 
   
    return(<div className={classes.sidebar}> 
            <div className={classes.sidebar_header}>
                <div className={classes.sidebar_search_input}>
                    <SearchIcon className={classes.sidebar_search_icon}/>
                    <input type="text" className={classes.sidebar_search_input_field} placeholder="Search..."/>
                </div> 
                <div className={classes.side_name_all}>
                    <ComputerIcon className={classes.side_header_avatar}/>
                    <div className={classes.name}>{me.username}</div>
                
                </div>
                <div className={classes.sidebar_exit}>
                    <IconButton onMouseDown={()=>props.logout()}>
                    <ExitToApp/>
                    </IconButton>
                </div>
                
            </div>
            <div className={classes.sidebar_chats}>
            {
                props.onlineMembers.map(member=><SidebarChat onlineMember={member} setReceiver={props.setReceiver} loadMessagesForChat={props.loadMessagesForChat}/>)
            }
            </div>

        </div>
    );
}