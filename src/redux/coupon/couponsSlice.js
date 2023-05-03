import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { couponsApi } from "~/apis/couponsApi";
import MySwal from "~/constants/MySwal";
import {
    CREATE_COUPON,
    GET_ALL_COUPON,
    UPDATE_COUPON_BY_ID,
} from "./couponsType";
const initialState = {
    coupons: [],
    coupon: null,
    isLoading: false,
    couponChanged: false,
};
const fetchAllCoupons = createAsyncThunk(
    GET_ALL_COUPON,
    async (params, thunkApi) => {
        try {
            const response = await couponsApi.requestAllCoupon();
            return response.success
                ? thunkApi.fulfillWithValue(response)
                : thunkApi.rejectWithValue(response);
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);
const fetchCreateCoupon = createAsyncThunk(
    CREATE_COUPON,
    async (params, thunkApi) => {
        try {
            const response = await couponsApi.requestCreateCoupon(params);
            return response.success
                ? thunkApi.fulfillWithValue(response)
                : thunkApi.rejectWithValue(response);
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);
const fetchUpdateCoupon = createAsyncThunk(
    UPDATE_COUPON_BY_ID,
    async (params, thunkApi) => {
        try {
            const response = await couponsApi.requestUpdateCoupon(params);
            return response.success
                ? thunkApi.fulfillWithValue(response)
                : thunkApi.rejectWithValue(response);
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);

const couponSlice = createSlice({
    name: "coupon",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //get All coupon
            .addCase(fetchAllCoupons.pending, (state, action) => {
                state.isLoading = true;
                state.couponChanged = false;
                return state;
            })
            .addCase(fetchAllCoupons.rejected, (state, action) => {
                state.isLoading = false;
                state.couponChanged = false;
                return state;
            })
            .addCase(fetchAllCoupons.fulfilled, (state, action) => {
                const coupons = action.payload.data;
                state.coupons = coupons;
                state.isLoading = false;
                state.couponChanged = false;
                return state;
            })
            //Create coupon
            .addCase(fetchCreateCoupon.rejected, (state, action) => {
                state.isLoading = false;
                state.couponChanged = false;
                MySwal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: 'Thất bại!',
                    text: `Thêm mã giảm giá thất bại!`,
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
            .addCase(fetchCreateCoupon.pending, (state, action) => {
                state.isLoading = true;
                state.couponChanged = false;
                return state;
            }
            )
            .addCase(fetchCreateCoupon.fulfilled, (state, action) => {
                const data = action.payload;
                state.couponChanged = true;
                state.isLoading = true;
                MySwal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: 'Thành công!',
                    text: `Thêm mã giảm giá thành công!`,
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
            // Update coupon by id
            .addCase(fetchUpdateCoupon.rejected, (state, action) => {
                state.isLoading = false;
                state.couponChanged = false;
                MySwal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: 'Thất bại!',
                    text: `Cập nhật loại ảnh thất bại!`,
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
            .addCase(fetchUpdateCoupon.pending, (state, action) => {
                state.isLoading = true;
                state.couponChanged = false;
                return state;
            }
            )
            .addCase(fetchUpdateCoupon.fulfilled, (state, action) => {
                const data = action.payload.data;
                const list = state.coupons.filter((item) => item.id !== data.id);
                state.couponChanged = true;
                state.isLoading = true;
                MySwal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: 'Thành công!',
                    text: `Cập nhật mã giảm giá thành công!`,
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
const couponReducer = couponSlice.reducer;
export default couponReducer;
export { fetchAllCoupons, fetchCreateCoupon, fetchUpdateCoupon };

