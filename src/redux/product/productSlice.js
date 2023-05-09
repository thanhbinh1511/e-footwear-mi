import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    GET_ALL_PRODUCT,
    CREATE_PRODUCT,
    UPDATE_PRODUCT_BY_ID,
    DELETE_PRODUCT_BY_ID,
} from "./productType";
import { productApi } from "~/apis/productApi";
import MySwal from "~/constants/MySwal";
const initialState = {
    products: [],
    product: null,
    isLoading: false,
    productChanged: false,
};
const fetchAllProducts = createAsyncThunk(
    GET_ALL_PRODUCT,
    async (params, thunkApi) => {
        try {
            const response = await productApi.requestAllProduct();
            return response.success
                ? thunkApi.fulfillWithValue(response)
                : thunkApi.rejectWithValue(response);
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //getALlProduct
            .addCase(fetchAllProducts.pending, (state) => {
                state.isLoading = true;
                return state

            }
            )
            .addCase(fetchAllProducts.rejected, (state) => {
                state.isLoading = false;
                return state
            }
            )
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload.data;
                return state
            }
            )
            
    }
});
const productReducer = productSlice.reducer;
export default productReducer;
export { fetchAllProducts }