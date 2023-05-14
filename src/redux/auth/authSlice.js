import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi } from "~/apis/authApi";
import MySwal from "~/constants/MySwal";
import { AUTH_LOGIN, AUTH_LOGOUT, GET_ALL_ACCOUNT } from "./authType";

const initialState = {
    accounts: [],
    isLoading: false,
    accountId: 0,
    refreshToken: "",
    username: "",
    accessToken: "",
    avatar: "",
    isLogin: false,
    isLoading: false,
};
const fetchLogin = createAsyncThunk(AUTH_LOGIN, async (params, thunkApi) => {
    try {
        const response = await authApi.requestLogin(params);
        return response.success
            ? thunkApi.fulfillWithValue(response)
            : thunkApi.rejectWithValue(response);
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data);
    }
});
const fetchLogout = createAsyncThunk(AUTH_LOGOUT, async (params, thunkApi) => {
    return;
});
const fetchAllAccounts = createAsyncThunk(
    GET_ALL_ACCOUNT,
    async (params, thunkApi) => {
        try {
            const response = await authApi.requestAllAccount(params);
            return response.success
                ? thunkApi.fulfillWithValue(response)
                : thunkApi.rejectWithValue(response);
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //get All Account
            .addCase(fetchAllAccounts.pending, (state, action) => {
                state.isLoading = true;
                return state;
            })
            .addCase(fetchAllAccounts.rejected, (state, action) => {
                state.isLoading = false;
                return state;
            })
            .addCase(fetchAllAccounts.fulfilled, (state, action) => {
                const accounts = action.payload.data;
                state.accounts = accounts;
                state.isLoading = false;
                return state;
            })
            .addCase(fetchLogin.pending, (state, action) => {
                state.isLoading = true;
                return state;
            })
            // login
            .addCase(fetchLogin.rejected, (state, action) => {
                state.isLoading = false;
                MySwal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: 'Thất bại!',
                    text: `Đăng nhập thất bại!`,
                    showConfirmButton: false,
                    timer: 2500,
                    showClass: {
                        popup: 'animate__animated animate__backInRight'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__backOutRight'
                    }
                });
                return state;
            })
            .addCase(fetchLogin.fulfilled, (state, action) => {
                const data = action.payload.data;
                state.isLoading = false;
                state.isLogin = true;
                state.username = data.username;
                state.accessToken = data.token;
                state.refreshToken = data.refreshToken;
                state.accountId = data.accountId;
                state.avatar = data.avatar;
                MySwal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: 'Thành công!',
                    text: `Đăng nhập thành công!`,
                    showConfirmButton: false,
                    timer: 2500,
                    showClass: {
                        popup: 'animate__animated animate__backInRight'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__backOutRight'
                    }
                });
                return state;
            })
            //Logout
            .addCase(fetchLogout.fulfilled, (state, action) => {
                state.accountId = 0;
                state.refreshToken = "";
                state.username = "";
                state.accessToken = "";
                state.avatar = "";
                return state;
            });

    }
});
const authReducer = authSlice.reducer;
export default authReducer;
export { fetchLogin, fetchLogout, fetchAllAccounts };