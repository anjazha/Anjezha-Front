import { useSelector } from "react-redux";
import { RootState} from "../store/store";
import Spinner from "../components/Spinner";
import UpdateProfile from "../components/UpdateProfile";

const Profile = () => {
    const user = useSelector((state:RootState) => state.user);
    return (
        <div className="flex items-center justify-center py-10">
            <div className="container">
                {user.email ? (
                <div className="">
                    <UpdateProfile />
                    {/* <UpdatePassword/> */}
                </div>
                ) : (
                <Spinner />
                )}
            </div>
            </div>
    );
}

export default Profile;
