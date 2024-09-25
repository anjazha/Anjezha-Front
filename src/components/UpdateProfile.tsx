import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store/store";
import { useState } from "react";
import image from "../assets/default-user-image.jpg"
import { updatePicture, updateProfile } from "../functions/updateProfile";

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
        console.log(data);
        console.log(img);
        updateProfile(data,dispatch)
        if(img){
            updatePicture({profile_picture:img})
        }
        setLoad(false);
    }
    return (
        <div className="">
            <form action="" onSubmit={handleSubmit(onSubmit)} className="flex justify-center">
                <div className="flex flex-col w-full bg-[#D4CDA6] gap-6 border border-gray-400 rounded-md sm:pl-5 sm:flex-row sm:w-fit">
                    <div className="p-3 px-5 bg-navColor border border-gray-400 rounded-md">
                        <h1 className="mb-4 text-2xl font-bold">ملفك الشخصي</h1>
                        <div>
                            <h1 className="text-xl font-bold">الصورة</h1>
                            <div className="flex justify-center my-3">
                                <img
                                    src={
                                    img
                                        ? URL.createObjectURL(img)
                                        : user?.profile_picture || image
                                    }
                                    className="w-32 rounded-full aspect-square inline-block m-auto"
                                ></img>
                            </div>
                            <div className="flex justify-center pb-2">
                                <label
                                    htmlFor="file"
                                    className="p-2 px-3 font-bold text-white bg-buttonsColor rounded-md cursor-pointer"
                                >
                                    اختار صورة
                                </label>
                                <input
                                    type="file"
                                    onChange={(e) => setImg(e.target.files?.item(0))}
                                    defaultValue=""
                                    name="profileImage"
                                    id="file"
                                    className="hidden"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between gap-5 px-5 py-3 sm:px-0">
                        <div>
                            <h1 className="mb-4 text-2xl font-bold">
                                معلومات الحساب
                            </h1>
                            <div className="sm:w-[360px] flex flex-col sm:flex-row  sm:justify-between mb-3">
                                <label htmlFor="name" className="text-lg font-bold">
                                    الاسم
                                </label>
                                <div className="w-full sm:w-[250px]">
                                    <input
                                    type="text"
                                    {...register("name")}
                                    defaultValue={user.name}
                                    id="name"
                                    className="w-full px-2 h-8 border rounded border-gray-400 outline-none bg-inputColor"
                                    />
                                </div>
                            </div>
                            <div className="sm:w-[360px] flex flex-col sm:flex-row  sm:justify-between mb-3">
                                <label htmlFor="email" className="text-lg font-bold">
                                    الايميل
                                </label>
                                <input
                                    type="email"
                                    {...register("email")}
                                    defaultValue={user.email}
                                    id="email"
                                    className="w-full px-2 h-8 border rounded border-gray-400 outline-none bg-inputColor sm:w-[250px]"
                                />
                            </div>
                            <div className="sm:w-[360px] flex flex-col sm:flex-row  sm:justify-between">
                                <label htmlFor="phone" className="text-lg font-bold">
                                    رقم التلفون
                                </label>
                                <div className="w-full sm:w-[250px]">
                                    <input
                                    type="text"
                                    {...register("phone_number")}
                                    defaultValue={user.phone_number}
                                    id="phone"
                                    className="w-full px-2 h-8 border rounded border-gray-400 outline-none bg-inputColor"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-end">
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
                    </div>
                </div>
            </form>
        </div>
    );
}

export default UpdateProfile;
