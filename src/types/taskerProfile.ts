
export interface taskerProfile {
    bidding:number | null;
    bio:string;
    id:string;
    latitude:string;
    longitude:string;
    pricing:string;
    role:string;
    userId:string;
    profile:{
        name:string;
        email:string;
        profilePicture:string | null;
    }
}