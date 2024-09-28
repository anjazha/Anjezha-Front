import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { updatePassword } from "../functions/updatePassword";

interface formData {
    oldPassword: string;
    newPassword: string;
}

const UpdatePassword = () => {
    const {register,handleSubmit,formState:{errors}} = useForm<formData>()
    const [load, setLoad] = useState(false);
    const [changePass, setPass] = useState("password");
    const [changePassNew, setPassNew] = useState("password");
    const onSubmit = (data:formData)=>{
        setLoad(true);
        // console.log(data);
        updatePassword(data,setLoad);
    }
    return (
        <div className="w-full mt-10 sm:w-[500px] mx-auto">
        <h1 className="mb-4 text-2xl font-extrabold text-center dark:text-bodyColor">تعديل كلمة المرور</h1>
        <div className="border rounded-lg p-6 shadow-lg bg-lightBg dark:bg-darkBg">
            <form onSubmit={handleSubmit(onSubmit)} action="">
                <div>
                    <label htmlFor="oldPassword" className="text-base font-bold dark:text-bodyColor">كلمة المرور السابقة</label>
                    <div className="flex items-center justify-between w-full h-10 px-3 mt-1 rounded-md bg-inputColor border border-gray-300 shadow-sm focus-within:border-primary transition duration-300 ease-in-out">
                        <input 
                            type={changePass} 
                            {...register("oldPassword", { required: true })} 
                            id="oldPassword" 
                            className="w-full h-full bg-transparent rounded outline-none text-base dark:text-bodyColor" 
                        />
                        <div onClick={() => setPass(changePass === "password" ? "text" : "password")} className="cursor-pointer">
                            <EyeOff size={16} className={`${changePass === "password" ? "block" : "hidden"} text-gray-600`} />
                            <Eye size={16} className={`${changePass === "password" ? "hidden" : "block"} text-gray-600`} />
                        </div>
                    </div>
                    {errors.oldPassword?.type === "required" && <p className="text-red-500 text-sm animate-bounce">من فضلك ادخل كلمة المرور السابقة</p>}
                </div>
                <div className="mt-4">
                    <label htmlFor="newPassword" className="text-base font-bold dark:text-bodyColor">كلمة المرور الجديدة</label>
                    <div className="flex items-center justify-between w-full h-10 px-3 mt-1 rounded-md bg-inputColor border border-gray-300 shadow-sm focus-within:border-primary transition duration-300 ease-in-out">
                        <input 
                            type={changePassNew} 
                            {...register("newPassword", { required: true })} 
                            id="newPassword" 
                            className="w-full h-full bg-transparent rounded outline-none text-base dark:text-bodyColor" 
                        />
                        <div onClick={() => setPassNew(changePassNew === "password" ? "text" : "password")} className="cursor-pointer">
                            <EyeOff size={16} className={`${changePassNew === "password" ? "block" : "hidden"} text-gray-600`} />
                            <Eye size={16} className={`${changePassNew === "password" ? "hidden" : "block"} text-gray-600`} />
                        </div>
                    </div>
                    {errors.newPassword?.type === "required" && <p className="text-red-500 text-sm animate-bounce">من فضلك ادخل كلمة المرور الجديدة</p>}
                </div>
                <div className="flex items-center justify-end mt-6">
                    <button
                        type="submit"
                        disabled={load}
                        className="p-2 px-6 font-bold text-white bg-buttonsColor rounded-lg shadow-md hover:bg-primaryDark transition duration-300 ease-in-out focus:outline-none"
                    >
                        {load ? (
                            <div className="flex items-center gap-1">
                                <span className="inline-block w-4 h-4 border-2 border-white rounded-full border-l-gray-500 animate-spin"></span>
                            </div>
                        ) : (
                            "حفظ"
                        )}
                    </button>
                </div>
            </form>
        </div>
    </div>
    
    );
}

export default UpdatePassword;