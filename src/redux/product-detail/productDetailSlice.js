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
const fetchDeleteProductDetail = createAsyncThunk(
    DELETE_PRODUCT_DETAIL_BY_ID,
    async (id, thunkApi) => {
        try {
            const response = await productDetailsApi.requestDeleteProductDetails(id);
            return response.success
                ? thunkApi.fulfillWithValue(response)
                : thunkApi.rejectWithValue(response);
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);
const fetchCreateProductDetail = createAsyncThunk(
    CREATE_PRODUCT_DETAIL,
    async (params, thunkApi) => {
        try {
            const response = await productDetailsApi.requestCreateProductDetails(params);
            return response.success
                ? thunkApi.fulfillWithValue(response)
                : thunkApi.rejectWithValue(response);
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);
const fetchUpdateProductDetailById = createAsyncThunk(
    UPDATE_PRODUCT_DETAIL_BY_ID,
    async (params, thunkApi) => {
        try {
            const response = await productDetailsApi.requestUpdateProductDetails(params);
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
            // Delete Size By Id
            .addCase(fetchDeleteProductDetail.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.productDetailChanged = false;
                MySwal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: 'Thất bại!',
                    text: `Xóa chi tiết sản phẩm thất bại!`,
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
            .addCase(fetchDeleteProductDetail.pending, (state, action) => {
                state.isLoading = true;
                state.productDetailChanged = false;
                return state;
            }
            )
            .addCase(fetchDeleteProductDetail.fulfilled, (state, action) => {
                const data = action.payload;
                const list = state.productDetails.filter(item => item.id !== data);
                state.productDetails = list
                state.productDetailChanged = true;
                state.isLoading = true;
                MySwal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: 'Thành công!',
                    text: `Xóa chi tiết sản phẩm thành công!`,
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
            .addCase(fetchCreateProductDetail.rejected, (state, action) => {
                state.isLoading = false;
                state.productDetailChanged = false;
                MySwal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: 'Thất bại!',
                    text: `Thêm chi tiết sản phẩm thất bại!`,
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
            .addCase(fetchCreateProductDetail.pending, (state, action) => {
                state.isLoading = true;
                state.productDetailChanged = false;
                return state;
            }
            )
            .addCase(fetchCreateProductDetail.fulfilled, (state, action) => {
                const data = action.payload;
                state.productDetailChanged = true;
                state.isLoading = true;
                MySwal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: 'Thành công!',
                    text: `Thêm chi tiết sản phẩm thành công!`,
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
            //update productDetail
            .addCase(fetchUpdateProductDetailById.rejected, (state, action) => {
                state.isLoading = false;
                state.productDetailChanged = false;
                MySwal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: 'Thất bại!',
                    text: `Cập nhật chi tiết sản phẩm thất bại!`,
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
            .addCase(fetchUpdateProductDetailById.pending, (state, action) => {
                state.isLoading = true;
                state.productDetailChanged = false;
                return state;
            }
            )
            .addCase(fetchUpdateProductDetailById.fulfilled, (state, action) => {
                const data = action.payload.data;
                const list = state.productDetails.filter((item) => item.id !== data.id);
                state.productDetailChanged = true;
                state.isLoading = true;
                MySwal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: 'Thành công!',
                    text: `Cập nhật chi tiết sản phẩm thành công!`,
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
    }
});
const productDetailReducer = productDetailSlice.reducer;
export default productDetailReducer;
export { fetchAllProductDetails, fetchDeleteProductDetail, fetchCreateProductDetail, fetchUpdateProductDetailById }