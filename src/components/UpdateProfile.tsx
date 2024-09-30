import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store/store";
import { useState } from "react";
import image from "../assets/default-user-image.jpg"
import { updatePicture, updateProfile } from "../functions/updateProfile";
import UpdatePassword from "./UpdatePassword";

interface formData {
    name: string;
    email: string;
    phone_number: string;
}

const UpdateProfile = () => {
    const {register,handleSubmit} = useForm<formData>();
    const user = useSelector((state:RootState) => state.user);
    const [load, setLoad] = useState(false);
    const [img, setImg] = useState<File | null | undefined>(null);
    const dispatch = useAppDispatch()
    const onSubmit = (data:formData)=>{
        setLoad(true);
        // console.log(data);
        // console.log(img);
        updateProfile(data,dispatch,setLoad)
        if(img){
            updatePicture({profilePicture:img})
        }
    }
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-inputDark rounded-lg py-10 px-4 flex flex-col justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl border w-full bg-white dark:bg-bodyDark shadow-md rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 md:gap-8">
            
            {/* Profile Section */}
            <div className="col-span-1 md:w-full">
              <div className="bg-indigo-600 dark:bg-inputDark text-white p-6 rounded-lg text-center">
                <h2 className="text-xl font-bold mb-4 dark:text-bodyColor">ملفك الشخصي</h2>
                <div className="flex justify-center mb-4">
                  <img
                    src={img ? URL.createObjectURL(img) : user?.profilePicture || image}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-white shadow-md"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="file" className="cursor-pointer bg-white text-indigo-600 py-2 px-4 rounded-lg font-semibold">
                    اختار صورة
                  </label>
                  <input
                    type="file"
                    onChange={(e) => setImg(e.target.files?.item(0))}
                    name="profileImage"
                    id="file"
                    className="hidden"
                  />
                </div>
              </div>
            </div>
      
            {/* Account Information Section */}
            <div className="col-span-2">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-700 dark:text-bodyColor mb-4">معلومات الحساب</h2>
      
                  {/* Name Input */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-600 dark:text-bodyColor  mb-2">الاسم</label>
                      <input
                        type="text"
                        {...register("name")}
                        defaultValue={user.name}
                        id="name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                      />
                    </div>
      
                    {/* Email Input */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-600 dark:text-bodyColor  mb-2">البريد الإلكتروني</label>
                      <input
                        type="email"
                        {...register("email")}
                        defaultValue={user.email}
                        id="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                      />
                    </div>
                  </div>
      
                  {/* Phone Input */}
                  <div className="mt-4">
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-600 dark:text-bodyColor  mb-2">رقم الهاتف</label>
                    <input
                      type="text"
                      {...register("phone_number")}
                      defaultValue={user.phone_number}
                      id="phone"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>
                </div>
      
                {/* Save Button */}
                <div className="text-right">
                  <button
                    type="submit"
                    disabled={load}
                    className="bg-indigo-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out"
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
            </div>
          </div>
        </form>
        <UpdatePassword/>
      </div>
      
      
    );
}

export default UpdateProfile;
