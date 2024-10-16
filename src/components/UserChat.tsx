import { useEffect, useState } from "react";
import background from "../assets/wallapaper.jpeg"
import { conversationType } from "../pages/Chats";
import HeaderChat from "./HeaderChat";
import SendMessage from "./SendMessage";
import { useParams } from "react-router-dom";
import Messages from "./Messages";
import { Socket } from "socket.io-client";

const UserChat = ({socket,conversation}:{socket: Socket | undefined,conversation: conversationType[] | null}) => {
    const { id } = useParams()
    const [converId,setConverId] = useState<string | null>(null)
    useEffect(()=>{
        conversation?.map((ele)=> {
            if(ele.receiverId === +(id as string) || ele.senderId === +(id as string)) {
                return setConverId(ele.conversationId)
            }
            else{
                setConverId("none")
            }
        })
    },[conversation,id])
    // console.log(converId);
    useEffect(()=>{
        if(socket && converId) {
            socket.emit("join-conversation",{conversationId:converId})
        }
        else{
            console.log("socket or converId is undefined");
            
        }
    },[socket,converId])
    useEffect(()=>{
        if(socket){
            socket.on("conversation-started",(data)=>{
                console.log("conversation started",data);
            })
        }
    },[socket])
    return (
        <div style={{backgroundImage:`url(${background})`}} className="w-full h-full bg-no-repeat bg-cover rounded-md shadow-lg">
            <HeaderChat/>

            {/* Messages */}
            <div className="h-[calc(100%-120px)] w-full bg-slate-200 bg-opacity-50 overflow-y-auto">
                {
                    converId &&
                    <Messages converId={converId as string} />
                }
            </div>

            {/* send message */}
            <SendMessage converId={converId}/>
        </div>
    );
}

export default UserChat;
