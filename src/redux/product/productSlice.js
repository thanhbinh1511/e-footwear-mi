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
const fetchDeleteProduct = createAsyncThunk(
    DELETE_PRODUCT_BY_ID,
    async (id, thunkApi) => {
        try {
            const response = await productApi.requestDeleteProduct(id);
            return response.success
                ? thunkApi.fulfillWithValue(response)
                : thunkApi.rejectWithValue(response);
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);
const fetchCreateProduct = createAsyncThunk(
    CREATE_PRODUCT,
    async (params, thunkApi) => {
        try {
            const response = await productApi.requestCreateProduct(params);
            return response.success
                ? thunkApi.fulfillWithValue(response)
                : thunkApi.rejectWithValue(response);
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);
const fetchUpdateProduct = createAsyncThunk(
    UPDATE_PRODUCT_BY_ID,
    async (params, thunkApi) => {
        try {
            const response = await productApi.requestUpdateProduct(params);
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
            //delete gallery by id
            .addCase(fetchDeleteProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.productChanged = false;
                MySwal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: 'Thất bại!',
                    text: `Xóa sản phẩm thất bại!`,
                    showConfirmButton: false,
                    timer: 2500,
                    showClass: {
                        popup: 'animate__animated animate__backInRight'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__backOutRight'
                    }
                });
                return state
            })
            .addCase(fetchDeleteProduct.pending, (state, action) => {
                state.isLoading = true;
                state.productChanged = false;
                return state;
            }
            )
            .addCase(fetchDeleteProduct.fulfilled, (state, action) => {
                const data = action.payload;
                const list = state.products.filter(item => item.id !== data);
                state.products = list
                state.productChanged = true;
                state.isLoading = true;
                MySwal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: 'Thành công!',
                    text: `Xóa sản phẩm thành công!`,
                    showConfirmButton: false,
                    timer: 2500,
                    showClass: {
                        popup: 'animate__animated animate__backInRight'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__backOutRight'
                    }
                });
                return state
            }
            )
            //create gallery
            .addCase(fetchCreateProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.productChanged = false;
                MySwal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: 'Thất bại!',
                    text: `Thêm sản phẩm thất bại!`,
                    showConfirmButton: false,
                    timer: 2500,
                    showClass: {
                        popup: 'animate__animated animate__backInRight'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__backOutRight'
                    }
                });
                return state
            }
            )
            .addCase(fetchCreateProduct.pending, (state, action) => {
                state.isLoading = true;
                state.productChanged = false;
                return state;
            }
            )
            .addCase(fetchCreateProduct.fulfilled, (state, action) => {
                const data = action.payload;
                state.productChanged = true;
                state.isLoading = true;
                MySwal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: 'Thành công!',
                    text: `Thêm sản phẩm thành công!`,
                    showConfirmButton: false,
                    timer: 2500,
                    showClass: {
                        popup: 'animate__animated animate__backInRight'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__backOutRight'
                    }
                });
                return state
            }
            )
            //update gallery
            .addCase(fetchUpdateProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.productChanged = false;
                MySwal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: 'Thất bại!',
                    text: `Cập nhật sản phẩm thất bại!`,
                    showConfirmButton: false,
                    timer: 2500,
                    showClass: {
                        popup: 'animate__animated animate__backInRight'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__backOutRight'
                    }
                });
                return state
            }
            )
            .addCase(fetchUpdateProduct.pending, (state, action) => {
                state.isLoading = true;
                state.productChanged = false;
                return state;
            }
            )
            .addCase(fetchUpdateProduct.fulfilled, (state, action) => {
                const data = action.payload;
                state.productChanged = true;
                state.isLoading = true;
                MySwal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: 'Thành công!',
                    text: `Cập nhật sản phẩm thành công!`,
                    showConfirmButton: false,
                    timer: 2500,
                    showClass: {
                        popup: 'animate__animated animate__backInRight'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__backOutRight'
                    }
                });
                return state
            }
            )
    }
});
const productReducer = productSlice.reducer;
export default productReducer;
export { fetchAllProducts, fetchDeleteProduct, fetchCreateProduct, fetchUpdateProduct }