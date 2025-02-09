import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../functions/login";
import Spinner from "../components/Spinner";

interface dataType {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<dataType>();
  const [changePass, setPass] = useState("password");
  const myUrl = useNavigate();
  const [loading, setLoading] = useState(false);
  const onSubmit = (data: dataType) => {
    setLoading(true);
    // console.log(data);
    loginUser(data, myUrl, setLoading);
  };
  return (
    <div className="flex justify-center py-5">
      <div className="container z-30 flex flex-col items-center">
        <h1 className="text-xl font-bold text-center text-navColor dark:text-bodyColor">
          تسجيل دخول
        </h1>
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
            <div className="mt-4">
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
                //   <div className="flex justify-center items-center">
                //     <span className="inline-block w-5 h-5 rounded-full border border-black border-l-[#D4CDA6] animate-spin"></span>
                //   </div>
                <Spinner/>
                ) : (
                  "تسجيل"
                )}
              </button>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="rem" className="dark:bg-gray-700" />
                <label
                  htmlFor="rem"
                  className="text-gray-700 dark:text-gray-300"
                >
                  تذكرني
                </label>
              </div>
              <div>
                <Link
                  to={"/forgetPassword"}
                  className="underline text-navColor dark:text-bodyColor"
                >
                  هل نسيت كلمة المرور؟
                </Link>
              </div>
            </div>
          </form>
        </div>
        <div className="mt-4 font-bold text-center text-gray-700 dark:text-gray-300">
          <p>
            ليس لديك حساب ؟{" "}
            <Link
              to={"/verifyEmail"}
              className="underline text-navColor dark:text-bodyColor"
            >
              انشئ حساب
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
