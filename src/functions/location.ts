import toast from "react-hot-toast";

export const derminLocation = ()=>{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                localStorage.setItem("latitude", position.coords.latitude.toString())
                localStorage.setItem("longitude", position.coords.longitude.toString())
                // console.log(position.coords)
            },
            // () => {
            //     toast.error("من فضلك اسمح بتحديد الموقع لسهولة ايجادك من قبل المستخدمين")
            // }
        );
    }else {
        toast.error("هذا المتصفح لا يدعم تحديد الموقع من فضلك انتقل الي متصفح اخر")
    }
}