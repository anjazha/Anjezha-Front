import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../functions/register";

interface dataType {
    name:string,
    email:string,
    password:string,
    phoneNumber:string
}

const Register = () => {
    const {register,handleSubmit,formState:{errors}} = useForm<dataType>()
    const [changePass,setPass] = useState("password")
    const myUrl = useNavigate()
    const [loading,setLoading] = useState(false)
    const onSubmit = (data:dataType) => {
        setLoading(true)
        // console.log(data);
        registerUser(data,myUrl,setLoading)
    }
    return (
        <div className="flex justify-center py-5">
            <div className="container z-30 flex flex-col items-center">
                <h1 className="text-xl font-bold text-center text-navColor dark:text-bodyColor">انشاء حساب</h1>
                <div className="bg-bodyColor dark:bg-inputDark shadow-md p-3 py-4 rounded-xl w-full sm:w-[400px] mt-3">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor="name" className="text-gray-700 dark:text-gray-300">الاسم</label><br/>
                            <input type="text" {...register("name",{required:true})} id="name" className="w-full h-10 p-2 mt-1 rounded border border-gray-300 dark:border-gray-600 outline-none bg-inputColor dark:bg-inputDark dark:text-gray-200" />
                            {errors.name?.type==="required" && <p className="text-sm text-red-500 animate-bounce">من فضلك ادخل الاسم</p>}
                        </div>
                        <div className="mt-4">
                            <label htmlFor="email" className="text-gray-700 dark:text-gray-300">الايميل</label><br/>
                            <input type="email" {...register("email",{required:true})} id="email" className="w-full h-10 p-2 mt-1 rounded border border-gray-300 dark:border-gray-600 outline-none bg-inputColor dark:bg-inputDark dark:text-gray-200" />
                            {errors.email?.type==="required" && <p className="text-sm text-red-500 animate-bounce">من فضلك ادخل الايميل</p>}
                        </div>
                        <div className="mt-4">
                            <label htmlFor="pass" className="text-gray-700 dark:text-gray-300">كلمة المرور</label><br/>
                            <div className="flex items-center justify-between w-full h-10 p-2 mt-1 rounded border border-gray-300 dark:border-gray-600 bg-inputColor dark:bg-inputDark dark:text-gray-200">
                                <input type={changePass} {...register("password",{required:true})} id="pass" className="w-full h-full bg-transparent rounded outline-none" />
                                <div onClick={()=>setPass(changePass==="password" ? "text" : "password")} className="cursor-pointer">
                                    <EyeOff size={16} className={`${changePass==="password" ? "block" : "hidden"}`}/>
                                    <Eye size={16} className={`${changePass==="password" ? "hidden" : "block"}`}/>
                                </div>
                            </div>
                            {errors.password?.type==="required" && <p className="text-sm text-red-500 animate-bounce">من فضلك ادخل كلمة المرور</p>}
                        </div>
                        <div className="mt-4">
                            <label htmlFor="phone" className="text-gray-700 dark:text-gray-300">رقم التلفون</label><br/>
                            <input type="number" {...register("phoneNumber",{required:true})} id="phone" className="w-full h-10 p-2 mt-1 rounded border border-gray-300 dark:border-gray-600 outline-none bg-inputColor dark:bg-inputDark dark:text-gray-200" />
                            {errors.phoneNumber?.type==="required" && <p className="text-sm text-red-500 animate-bounce">من فضلك ادخل رقم التلفون</p>}
                        </div>
                        <div className="flex justify-center mt-4">
                            <button disabled={loading} className="w-full p-2 py-1 text-white rounded bg-buttonsColor">
                                {
                                    loading ? 
                                    <div className="flex justify-center items-center">
                                        <span className="inline-block w-5 h-5 rounded-full border border-black border-l-[#D4CDA6] animate-spin"></span>
                                    </div>
                                    :"انشاء"
                                }
                            </button>
                        </div>
                    </form>
                </div>
                <div className="mt-4 font-bold text-center dark:text-bodyColor">
                    <p>لديك حساب ؟ <Link to={"/login"} className="underline text-navColor">سجل الان</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Register;
