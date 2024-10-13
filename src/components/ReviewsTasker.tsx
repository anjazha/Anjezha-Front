import { useEffect, useState } from "react";
import { getReviewsTasker } from "../functions/getReviewsTasker";
import AddReview from "./AddReview";
import Spinner from "./Spinner";
import image from "../assets/default-user-image.jpg";
import UpdateADeleteReview from "./UpdateADeleteReview";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface user {
    id:string;
    email:string;
    name:string;
    phoneNumber:string;
    profilePicture:string;
}

export interface reviewsTypes {
    id:string;
    review:string;
    rating:number;
    User:user;
    taskerId:string;
}

const ReviewsTasker = ({taskerId}:{taskerId:string | undefined}) => {
    const user = useSelector((state: RootState) => state.user);
    const [reviews, setReviews] = useState<reviewsTypes[] | null>(null);
    const [changes, setChanges] = useState(false);
    const [updateReview,setUpdateReview] = useState({
        id:"",
        review:"",
        rating:"",
    });
    useEffect(()=>{
        if(taskerId){
            getReviewsTasker(taskerId,setReviews)
        }
    },[taskerId,changes])
    return (
        <div>
            <AddReview data={updateReview} setUpdateReview={setUpdateReview} setChanges={setChanges}/>
            <div className="mt-5">
                {
                    reviews ? 
                        <>
                            {
                                reviews.length === 0 ? 
                                <div>
                                    <h2 className="text-lg font-semibold text-center dark:text-bodyColor">لا يوجد تقييمات بعد</h2>
                                </div>
                                :
                                <div className="flex flex-col gap-3">
                                    {
                                        [...reviews].reverse().map((item, index) => (
                                            <div key={index} className="relative flex gap-3 p-3 rounded-md shadow-md bg-bodyColor dark:bg-bodyDark">
                                                <div>
                                                    <img src={item.User.profilePicture || image} alt="user image" className="w-10 h-10 border rounded-full" />
                                                </div>
                                                <div>
                                                    <h2 className="m-0 font-semibold dark:text-bodyColor">{item.User.name}</h2>
                                                    <p className="flex items-center gap-1 m-0 text-xl text-yellow-500">{item.rating} 
                                                        <svg className="w-4 h-4 text-yellow-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                                        </svg>
                                                    </p>
                                                    <p className="m-0 dark:text-bodyColor">
                                                        {item.review}
                                                    </p>
                                                </div>
                                                {
                                                    item.User.email === user.email &&
                                                    <UpdateADeleteReview review={{id:item.id,review:item.review,rating:`${item.rating}`}} 
                                                        setChanges={setChanges} 
                                                        setUpdateReview={setUpdateReview}
                                                    />
                                                }
                                            </div>
                                        ))
                                    }
                                </div>
                            }
                        </>
                    : (
                        <Spinner />
                    )
                }
            </div>
        </div>
    );
}

export default ReviewsTasker;
