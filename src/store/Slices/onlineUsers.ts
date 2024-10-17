import { createSlice } from "@reduxjs/toolkit";

const onlineUsersSlice = createSlice({
    name:"onlineUsersSlice",
    initialState:[],
    reducers:{
        addOnlineUsers:(state,action)=>{
            state = action.payload;
            return state;
        }
    }
})
export const {addOnlineUsers} = onlineUsersSlice.actions;
export default onlineUsersSlice.reducer;