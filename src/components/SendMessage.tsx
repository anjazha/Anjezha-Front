import { SendHorizontal } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useParams } from "react-router-dom";
// import { createConversation } from "../functions/createConversation";
import { Socket } from "socket.io-client";

const SendMessage = ({socket,converId}:{socket: Socket | null,converId:string | null}) => {
    const user = useSelector((state:RootState)=>state.user)
    const {id} = useParams()
    const [message,setMessage] = useState("")
    const onSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        console.log(message);
        socket?.emit("send-message",{
            message:message,
            senderId:+(user.id as string),
            receiverId:+(id as string),
            conversationId:+(converId as string)
        })
        setMessage("")
    }
    
    return (
        <div className="h-14 bg-white dark:bg-inputDark px-4 flex gap-3 items-center relative rounded-b-md">
            <form onSubmit={onSubmit} className="w-full h-full flex">
                <div className="w-full h-full">
                    <input type="text" value={message} onChange={(e)=>setMessage(e.target.value)} required name="text" id="text" placeholder="اكتب الرسالة هنا" className="outline-none h-full w-full dark:bg-inputDark dark:text-white" />
                </div>
                <div className="flex items-center">
                    <button className="">
                        <SendHorizontal size={25} className="text-buttonsColor rotate-180"/>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SendMessage;
