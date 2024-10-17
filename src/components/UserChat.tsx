import { useEffect, useState } from "react";
import background from "../assets/wallapaper.jpeg"
import HeaderChat from "./HeaderChat";
import SendMessage from "./SendMessage";
import { useParams } from "react-router-dom";
import Messages from "./Messages";
import { Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const UserChat = ({socket}:{socket: Socket | null}) => {
    const user = useSelector((state:RootState)=>state.user)
    const { id } = useParams()
    const [converId,setConverId] = useState<string | null>(null)
    
    useEffect(()=>{
        if(socket?.connected === true && id && user){
            console.log("socket connected");
            socket.emit("start-conversation",{senderId:+(user.id as string),receiverId:+(id as string)})
            socket.on("conversation-started",(data)=>{
                console.log("conversation started",data);
                setConverId(data);
                socket.emit("join-conversation",{conversationId:data})
            })
        }
    },[socket,id,user])
    console.log("converId",converId);
    console.log("user",socket);
    return (
        <div style={{backgroundImage:`url(${background})`}} className="w-full h-full bg-no-repeat bg-cover rounded-md shadow-lg">
            <HeaderChat/>

            {/* Messages */}
            <div className="h-[calc(100%-120px)] w-full bg-slate-200 bg-opacity-50 overflow-y-auto">
                {
                    converId && socket &&
                    <Messages socket={socket} converId={converId as string} />
                }
            </div>

            {/* send message */}
            <SendMessage socket={socket} converId={converId}/>
        </div>
    );
}

export default UserChat;
