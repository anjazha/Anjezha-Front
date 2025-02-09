import { Route, Routes } from "react-router-dom";

import UserChat from "../components/UserChat";
import SidebarChats from "../components/SidebarChats";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { baseURL, cookie } from "../functions/axiosInstance";
import { useAppDispatch } from "../store/store";
import { addOnlineUsers } from "../store/Slices/onlineUsers";

export interface conversationType {
    id:string,
    receiver:{
        receiverId:number,
        name:string,
        profilePicture:string | null,
    },
    sender:{
        senderId:number,
        name:string,
        profilePicture:string | null,
    }
}

const Chats = ()=>{
    const disptach = useAppDispatch()
    const [socket,setSocket] = useState<Socket | null>(null)
    useEffect(()=>{
        const socketUsers:Socket = io(`${baseURL}?EIO=4&transport=polling`,{
            extraHeaders:{
                token:cookie.get("token")
            }
        }).connect()

        setSocket(socketUsers)
        
        socketUsers.on("online-users",(data)=>{
            console.log("online user",data);
            disptach(addOnlineUsers(data))
        })
        
        return ()=>{
            socketUsers.disconnect()
        }
    },[disptach])
    console.log("chat",socket);
    return (
        <div className="py-5 flex justify-center">
            <div className="container">
                <div className="flex gap-5 relative h-[calc(100vh-18vh)]">
                    <SidebarChats/>
                    {/* Main Chat */}
                    <div className="flex-1">
                        <Routes>
                            <Route path="/" element={<>{defaultChat()}</>} />
                            <Route path="/userChat/:id" element={<UserChat socket={socket}/>} />
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chats;

const defaultChat = ()=>{
    return(
        <div className="w-full h-full flex justify-center items-center rounded-md bg-[#D9D9D9] dark:bg-inputDark">
            <div>
                <h1 className="font-semibold block text-2xl mb-2 duration-500 hover:text-buttonsColor text-darkColor dark:text-bodyColor text-ellipsis line-clamp-1">
                    الدردشة الرئيسية
                </h1>
                <p className="text-darkColor dark:text-bodyColor ">اختار دردشة لترسل رسالة</p>
            </div>
        </div>
    )
}