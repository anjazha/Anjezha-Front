import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id:"",
    name:"",
    email:"",
    password:"",
    phoneNumber:"",
    profilePicture:"",
    created_at:"",
}

const userSlice = createSlice({
    name:"userSlice",
    initialState:initialState,
    reducers:{
        addUser:(state,action)=>{
            state=action.payload;
            return state;
        },
        deleteUser:(state)=>{
            state={
                id:"",
                name:"",
                email:"",
                password:"",
                phoneNumber:"",
                profilePicture:"",
                created_at:"",
            };
            return state;
        }
    }
})

export const {addUser,deleteUser}=userSlice.actions;

export default userSlice.reducer;