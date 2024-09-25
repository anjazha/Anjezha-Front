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
            <h1 className="mb-4 text-xl font-bold">تعديل كلمة المرور</h1>
            <div className="border bg-[#D4CDA6] border-gray-400 rounded-md p-3">
                <form onSubmit={handleSubmit(onSubmit)} action="">
                    <div>
                        <label htmlFor="oldPassword" className="text-base font-bold">كلمة المرور السابقة</label>
                        <div className="flex items-center justify-between w-full h-8 px-2 mt-1 rounded bg-inputColor border border-gray-400">
                            <input type={changePass} {...register("oldPassword",{required:true})} id="oldPassword" className="w-full h-full bg-transparent rounded outline-none " />
                            <div onClick={()=>setPass(changePass==="password" ? "text" : "password")} className="cursor-pointer">
                                <EyeOff size={16} className={`${changePass==="password" ? "block" : "hidden"}`}/>
                                <Eye size={16} className={`${changePass==="password" ? "hidden" : "block"}`}/>
                            </div>
                        </div>
                        {errors.oldPassword?.type === "required" && <p className="text-red-500 text-sm animate-bounce">من فضلك ادخل كلمة المرور السابقة</p>}
                    </div>
                    <div className="mt-3">
                        <label htmlFor="newPassword" className="text-base font-bold">كلمة المرور الجديدة</label>
                        <div className="flex items-center justify-between w-full h-8 px-2 mt-1 rounded bg-inputColor border border-gray-400">
                            <input type={changePassNew} {...register("newPassword",{required:true})} id="newPassword" className="w-full h-full bg-transparent rounded outline-none " />
                            <div onClick={()=>setPassNew(changePassNew==="password" ? "text" : "password")} className="cursor-pointer">
                                <EyeOff size={16} className={`${changePassNew==="password" ? "block" : "hidden"}`}/>
                                <Eye size={16} className={`${changePassNew==="password" ? "hidden" : "block"}`}/>
                            </div>
                        </div>
                        {errors.newPassword?.type === "required" && <p className="text-red-500 text-sm animate-bounce">من فضلك ادخل كلمة المرور الجديدة</p>}
                    </div>
                    <div className="flex items-center justify-end mt-4">
                        <div>
                            <button
                                type="submit"
                                disabled={load}
                                className="p-1 px-4 font-bold text-white bg-buttonsColor border border-black rounded"
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
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdatePassword;