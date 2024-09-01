import { Link } from "react-router-dom";
import image from "../assets/logo.png"
import { AlignJustify, Moon, Sun, XIcon } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
    const [disList, setList] = useState("-right-[100%]")
    const [mode, setMode] = useState("light")
    const changeMode = () => {
        setMode(mode === "light" ? "dark" : "light")
        document.querySelector("html")?.classList.toggle("dark")
    }
    return (
        <div className="relative flex justify-center py-7 rounded-b-3xl bg-navColor">
            <div className="container">
                <div>
                    <div onClick={() => setList(disList === "right-0" ? "-right-[100%]" : "right-0")} className="cursor-pointer sm:hidden w-fit">
                        {
                            disList === "right-0" ? <XIcon /> : <AlignJustify />
                        }
                    </div>
                    <div className={`fixed z-50 ${disList} h-full w-[300px] duration-500 bg-[#D9D9D9] p-3 py-5 sm:p-0 top-20 sm:top-0 sm:right-0 sm:bg-transparent sm:w-fit sm:relative`}>
                        <ul className="flex flex-col items-center font-semibold list-none sm:flex-row gap-7">
                            <li><Link to={""}>الفئات</Link></li>
                            <li><Link to={""}>تصفح المهام</Link></li>
                            <li><Link to={"/login"}>تسجيل الدخول</Link></li>
                            <li className="p-1 px-4 border border-black w-fit rounded-3xl bg-buttonsColor">
                                <Link to={""}>
                                    نشر مهمة
                                </Link>
                            </li>
                        </ul>
                    
                    </div>
                    <div className="flex items-center justify-center ">
                        <h1 className="text-5xl font-extrabold font-serif">أنجزها|Anjezha</h1>
                    </div>
                    <div onClick={changeMode} className="absolute z-40 -translate-y-1/2 cursor-pointer icon top-1/2 left-36">
                        {
                            mode === "light" ? <Moon className="cursor-pointer" /> : <Sun />
                        }
                    </div>
                </div>
                <div className="absolute top-[30%] left-5">
                    <img src={image} alt="logo" className="w-32 h-32 rounded-full" />
                </div>
            </div>
        </div>
    );
}

export default Navbar;