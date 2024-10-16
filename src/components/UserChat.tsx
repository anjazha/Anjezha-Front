import { useEffect, useState } from "react";
import background from "../assets/wallapaper.jpeg"
import HeaderChat from "./HeaderChat";
import SendMessage from "./SendMessage";
import { useParams } from "react-router-dom";
import Messages from "./Messages";
import { io, Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { cookie } from "../functions/axiosInstance";

const UserChat = () => {
    const user = useSelector((state:RootState)=>state.user)
    const { id } = useParams()
    const [converId,setConverId] = useState<string | null>(null)
    const [socket,setSocket] = useState<Socket | null>(null)
    useEffect(()=>{
        const socketUsers:Socket = io("https://anjezha-production.up.railway.app?EIO=4&transport=polling",{
            extraHeaders:{
                token:cookie.get("token")
            }
        }).connect()

        setSocket(socketUsers)

        socketUsers.on("online-users",(data)=>{
            console.log("online user",data);
        })
        
        return ()=>{
            socketUsers.disconnect()
        }
    },[])
    useEffect(()=>{
        if(socket && id && user){
            socket?.emit("start-conversation",{senderId:+(user.id as string),receiverId:+(id as string)})
            socket?.on("conversation-started",(data)=>{
                // console.log("conversation started",data);
                setConverId(data);
                socket?.emit("join-conversation",{conversationId:data})
            })
        }
    },[socket,id,user])
    // console.log(converId);
    console.log(socket);
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
