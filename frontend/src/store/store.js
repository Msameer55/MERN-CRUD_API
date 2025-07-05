import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slicers/authSlice";
import postReducer from "./slicers/postSlice"


const store = configureStore({
    reducer : {
        auth : authReducer,
        post : postReducer
    }
})

export default store