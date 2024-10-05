import Swal from "sweetalert2";
import { axiosInstance, cookie } from "./axiosInstance";

export const deleteTaskById = (taskId: string,setChanges: React.Dispatch<React.SetStateAction<boolean>>)=>{
    Swal.fire({
        title: "هل انت متاكد ؟",
        text: "انت علي وشك حذف هذة المهمة!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "نعم",
        cancelButtonText: "لا"
    }).then((result) => {
        if (result.isConfirmed) {
            axiosInstance.delete(`/tasks/${taskId}`,{
                headers:{
                    'Authorization': `Bearer ${cookie.get('token')}`,
                    'Content-Type': 'application/json',
                }
            })
            .then((res) => {
                console.log(res);
                setChanges(true);
                Swal.fire({
                    title: "تم الحذف",
                    text: "تم حذف المهمة بنجاح.",
                    icon: "success"
                });
            })
            .catch((err)=>{
                console.log(err);
                Swal.fire({
                    title: "Error!",
                    text: "حدث خطأ أثناء حذف المهمة.",
                    icon: "error"
                });
            })
        }
    });
}