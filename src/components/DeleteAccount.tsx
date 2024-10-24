import { useState } from "react";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { deleteMyAccount } from "../functions/deleteAccount";

const DeleteAccount = () => {
    const [loading,setLoading] = useState(false)
    const myUrl = useNavigate()
    const deleteAccout = ()=>{
        setLoading(true)
        deleteMyAccount(myUrl,setLoading)
    }
    return (
        <div className="mt-8 flex justify-center">
            {
                loading ? <Spinner />
                :
                <button onClick={()=>deleteAccout()} disabled={loading} className="bg-red-500 hover:bg-red-600 p-2 px-3 text-white rounded-md">
                    حذف الايميل 
                </button>
            }
        </div>
    );
}

export default DeleteAccount;
