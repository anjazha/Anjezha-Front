import { LogOut, MessageCircleMore, Settings } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store/store";
import Cookie from "cookie-universal";
import { deleteUser } from "../store/Slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { deleteTasker } from "../store/Slices/taskerSlice";
import useClickOutside from "../functions/useClickOutside";

const UserDialog = () => {
  const user = useSelector((state: RootState) => state.user);
  const [display, setDisplay] = useState("hidden");
  // ref to access the html element
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  // use the click outside hook to hide the element when clicks outside it
  useClickOutside(wrapperRef, () => setDisplay("hidden"));

  const cookie = Cookie();
  const dispatch = useAppDispatch();
  const myUrl = useNavigate();
  const Logout = () => {
    cookie.remove("token");
    dispatch(deleteUser());
    dispatch(deleteTasker());
    myUrl("/login");
  };
  // console.log(user);
  return (
    <div ref={wrapperRef} className="flex relative items-center flex-row-reverse gap-2">
      <div
        onClick={() =>
          setDisplay((prev) => (prev === "block" ? "hidden" : "block"))
        }
        className="h-fit w-fit cursor-pointer"
      >
        <span className="inline-block p-[10px] py-1 rounded-full bg-buttonsColor text-white font-bold">
          {user.name[0].toUpperCase()}
        </span>
      </div>
      <div
        className={`${display} absolute top-full mt-2 z-40 left-0 w-[150px] p-2 rounded-md shadow-xl border bg-white dark:bg-inputDark`}
      >
        <div
          onClick={() => myUrl("/profile")}
          className="w-full flex border-b items-center gap-2 hover:bg-slate-200 dark:hover:bg-[#65676b] p-2 rounded-md cursor-pointer"
        >
          <span className="inline-block rounded-full text-buttonsColor dark:text-[#0866ff] font-bold">
            <Settings />
          </span>
          <span className="font-semibold text-inputDark dark:text-bodyColor">
            الاعدادات
          </span>
        </div>
        <div
          onClick={() => myUrl("/chats")}
          className="w-full border-b flex items-center gap-2 hover:bg-slate-200 dark:hover:bg-[#65676b] p-2 rounded-md cursor-pointer"
        >
          <span className="inline-block rounded-full text-buttonsColor dark:text-[#0866ff] font-bold">
            <MessageCircleMore />
          </span>
          <span className="font-semibold text-inputDark dark:text-bodyColor">
            الرسائل
          </span>
        </div>
        <div
          onClick={() => Logout()}
          className="w-full flex items-center gap-2 hover:bg-slate-200 dark:hover:bg-[#65676b] p-2 rounded-md cursor-pointer"
        >
          <span className="inline-block rounded-full text-buttonsColor dark:text-[#0866ff] font-bold">
            <LogOut size={23} />
          </span>
          <span className="font-semibold text-inputDark dark:text-bodyColor">
            خروج
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserDialog;
