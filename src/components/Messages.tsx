import { useEffect, useRef, useState } from "react";
import { getMessages } from "../functions/getMessages";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Spinner from "./Spinner";
import { Socket } from "socket.io-client";

export interface messages {
    changeStatusAt:string;
    conversationId:string;
    id:string;
    message:string;
    messageStatus:string;
    senderId:string;
    sentAt:string;
}

const Messages = ({socket,converId}:{socket: Socket | null,converId:string}) => {
    console.log(converId);
    const user = useSelector((state:RootState)=>state.user)
    const [messages, setMessages] = useState<messages[]>([]);
    const [loading, setLoading] = useState(true);
    const currentMessages:React.LegacyRef<HTMLDivElement> | null | undefined = useRef(null)
    useEffect(()=>{
        if(converId){
            getMessages(converId,setMessages,setLoading);
        }
    },[converId])
    useEffect(()=>{
        if(socket){
            socket?.on("receive-message",(data)=>{
                console.log(data);
                console.log(JSON.parse(data));
                setMessages(prev=>[...prev,JSON.parse(data)])
            })
        }

        return ()=>{
            socket?.off("receive-message")
        }
    },[socket])
    useEffect(()=>{
        if(currentMessages.current){
            currentMessages.current.scrollIntoView({behavior:"smooth",block:'end'})
        }
    },[messages])
    return (
        <div className="my-3" ref={currentMessages}>
            {
                loading ?
                <Spinner />
                :messages ?
                <>
                    {
                        messages.map((msg,i)=>(
                            <div key={i} className="mt-3">
                                {+msg.senderId === +user.id ? 
                                <div className="flex bg-teal-100 w-fit shadow-md ml-2 p-1 px-2 rounded-md mr-auto items-end flex-col justify-end">
                                    <p>{msg.message}</p>
                                    <span className="text-sm text-start w-full">{new Date(msg.changeStatusAt).getHours()}:{new Date(msg.changeStatusAt).getMinutes()}</span>
                                </div>
                                : 
                                <div className="flex bg-white w-fit shadow-md p-1 px-2 rounded-md mr-2 flex-col">
                                    <p>{msg.message}</p>
                                    <span className="text-sm text-end w-full">{new Date(msg.changeStatusAt).getHours()}:{new Date(msg.changeStatusAt).getMinutes()}</span>
                                </div>
                                }
                            </div>
                        ))
                    }
                </>
                :null
            }
        </div>
    );
}

export default Messages;
