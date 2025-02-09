import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { resetPassword } from "../functions/resetPassword";

const ResetPassword = () => {
    const {token} = useParams()
    // console.log(token); 
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<{password:string}>();
    const [changePass, setPass] = useState("password");
    const [loading, setLoading] = useState(false);
    const myUrl = useNavigate()
    const onSubmit = (data: {password:string}) => {
        setLoading(true);
        // console.log(data);
        const allData = {password:data.password,token:token as string}
        if(token){
            resetPassword(allData,myUrl,setLoading)
        }
    }
    return (
        <div className="flex justify-center py-5">
            <div className="container flex justify-center">
                <div className="bg-bodyColor shadow-md p-4 rounded-xl w-full sm:w-[400px] mt-3 dark:bg-inputDark">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="">
                            <label
                                htmlFor="pass"
                                className="text-gray-700 dark:text-gray-300"
                            >
                                كلمة المرور
                            </label>
                            <br />
                            <div className="flex items-center justify-between w-full h-10 px-2 mt-1 rounded border border-gray-300 dark:border-gray-600 dark:text-gray-200 bg-inputColor dark:bg-inputDark">
                                <input
                                type={changePass}
                                {...register("password", { required: true })}
                                // dir="ltr"
                                id="pass"
                                className="w-full h-full bg-transparent rounded outline-none dark:text-gray-200"
                                />
                                <div
                                onClick={() =>
                                    setPass(changePass === "password" ? "text" : "password")
                                }
                                className="cursor-pointer"
                                >
                                <EyeOff
                                    size={16}
                                    className={`${
                                    changePass === "password" ? "block" : "hidden"
                                    }`}
                                />
                                <Eye
                                    size={16}
                                    className={`${
                                    changePass === "password" ? "hidden" : "block"
                                    }`}
                                />
                                </div>
                            </div>
                            {errors.password?.type === "required" && (
                                <p className="text-sm text-red-500 animate-bounce">
                                من فضلك ادخل كلمة المرور
                                </p>
                            )}
                        </div>
                        <div className="flex justify-center mt-4">
                            <button
                                disabled={loading}
                                className={`w-full p-2 py-1 ${loading?"border-b-2 border-buttonsColor":"bg-buttonsColor hover:bg-indigo-600 "} text-white rounded  transition duration-200`}              >
                                {loading ? (
                                <Spinner/>
                                ) : (
                                "ارسال"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;
