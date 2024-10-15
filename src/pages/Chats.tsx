import { Route, Routes, useNavigate } from "react-router-dom";
import defaultImage from "../assets/default-user-image.jpg"
import UserChat from "../components/UserChat";
import { MessageCircleMore, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { getConversationByUserId } from "../functions/getConversationByUserId";
import Spinner from "../components/Spinner";

export interface conversationType {
    conversationId:string,
    senderId:number,
    receiverId:number,
    updateAt:string,
}

const Chats = ()=>{
    const user = useSelector((state:RootState)=>state.user)
    const [conversation,setConversation] = useState<conversationType[] | null>(null)
    const myUrl = useNavigate()
    const [openChats,setChats] = useState("right-[-100%]")
    useEffect(()=>{
        if(user.id){
            // get user messages
            getConversationByUserId(user.id,setConversation)
        }
    },[user.id])
    console.log(conversation);
    return (
        <div className="py-5 flex justify-center">
            <div className="container">
                <div className="flex gap-5 relative h-[calc(100vh-18vh)]">
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
                                                    <div key={i} onClick={()=>{
                                                            myUrl(`/chats/userChat/${ele.receiverId}`)
                                                        }} 
                                                        className="flex p-2 gap-2 items-center rounded-md hover:bg-slate-200 dark:hover:bg-[#65676b] cursor-pointer">
                                                        <img src={defaultImage} alt="user image" className="w-12 h-12 rounded-full"/>
                                                        <div className="flex-1 flex justify-between items-center">
                                                            <div>
                                                                <h2 className="text-darkColor mb-1 dark:text-bodyColor font-semibold">Abdo Ahmed</h2>
                                                                <p className="text-sm text-darkColor dark:text-bodyColor text-ellipsis line-clamp-1">Hello Abdo Ahmed</p>
                                                            </div>
                                                            <div className="p-[9px] py-[2px] text-bodyColor bg-buttonsColor rounded-full">
                                                                1
                                                            </div>
                                                        </div>
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
                    {/* Main Chat */}
                    <div className="flex-1">
                        <Routes>
                            <Route path="/" element={<>{defaultChat()}</>} />
                            <Route path="/userChat/:id" element={<UserChat conversation={conversation}/>} />
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