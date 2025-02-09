import { XIcon } from "lucide-react";
import image from "../assets/default-user-image.jpg"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const HeaderChat = () => {
    const userChat = useSelector((state:RootState)=>state.userChat)
    const onlineUsers = useSelector((state:RootState)=>state.onlineUsers)
    const myUrl = useNavigate()
    // console.log(onlineUsers);
    const findonline = onlineUsers.find(ele=>ele[0]=== userChat.id)
    // console.log(findonline);
    return (
        <div className="bg-[#D9D9D9] dark:bg-inputDark sticky top-0 h-16 flex justify-between items-center rounded-t-md px-4">
            <div className="flex items-center gap-3">
                <div>
                    <img src={userChat.profilePicture || image} className="w-10 h-10 rounded-full" alt="" />
                </div>
                <div>
                    <h1 className="font-semibold dark:text-bodyColor">{userChat.name}</h1>
                    <p className="text-sm text-buttonsColor dark:text-bodyColor">
                        {/* {
                            typing ? "typing..." 
                            : onlineUsers.includes(receivedUser._id)? "online" : "offline"
                        } */}
                        {findonline? "online" : "offline"}
                    </p>
                </div>
            </div>
            <div>
                <XIcon size={25} onClick={()=>myUrl("/chats")} className="cursor-pointer dark:text-bodyColor duration-500 hover:text-buttonsColor"/>
            </div>
        </div>
    );
}

export default HeaderChat;
