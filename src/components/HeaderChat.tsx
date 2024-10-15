import { XIcon } from "lucide-react";
import image from "../assets/default-user-image.jpg"
import { useNavigate } from "react-router-dom";

const HeaderChat = () => {
    const myUrl = useNavigate()
    return (
        <div className="bg-[#D9D9D9] dark:bg-inputDark sticky top-0 h-16 flex justify-between items-center rounded-t-md px-4">
            <div className="flex items-center gap-3">
                <div>
                    <img src={image} className="w-10 h-10 rounded-full" alt="" />
                </div>
                <div>
                    <h1 className="font-semibold dark:text-bodyColor">Abdo Ahmed</h1>
                    <p className="text-sm text-buttonsColor dark:text-bodyColor">
                        {/* {
                            typing ? "typing..." 
                            : onlineUsers.includes(receivedUser._id)? "online" : "offline"
                        } */}
                        offline
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
