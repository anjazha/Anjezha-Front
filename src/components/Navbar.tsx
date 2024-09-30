/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useNavigate } from "react-router-dom";
import { AlignJustify, Moon, Sun, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "../store/store";
import Cookie from "cookie-universal";
import { getUser } from "../functions/getUser";
import { useSelector } from "react-redux";
import UserDialog from "./UserDialog";
import { derminLocation } from "../functions/location";

const Navbar = () => {
  const user = useSelector((state: RootState) => state.user);
  const [mode, setMode] = useState("light");
  const [isNavOpen, setIsNavOpen] = useState(false);

  console.log(isNavOpen);
  const changeMode = () => {
    localStorage.mode = mode === "light" ? "dark" : "light"
    setMode(mode === "light" ? "dark" : "light");
    document.querySelector("html")?.classList.toggle("dark");
  };
  const dispatch = useAppDispatch();
  const cookie = Cookie().get("token");
  const myUrl = useNavigate();
  useEffect(() => {
    if (cookie) {
      getUser(dispatch, myUrl);
      derminLocation();
    }
  }, [cookie]);
  useEffect(()=>{
    if(localStorage.mode === "dark"){
      document.querySelector("html")?.classList.add("dark")
      setMode("dark")
    }
    else{
      document.querySelector("html")?.classList.remove("dark")
      setMode("light")
    }
  },[])
  return (
    <div className="sticky top-0 z-50 shadow-lg py-4 bg-bodyColor dark:bg-inputDark text-inputDark dark:text-bodyColor">
      <div className="container mx-auto flex justify-between items-center px-5 md:px-10">
        {/* Mobile Menu Toggle */}
        <div className="md:hidden cursor-pointer">
          <div onClick={() => setIsNavOpen(!isNavOpen)}>
            {isNavOpen ? (
              <XIcon className="w-6 h-6" />
            ) : (
              <AlignJustify className="w-6 h-6" />
            )}
          </div>
        </div>

        {/* Navigation Links */}
        <div
          className={`fixed z-50 ${
            isNavOpen ? "right-0 shadow-md" : "right-[-100%]"
          }  h-full w-[300px] bg-bodyColor dark:bg-inputDark text-inputDark dark:text-bodyColor p-5 top-20 transition-all duration-500 md:static md:flex md:items-center md:gap-10 md:bg-transparent md:w-auto md:p-0`}
        >
          <ul className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:gap-4 font-semibold">
            <li>
              <Link to="/" className="hover:text-indigo-600">
                الصفحة الرئيسية
              </Link>
            </li>
            <li>
              <Link to="/categories" className="hover:text-indigo-600">
                الفئات
              </Link>
            </li>
            <li>
              <Link to="" className="hover:text-indigo-600">
                تصفح المهام
              </Link>
            </li>
            {cookie ? (
              <>
                <li className="px-4 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-700">
                  <Link to="/createPost">نشر مهمة</Link>
                </li>
                <li className="px-4 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-700">
                  <Link to="/becomeTasker">اصبح عامل</Link>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login" className="hover:text-indigo-600">
                  تسجيل الدخول
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* Dark Mode & User Avatar */}
        <div className="flex items-center gap-4">
          {/* Dark/Light Mode Toggle */}
          <div onClick={changeMode} className="cursor-pointer">
            {mode === "light" ? (
              <Moon className="text-inputDark dark:text-bodyColor w-6 h-6" />
            ) : (
              <Sun className="text-inputDark dark:text-bodyColor w-6 h-6" />
            )}
          </div>

          {/* User Avatar */}
          {cookie && user?.email && <UserDialog />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
