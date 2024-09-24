/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useNavigate } from "react-router-dom";
import image from "../assets/logo.png"
import { AlignJustify, Moon, Sun, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "../store/store";
import Cookie from "cookie-universal"
import { getUser } from "../functions/getUser";
import { useSelector } from "react-redux";
import UserDialog from "./UserDialog";
import { derminLocation } from "../functions/location";

const Navbar = () => {
    const user = useSelector((state:RootState)=>state.user)
    const [disList, setList] = useState("-right-[100%]")
    const [mode, setMode] = useState("light")
    const changeMode = () => {
        setMode(mode === "light" ? "dark" : "light")
        document.querySelector("html")?.classList.toggle("dark")
    }
    const dispatch = useAppDispatch()
    const cookie = Cookie().get("token")
    const myUrl = useNavigate()
    useEffect(()=>{
        if(cookie){
            getUser(dispatch,myUrl)
            derminLocation()
        }
    },[cookie])
    return (
        <div className="relative flex justify-center py-7 rounded-b-3xl bg-navColor">
            <div className="container">
                <div>
                    <div onClick={() => setList(disList === "right-0" ? "-right-[100%]" : "right-0")} className="cursor-pointer md:hidden w-fit">
                        {
                            disList === "right-0" ? <XIcon /> : <AlignJustify />
                        }
                    </div>
                    <div className={`fixed z-50 ${disList} h-full w-[300px] duration-500 bg-[#D9D9D9] p-3 py-5 md:p-0 top-20 md:top-0 md:right-0 md:bg-transparent md:w-fit md:relative`}>
                        <ul className="flex flex-col items-center font-semibold list-none md:flex-row gap-7">
                            <li><Link to={"/"}>الصفحة الرئيسية</Link></li>
                            <li><Link to={"/categories"}>الفئات</Link></li>
                            <li><Link to={""}>تصفح المهام</Link></li>
                            {
                                cookie ? 
                                <>
                                    <li className="p-1 px-4 border border-black w-fit rounded-3xl bg-buttonsColor">
                                        <Link to={""}>
                                            نشر مهمة
                                        </Link>
                                    </li>
                                    <li className="p-1 px-4 border border-black w-fit rounded-3xl bg-buttonsColor">
                                        <Link to={"/becomeTasker"}>
                                            اصبح عامل
                                        </Link>
                                    </li>
                                </>
                                :
                                <li><Link to={"/login"}>تسجيل الدخول</Link></li>
                            }
                            
                        </ul>
                    
                    </div>
                    <div className="absolute z-40 flex items-center gap-2 -translate-y-1/2 cursor-pointer left-3 sm:left-10 icon top-1/2 md:left-36">
                        <div onClick={changeMode}>
                            {
                                mode === "light" ? <Moon className="cursor-pointer" /> : <Sun />
                            }
                        </div>
                        {
                            cookie && user.email &&
                            <UserDialog />
                        }
                    </div>
                </div>
                <div className="absolute hidden md:block top-[30%] left-5">
                    <img src={image} alt="logo" className="w-32 h-32 rounded-full" />
                </div>
            </div>
        </div>
    );
}

export default Navbar;