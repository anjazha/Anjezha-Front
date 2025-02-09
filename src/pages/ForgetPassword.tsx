import { useForm } from "react-hook-form";
import Spinner from "../components/Spinner";
import { useState } from "react";
import { forgetPassword } from "../functions/forgetPassword";

const ForgetPassword = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<{email:string}>();
    const [loading, setLoading] = useState(false);
    const onSubmit = (data: {email:string}) => {
        setLoading(true);
        console.log(data);
        forgetPassword(data,setLoading)
    }
    return (
        <div className="flex justify-center py-5">
            <div className="container flex justify-center">
                <div className="bg-bodyColor shadow-md p-4 rounded-xl w-full sm:w-[400px] mt-3 dark:bg-inputDark">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label
                                htmlFor="email"
                                className="text-gray-700 dark:text-gray-300"
                            >
                                الايميل
                            </label>
                            <br />
                            <input
                                type="email"
                                {...register("email", { required: true })}
                                id="email"
                                // dir="ltr"
                                className="w-full h-10 p-2 mt-1 rounded border border-gray-300 dark:border-gray-600 outline-none bg-inputColor dark:bg-inputDark dark:text-gray-200"
                            />
                            {errors.email?.type === "required" && (
                                <p className="text-sm text-red-500 animate-bounce">
                                من فضلك ادخل الايميل
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

export default ForgetPassword;
