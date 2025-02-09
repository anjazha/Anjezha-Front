import { configureStore } from '@reduxjs/toolkit'
import userSlice from './Slices/userSlice'
import { useDispatch } from 'react-redux'
import taskerSlice from './Slices/taskerSlice'
import userChatSlice from './Slices/userChat'
import onlineUsersSlice from './Slices/onlineUsers'

export const store = configureStore({
    reducer: {
        user:userSlice,
        tasker:taskerSlice,
        userChat:userChatSlice,
        onlineUsers:onlineUsersSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()