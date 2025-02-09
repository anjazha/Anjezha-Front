import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    "id": "",
    "user_id": "",
    "bio": "",
    "bidding": "",
    "pricing": "",
    "avg_rating": "",
    "categoryId": "",
    "longitude": "",
    "latitude": ""
}

const taskerSlice = createSlice({
    name:"taskerSlice",
    initialState:initialState,
    reducers:{
        addTasker:(state,action)=>{
            state=action.payload;
            return state;
        },
        deleteTasker:(state)=>{
            state={
                "id": "",
                "user_id": "",
                "bio": "",
                "bidding": "",
                "pricing": "",
                "avg_rating": "",
                "categoryId": "",
                "longitude": "",
                "latitude": ""
            };
            return state;
        }
    }
})

export const {addTasker,deleteTasker}=taskerSlice.actions;

export default taskerSlice.reducer;