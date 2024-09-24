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
        console.log(data);
        registerUser(data,myUrl,setLoading)
    }
    return (
        <div className="flex justify-center py-5">
            <div className="container z-30 flex flex-col items-center">
                <h1 className="text-xl font-bold text-center dark:text-bodyColor">انشاء حساب</h1>
                <div className="bg-[#D4CDA6] p-3 py-4 rounded-xl w-full sm:w-[400px] mt-3">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor="name">الاسم</label><br/>
                            <input type="text" {...register("name",{required:true})} id="name" className="w-full h-8 p-2 mt-1 rounded outline-none bg-inputColor " />
                            {errors.name?.type==="required" && <p className="text-sm text-red-500 animate-bounce">من فضلك ادخل الاسم</p>}
                        </div>
                        <div className="mt-4">
                            <label htmlFor="email">الايميل</label><br/>
                            <input type="email" {...register("email",{required:true})} id="email" className="w-full h-8 p-2 mt-1 rounded outline-none bg-inputColor " />
                            {errors.email?.type==="required" && <p className="text-sm text-red-500 animate-bounce">من فضلك ادخل الايميل</p>}
                        </div>
                        <div className="mt-4">
                            <label htmlFor="pass">كلمة المرور</label><br/>
                            <div className="flex items-center justify-between w-full h-8 px-2 mt-1 rounded bg-inputColor">
                                <input type={changePass} {...register("password",{required:true})} id="pass" className="w-full h-full bg-transparent rounded outline-none" />
                                <div onClick={()=>setPass(changePass==="password" ? "text" : "password")} className="cursor-pointer">
                                    <EyeOff size={16} className={`${changePass==="password" ? "block" : "hidden"}`}/>
                                    <Eye size={16} className={`${changePass==="password" ? "hidden" : "block"}`}/>
                                </div>
                            </div>
                            {errors.password?.type==="required" && <p className="text-sm text-red-500 animate-bounce">من فضلك ادخل كلمة المرور</p>}
                        </div>
                        <div className="mt-4">
                            <label htmlFor="phone">رقم التلفون</label><br/>
                            <input type="number" {...register("phoneNumber",{required:true})} id="phone" className="w-full h-8 p-2 mt-1 rounded outline-none bg-inputColor " />
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
                    <p>لديك حساب ؟ <Link to={"/login"} className="underline">سجل الان</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Register;
