/* eslint-disable @typescript-eslint/no-explicit-any */
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Register = () => {
    const {register,handleSubmit,formState:{errors}} = useForm()
    const [changePass,setPass] = useState("password")
    const onSubmit = (data:any) => {
        console.log(data);
    }
    return (
        <div className="flex justify-center py-5">
            <div className="container flex flex-col items-center z-40">
                <h1 className="font-bold text-xl text-center dark:text-bodyColor">انشاء حساب</h1>
                <div className="bg-[#D4CDA6] p-3 py-4 rounded-xl w-full sm:w-[400px] mt-3">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor="name">الاسم</label><br/>
                            <input type="text" {...register("username",{required:true})} id="name" className="w-full h-8 rounded mt-1 bg-inputColor outline-none p-2 " />
                            {errors.username?.type==="required" && <p className="text-red-500 text-sm animate-bounce">من فضلك ادخل الاسم</p>}
                        </div>
                        <div className="mt-4">
                            <label htmlFor="email">الايميل</label><br/>
                            <input type="email" {...register("email",{required:true})} id="email" className="w-full h-8 rounded mt-1 bg-inputColor outline-none p-2 " />
                            {errors.email?.type==="required" && <p className="text-red-500 text-sm animate-bounce">من فضلك ادخل الايميل</p>}
                        </div>
                        <div className="mt-4">
                            <label htmlFor="pass">كلمة المرور</label><br/>
                            <div className="w-full h-8 rounded mt-1 bg-inputColor flex justify-between items-center px-2">
                                <input type={changePass} {...register("password",{required:true})} id="pass" className="h-full w-full outline-none rounded bg-transparent" />
                                <div onClick={()=>setPass(changePass==="password" ? "text" : "password")} className="cursor-pointer">
                                    <EyeOff size={16} className={`${changePass==="password" ? "block" : "hidden"}`}/>
                                    <Eye size={16} className={`${changePass==="password" ? "hidden" : "block"}`}/>
                                </div>
                            </div>
                            {errors.password?.type==="required" && <p className="text-red-500 text-sm animate-bounce">من فضلك ادخل كلمة المرور</p>}
                        </div>
                        <div className="mt-4">
                            <label htmlFor="phone">رقم التلفون</label><br/>
                            <input type="number" {...register("phone",{required:true})} id="phone" className="w-full h-8 rounded mt-1 bg-inputColor outline-none p-2 " />
                            {errors.phone?.type==="required" && <p className="text-red-500 text-sm animate-bounce">من فضلك ادخل رقم التلفون</p>}
                        </div>
                        <div className="flex justify-center mt-4">
                            <button className="bg-buttonsColor p-2 py-1 w-full text-white rounded">انشاء</button>
                        </div>
                    </form>
                </div>
                <div className="text-center mt-4 font-bold dark:text-bodyColor">
                    <p>لديك حساب ؟ <Link to={"/login"} className="underline">سجل الان</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Register;
