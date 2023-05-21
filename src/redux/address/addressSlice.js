import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addressApi } from "~/apis/addressApi";
import { GET_ALL_ADDRESS_BY_USER_ID } from "./addressType";
const initialState = {
    addresses: [],
    address: null,
    isLoading: false,
};
const fetchAllAddressByUserId = createAsyncThunk(
    GET_ALL_ADDRESS_BY_USER_ID,
    async (params, thunkApi) => {
        try {
            const response = await addressApi.requestAllAddressById(params.id, params.accessToken);
            console.log(params.accessToken)
            return response.success
                ? thunkApi.fulfillWithValue(response)
                : thunkApi.rejectWithValue(response);
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);
const addressSlice = createSlice({
    name: "address",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //get All address    
            .addCase(fetchAllAddressByUserId.pending, (state, action) => {
                state.isLoading = true;
                return state;
            })
            .addCase(fetchAllAddressByUserId.rejected, (state, action) => {
                state.isLoading = false;
                return state;
            })
            .addCase(fetchAllAddressByUserId.fulfilled, (state, action) => {
                const addresses = action.payload.data;
                state.addresses = addresses;
                state.isLoading = false;
                return state;
            })
    }
});
const addressReducer = addressSlice.reducer;
export default addressReducer;
export { fetchAllAddressByUserId };