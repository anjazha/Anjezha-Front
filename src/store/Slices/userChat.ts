import { createSlice } from "@reduxjs/toolkit";

const userChatSlice = createSlice({
    name:"userChatSlice",
    initialState:{
        id:"",
        name:"",
        profilePicture:"",
    },
    reducers:{
        addUserChat : (state,action)=>{
            state = action.payload
            return state
        }
    }
})
export const {addUserChat} = userChatSlice.actions;
export default userChatSlice.reducer;