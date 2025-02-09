import { MessageCircleMore, XIcon } from "lucide-react";
import Spinner from "./Spinner";
import { useEffect, useState } from "react";
import { getConversationByUserId } from "../functions/getConversationByUserId";
import { conversationType } from "../pages/Chats";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store/store";
import defaultImage from "../assets/default-user-image.jpg"
import { addUserChat } from "../store/Slices/userChat";

const SidebarChats = () => {
    const user = useSelector((state:RootState)=>state.user)
    const onlineUsers = useSelector((state:RootState)=>state.onlineUsers)
    const [conversation,setConversation] = useState<conversationType[] | null>(null)
    const myUrl = useNavigate()
    const [openChats,setChats] = useState("right-[-100%]")
    const dispatch = useAppDispatch()
    useEffect(()=>{
        if(user.id){
            // get user messages
            getConversationByUserId(user.id,setConversation)
        }
    },[user.id])
    const goToChat = (ele:conversationType)=>{
        if(ele.receiver.receiverId === +user.id){
            dispatch(addUserChat({id:ele.sender.senderId,name:ele.sender.name,profilePicture:ele.sender.profilePicture}))
            myUrl(`/chats/userChat/${ele.sender.senderId}`)
        }
        else{
            dispatch(addUserChat({id:ele.receiver.receiverId,name:ele.receiver.name,profilePicture:ele.receiver.profilePicture}))
            myUrl(`/chats/userChat/${ele.receiver.receiverId}`)
        }
    }
    return (
        <div>
            <div onClick={()=>setChats("right-0")} className="p-2 rounded-md shadow-md cursor-pointer md:hidden dark:bg-inputDark w-fit h-fit dark:text-bodyColor">
                        <MessageCircleMore/>
                    </div>
                    {/* Sidebar chats */}
                    <div className={`w-[250px] fixed top-[85px] ${openChats} duration-500 z-20 border border-navColor md:border-0 md:top-0 md:right-0 md:relative py-3 h-[calc(100vh-18vh)] overflow-y-auto bg-[#D9D9D9] dark:bg-inputDark rounded-md shadow-lg`}>
                        <div onClick={()=>setChats("right-[-100%]")} className="absolute cursor-pointer top-2 md:hidden left-2 hover:text-buttonsColor dark:text-bodyColor">
                            <XIcon size={28}/>
                        </div>
                        <h1 className="font-semibold block text-lg px-3 mt-5 md:mt-0 mb-2 duration-500 hover:text-buttonsColor text-darkColor dark:text-bodyColor text-ellipsis line-clamp-1">الدردشات</h1>
                        <div className="p-1">
                            {
                                conversation ? 
                                <>
                                    {
                                        conversation.length === 0 ?
                                        <h2 className="text-center dark:text-bodyColor mt-5">لا يوجد دردشات</h2>
                                        :
                                        <div>
                                            {
                                                conversation.map((ele,i)=>(
                                                    <div key={i} onClick={()=>goToChat(ele)} 
                                                        className="flex relative p-2 gap-2 items-center rounded-md hover:bg-slate-200 dark:hover:bg-[#65676b] cursor-pointer">
                                                        <img src={`${ele.receiver.receiverId === +user.id ? ele.sender.profilePicture || defaultImage : ele.receiver.profilePicture || defaultImage}` } alt="user image" className="w-12 h-12 rounded-full"/>
                                                        <div className="flex-1 flex justify-between items-center">
                                                            <div>
                                                                <h2 className="text-darkColor mb-1 dark:text-bodyColor font-semibold">{ele.receiver.receiverId === +user.id ? ele.sender.name : ele.receiver.name}</h2>
                                                                {/* <p className="text-sm text-darkColor dark:text-bodyColor text-ellipsis line-clamp-1">Hello Abdo Ahmed</p> */}
                                                            </div>
                                                            {/* <div className="p-[9px] py-[2px] text-bodyColor bg-buttonsColor rounded-full">
                                                                1
                                                            </div> */}
                                                        </div>
                                                        {
                                                            ele.receiver.receiverId === +user.id &&
                                                            onlineUsers.find((item)=>+item[0]===ele.sender.senderId) &&
                                                            <span className="block absolute top-3 right-2 w-2 h-2 rounded-full bg-green-500"></span>
                                                        }
                                                        {
                                                            ele.sender.senderId === +user.id &&
                                                            onlineUsers.find((item)=>+item[0]===ele.receiver.receiverId) &&
                                                            <span className="block absolute top-3 right-2 w-2 h-2 rounded-full bg-green-500"></span>
                                                        }
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    }
                                </>
                                :<Spinner/>
                            }
                        </div>
                    </div>
        </div>
    );
}

export default SidebarChats;
