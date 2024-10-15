import { useEffect, useState } from "react";
import { getMessages } from "../functions/getMessages";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Spinner from "./Spinner";

export interface messages {
    changeStatusAt:string;
    conversationId:string;
    id:string;
    message:string;
    messageStatus:string;
    senderId:string;
    sentAt:string;
}

const Messages = ({converId}:{converId:string}) => {
    console.log(converId);
    const user = useSelector((state:RootState)=>state.user)
    const [messages, setMessages] = useState<messages[] | null>(null);
    useEffect(()=>{
        getMessages(converId,setMessages);
    },[converId])
    return (
        <div className="my-3">
            {
                messages ?
                <>
                    {
                        messages.map(msg=>(
                            <div key={msg.id}>
                                {msg.senderId === user.id ? 
                                <div className="flex bg-teal-100 w-fit shadow-md ml-2 p-1 px-2 rounded-md mr-auto items-end flex-col justify-end">
                                    <p>{msg.message}</p>
                                    <span className="text-sm text-start w-full">{new Date(msg.sentAt).getHours()}:{new Date(msg.sentAt).getMinutes()}</span>
                                </div>
                                : 
                                <div className="flex bg-white w-fit shadow-md p-1 px-2 rounded-md mr-2 flex-col">
                                    <p>{msg.message}</p>
                                    <span className="text-sm text-end w-full">{new Date(msg.sentAt).getHours()}:{new Date(msg.sentAt).getMinutes()}</span>
                                </div>
                                }
                            </div>
                        ))
                    }
                </>
                :<Spinner />
            }
        </div>
    );
}

export default Messages;
