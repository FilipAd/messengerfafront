import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import { Avatar } from '@material-ui/core';

export default function SidebarChat(props)
{
    const useStyle = makeStyles((theme) =>({
        sidebar_chat:
        {
            display:"flex",
            padding:"10px",
            cursor:"pointer",
            borderBottom:"1px solid #ecc1a3",
            "&:hover":{
                background:"#cc5400",
            color:"white"}
            
        },
        sidebar_chat_info:
        {
            marginLeft:"10px",
        },
        sidebar_avatar:
        {
            marginTop:"10px",
            color:"#d16519",
            background:"#ffeecb",
            border:"2px solid #ff3c00",

        }
    }))
    const classes=useStyle();

    function handleClick()
    {
        props.setReceiver(props.onlineMember);
        props.loadMessagesForChat(props.onlineMember);
    }
    return(
    <div className={classes.sidebar_chat} onClick={()=>handleClick()}>
        <Avatar className={classes.sidebar_avatar}/>
        <div className={classes.sidebar_chat_info}>
            <h3>{props.onlineMember.username}</h3>
        </div>
    </div>
    );
}