import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customerApi } from "~/apis/customerApi";
import { GET_PROFILE } from "./customerType";
const initialState = {
    customers: [],
    customer: null,
    isLoading: false,
};
const fetchGetProfile = createAsyncThunk(GET_PROFILE, async (params, thunkApi) => {
    try {
        const response = await customerApi.requestGetProfile(params.accessToken, params.accountId);
        return response.success
            ? thunkApi.fulfillWithValue(response)
            : thunkApi.rejectWithValue(response);
    } catch (err) {
        return thunkApi.rejectWithValue(err.response.data);
    }
});
const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //profile
            .addCase(fetchGetProfile.pending, (state, action) => {
                state.isLoading = true;
                return state;
            })

            .addCase(fetchGetProfile.rejected, (state, action) => {
                state.isLoading = true;
            })

            .addCase(fetchGetProfile.fulfilled, (state, action) => {
                const data = action.payload.data;
                state.customer = data;
                state.isLoading = false;
                return state;
            })
    },
});
const customerReducer = customerSlice.reducer;
export default customerReducer;
export { fetchGetProfile };
