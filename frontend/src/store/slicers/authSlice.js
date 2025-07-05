import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthApi from "../../api/authApi";
import { isTokenValid } from "../../utils/tokenValidity";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await AuthApi.register(email, password);
      console.log("from register ", response);
      return response.data;
    } catch (error) {
     return rejectWithValue(error.response?.data?.message || error.message);

    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await AuthApi.login(email, password);
      console.log("from login ", response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);

    }
  }
);

const token = localStorage.getItem("token");
const tokenData = isTokenValid(token);

const initialState = {
  user: tokenData.user,
  email: tokenData.email,
  token: token || "",
  isLoggedIn: tokenData.valid || false,
  loading: false,
  error: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut(state) {
      state.isLoggedIn = false,
        state.user = null,
        state.token = "",
        localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(registerUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.email = action.payload.email;
            state.token = action.payload.token; 
            state.isLoggedIn = true;
            localStorage.setItem("token", action.payload.token);
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.loading = false,
            state.error = action.payload
        })
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
        })  
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.isLoggedIn = true;
            localStorage.setItem("token", action.payload.token);
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
     },
});


export const {logOut} = authSlice.actions;
export default authSlice.reducer;