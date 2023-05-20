import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { orderStatusApi } from "~/apis/orderStatusApi";
import { GET_ALL_ORDER_STATUS, COUNT_BY_DESCRIPTION } from "./orderStatusType";
const initialState = {
    orderStatus: [],
    isLoading: false,
    countOrderStatus: [],
};
const fetchAllOrderStatus = createAsyncThunk(
    GET_ALL_ORDER_STATUS,
    async (params, thunkApi) => {
        try {
            const response = await orderStatusApi.requestOrderStatus(params);
            return response.success
                ? thunkApi.fulfillWithValue(response)
                : thunkApi.rejectWithValue(response);
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);
const fetchCountOrderStatus = createAsyncThunk(
    COUNT_BY_DESCRIPTION,
    async (params, thunkApi) => {
        try {
            const response = await orderStatusApi.requestCountByDescription(params);
            return response.success
                ? thunkApi.fulfillWithValue(response)
                : thunkApi.rejectWithValue(response);
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);
const orderStatusSlice = createSlice({
    name: "orderStatus",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //get All OrderStatus
            .addCase(fetchAllOrderStatus.pending, (state, action) => {
                state.isLoading = true;
                return state;
            })
            .addCase(fetchAllOrderStatus.rejected, (state, action) => {
                state.isLoading = false;

                return state;
            })
            .addCase(fetchAllOrderStatus.fulfilled, (state, action) => {
                const data = action.payload.data;
                state.isLoading = false;
                state.orderStatus = data;
                return state;
            })
            //count OrderStatus
            .addCase(fetchCountOrderStatus.pending, (state, action) => {
                state.isLoading = true;
                return state;
            })
            .addCase(fetchCountOrderStatus.rejected, (state, action) => {
                state.isLoading = false;

                return state;
            })
            .addCase(fetchCountOrderStatus.fulfilled, (state, action) => {
                const data = action.payload.data;
                state.isLoading = false;
                state.countOrderStatus = data;
                return state;
            })
    }
}
);
const orderStatusReducer = orderStatusSlice.reducer;
export default orderStatusReducer;
export { fetchAllOrderStatus ,fetchCountOrderStatus};