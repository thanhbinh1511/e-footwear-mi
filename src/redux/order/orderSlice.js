import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { orderApi } from "~/apis/orderApi";
import { GET_ALL_ORDER, GET_ORDER_BY_ID, UPDATE_ORDER_STATUS, COUNT_ORDER, GET_ORDER_HOT, GET_TOTAL_ORDER_BY_MONTH, GET_TOTAL_PRICE_BY_MONTH } from "./orderType";
import MySwal from "~/constants/MySwal";
const initialState = {
    orders: [],
    countOrder: 0,
    totalPrice: [],
    order: null,
    orderTotal: [],
    isLoading: false,
    orderChanged: false,
};
const fetchAllOrders = createAsyncThunk(
    GET_ALL_ORDER,
    async (params, thunkApi) => {
        try {
            const response = await orderApi.requestAllOrder(params);
            return response.success
                ? thunkApi.fulfillWithValue(response)
                : thunkApi.rejectWithValue(response);
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);
const fetchOrderById = createAsyncThunk(
    GET_ORDER_BY_ID,
    async (params, thunkApi) => {
        try {
            const response = await orderApi.requestOrderById(params.id, params.accessToken);
            return response.success
                ? thunkApi.fulfillWithValue(response)
                : thunkApi.rejectWithValue(response);
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);
const fetchUpdateOrderStatus = createAsyncThunk(
    UPDATE_ORDER_STATUS,
    async (params, thunkApi) => {
        try {
            const response = await orderApi.requestUpdateOrder(params.data, params.accessToken);
            return response.success
                ? thunkApi.fulfillWithValue(response)
                : thunkApi.rejectWithValue(response);
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);
const fetchCountOrder = createAsyncThunk(
    COUNT_ORDER,
    async (params, thunkApi) => {
        try {
            const response = await orderApi.requestCountOrder(params);
            return response.success
                ? thunkApi.fulfillWithValue(response)
                : thunkApi.rejectWithValue(response);
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    });
const fetchGetHotOrder = createAsyncThunk(
    GET_ORDER_HOT,
    async (params, thunkApi) => {
        try {
            const response = await orderApi.requestGetHotOrder(params);
            return response.success
                ? thunkApi.fulfillWithValue(response)
                : thunkApi.rejectWithValue(response);
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    });
const fetchGetTotalOrderByMonth = createAsyncThunk(
    GET_TOTAL_ORDER_BY_MONTH,
    async (params, thunkApi) => {
        try {
            const response = await orderApi.requestGetTotalOrderByMonth(params);
            return response.success
                ? thunkApi.fulfillWithValue(response)
                : thunkApi.rejectWithValue(response);
        } catch (error) {
            console.log(error)
            return thunkApi.rejectWithValue(error.response.data);
        }
    });
const fetchGetTotalPriceByMonth = createAsyncThunk(
    GET_TOTAL_PRICE_BY_MONTH,
    async (params, thunkApi) => {
        try {
            const response = await orderApi.requestGetTotalPriceByMonth(params);
            return response.success
                ? thunkApi.fulfillWithValue(response)
                : thunkApi.rejectWithValue(response);
        } catch (error) {
            console.log(error)
            return thunkApi.rejectWithValue(error.response.data);
        }
    });
const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //get All Order
            .addCase(fetchAllOrders.pending, (state, action) => {
                state.isLoading = true;
                return state;
            })
            .addCase(fetchAllOrders.rejected, (state, action) => {
                state.isLoading = false;

                return state;
            })
            .addCase(fetchAllOrders.fulfilled, (state, action) => {
                const data = action.payload.data;
                state.isLoading = false;
                state.orders = data;
                return state;
            })
            //get Order By Id
            .addCase(fetchOrderById.pending, (state, action) => {
                state.isLoading = true;
                return state;
            }
            )
            .addCase(fetchOrderById.rejected, (state, action) => {
                state.isLoading = false;
                return state;
            }
            )
            .addCase(fetchOrderById.fulfilled, (state, action) => {
                const data = action.payload.data;
                state.isLoading = false;
                state.order = data;
                return state;
            }
            )
            .addCase(fetchUpdateOrderStatus.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.orderChanged = false;
                MySwal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: 'Thất bại!',
                    text: `Cập nhật trạng thái đơn hàng thất bại!`,
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
            .addCase(fetchUpdateOrderStatus.pending, (state, action) => {
                state.isLoading = true;
                state.orderChanged = false;
                return state;
            }
            )
            .addCase(fetchUpdateOrderStatus.fulfilled, (state, action) => {
                state.orderChanged = true;
                state.isLoading = true;
                MySwal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: 'Thành công!',
                    text: `Cập nhật trạng thái đơn hàng thành công!`,
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
            .addCase(fetchCountOrder.pending, (state, action) => {
                state.isLoading = true;
                return state;
            }
            )
            .addCase(fetchCountOrder.rejected, (state, action) => {
                state.isLoading = false;
                return state;
            }
            )
            .addCase(fetchCountOrder.fulfilled, (state, action) => {
                const data = action.payload.data;
                state.isLoading = false;
                state.countOrder = data;
                return state;
            }
            )
            .addCase(fetchGetHotOrder.pending, (state, action) => {
                state.isLoading = true;
                return state;
            }
            )
            .addCase(fetchGetHotOrder.rejected, (state, action) => {
                state.isLoading = false;
                return state;
            }
            )
            .addCase(fetchGetHotOrder.fulfilled, (state, action) => {
                const data = action.payload.data;
                state.isLoading = false;
                state.orders = data;
                return state;
            }
            )
            .addCase(fetchGetTotalOrderByMonth.pending, (state, action) => {
                state.isLoading = true;
                return state;
            }
            )
            .addCase(fetchGetTotalOrderByMonth.rejected, (state, action) => {
                state.isLoading = false;
                return state;
            }
            )
            .addCase(fetchGetTotalOrderByMonth.fulfilled, (state, action) => {
                const data = action.payload.data;
                state.isLoading = false;
                state.orderTotal = data;
                return state;
            }
            )
            //get Total Price By Month
            .addCase(fetchGetTotalPriceByMonth.pending, (state, action) => {
                state.isLoading = true;
                return state;
            }
            )
            .addCase(fetchGetTotalPriceByMonth.rejected, (state, action) => {
                state.isLoading = false;
                return state;
            }
            )
            .addCase(fetchGetTotalPriceByMonth.fulfilled, (state, action) => {
                const data = action.payload.data;
                state.isLoading = false;
                state.totalPrice = data;
                return state;
            })
    },
});
const orderReducer = orderSlice.reducer;
export default orderReducer;
export { fetchAllOrders, fetchOrderById, fetchUpdateOrderStatus, fetchCountOrder, fetchGetHotOrder, fetchGetTotalOrderByMonth, fetchGetTotalPriceByMonth };