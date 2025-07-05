import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import PostApi from "../../api/postApi";

export const createUserPost = createAsyncThunk("post/create", async ({ name, title, body }, { rejectWithValue }) => {
    try {
        const response = await PostApi.createPost({ name, title, body });
        console.log("from post create", response)
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message || error.message || "Something went wrong");
    }
})

export const getUserPost = createAsyncThunk("post/userPost", async (_, { rejectWithValue }) => {
    try {
        const response = await PostApi.getUserPost();
        console.log("get user post", response.data.userPosts);
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message || error.message || "Not getting User post")
    }

})


export const editUserPost = createAsyncThunk("post/edit", async ({ id, name, title, body }, { rejectWithValue }) => {
    try {
        const response = await PostApi.updatePost(id, { name, title, body });
        return response.data.post;
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message || error.message);
    }
});

export const deleteUserPost = createAsyncThunk("post/delete", async (id, { rejectWithValue }) => {
    try {
        const response = await PostApi.deleteUserPost(id);
        console.log("from delete slice", response)
        return response;
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message || error.message)
    }
})


export const getAllPosts = createAsyncThunk("posts/allPosts", async(_, {rejectWithValue}) => {
    try {
            const response = await PostApi.getAllPosts();
            console.log(response, "from slice get All posts");
            return response.data
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message || error.message)
    }
})


const initialState = {
    posts: [],
    post: null,
    userPosts: [], // get logges in user posts
    loading: false,
    success: false,
    error: null,
}

const postSlice = createSlice({
    name: "posts",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(createUserPost.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(createUserPost.fulfilled, (state, action) => {
                state.loading = false;
                state.post = action.payload;
                state.posts.push(action.payload);
            })
            .addCase(createUserPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getUserPost.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getUserPost.fulfilled, (state, action) => {
                state.loading = false;
                state.userPosts = action.payload.userPosts
            })
            .addCase(getUserPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(editUserPost.pending, (state) => {
                state.loading = true;
            })
            .addCase(editUserPost.fulfilled, (state, action) => {
                state.loading = false;
                const updatedIndex = state.userPosts.findIndex(post => post._id === action.payload._id);
                if (updatedIndex !== -1) {
                    state.userPosts[updatedIndex] = action.payload;
                }
            })
            .addCase(editUserPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteUserPost.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUserPost.fulfilled, (state, action) => {
                state.loading = false;
                state.userPosts = state.userPosts.filter(
                    (post) => post._id !== action.payload
                );
            })
            .addCase(deleteUserPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getAllPosts.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getAllPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload.posts;
            })
            .addCase(getAllPosts.rejected, (state, action) => {
                state.error = action.payload
            })
    }
})


export default postSlice.reducer;