import toast from "react-hot-toast";
import { axiosInstance, cookie } from "./axiosInstance"
import Swal from "sweetalert2";
import { NavigateFunction } from "react-router-dom";

export const deleteMyAccount = (myUrl: NavigateFunction,setLoading: React.Dispatch<React.SetStateAction<boolean>>)=>{
    Swal.fire({
        title: "هل انت متاكد ؟",
        text: "انت علي وشك حذف هذا الايميل!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "نعم",
        cancelButtonText: "لا"
    }).then((result) => {
        if (result.isConfirmed) {
            axiosInstance.delete('/profile',{
                headers:{
                    "Authorization":`Bearer ${cookie.get("token")}`,
                    "Content-Type":"application/json"
                }
            })
            .then(res=>{
                console.log(res);
                cookie.remove('token');
                toast.success("تم حذف الايميل بنجاح")
                myUrl('/login')
            })
            .catch(err=>{
                console.log(err);
                toast.error("حدث خطأ أثناء حذف الايميل")
            })
        }
    })
    .finally(() => setLoading(false));
}