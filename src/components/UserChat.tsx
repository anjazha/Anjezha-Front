import { useEffect, useState } from "react";
import background from "../assets/wallapaper.jpeg"
import { conversationType } from "../pages/Chats";
import HeaderChat from "./HeaderChat";
import SendMessage from "./SendMessage";
import { useParams } from "react-router-dom";
import Messages from "./Messages";

const UserChat = ({conversation}:{conversation: conversationType[] | null}) => {
    console.log(conversation);
    const { id } = useParams()
    const [converId,setConverId] = useState<string | null>(null)
    useEffect(()=>{
        conversation?.map((ele)=> {
            if(ele.receiverId === +(id as string) || ele.senderId === +(id as string)) {
                setConverId(ele.conversationId)
            }
        })
    },[conversation,id])
    console.log(converId);
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
