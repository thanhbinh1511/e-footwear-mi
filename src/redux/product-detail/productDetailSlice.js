import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    GET_ALL_PRODUCT_DETAIL,
    CREATE_PRODUCT_DETAIL,
    UPDATE_PRODUCT_DETAIL_BY_ID,
    DELETE_PRODUCT_DETAIL_BY_ID,

} from "./productDetailType";
import { productDetailsApi } from "~/apis/productDetailsApi";
import MySwal from "~/constants/MySwal";
const initialState = {
    productDetails: [],
    productDetail: null,
    isLoading: false,
    productDetailChanged: false,
};
const fetchAllProductDetails = createAsyncThunk(
    GET_ALL_PRODUCT_DETAIL,
    async (params, thunkApi) => {
        try {
            const response = await productDetailsApi.requestAllProductDetails();
            return response.success
                ? thunkApi.fulfillWithValue(response)
                : thunkApi.rejectWithValue(response);
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);
const productDetailSlice = createSlice({
    name: "productDetail",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //getALlProduct
            .addCase(fetchAllProductDetails.pending, (state) => {
                state.isLoading = true;
                return state

            }
            )
            .addCase(fetchAllProductDetails.rejected, (state) => {
                state.isLoading = false;
                return state
            }
            )
            .addCase(fetchAllProductDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productDetails = action.payload.data;
                return state
            }
            )
    }
});
const productDetailReducer = productDetailSlice.reducer;
export default productDetailReducer;
export { fetchAllProductDetails }