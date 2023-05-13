import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    CREATE_SIZE,
    DELETE_SIZE_BY_ID,
    GET_ALL_SIZE, GET_SIZE_BY_ID, UPDATE_SIZE_BY_ID,
} from "./sizesType";
import { sizesApi } from "~/apis/sizesApi";
import MySwal from "~/constants/MySwal";
const initialState = {
    sizes: [],
    size: null,
    isLoading: false,
    sizeChanged: false,
};

const fetchAllSizes = createAsyncThunk(
    GET_ALL_SIZE,
    async (params, thunkApi) => {
        try {
            const response = await sizesApi.requestAllSize(params);
            return response.success
                ? thunkApi.fulfillWithValue(response)
                : thunkApi.rejectWithValue(response);
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);
const fetchSizeById = createAsyncThunk(
    GET_SIZE_BY_ID,
    async (params, thunkApi) => {
        try {
            const response = await sizesApi.requestSizeById(params.id, params.accessToken);
            return response.success
                ? thunkApi.fulfillWithValue(response)
                : thunkApi.rejectWithValue(response);
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);
const fetchUpdateSize = createAsyncThunk(
    UPDATE_SIZE_BY_ID,
    async (params, thunkApi) => {
        try {
            const response = await sizesApi.requestUpdateSize(params.data, params.accessToken);
            return response.success
                ? thunkApi.fulfillWithValue(response)
                : thunkApi.rejectWithValue(response);
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);
const fetchCreateSize = createAsyncThunk(
    CREATE_SIZE,
    async (params, thunkApi) => {
        try {
            const response = await sizesApi.requestCreateSize(params.data, params.accessToken);
            return response.success
                ? thunkApi.fulfillWithValue(response)
                : thunkApi.rejectWithValue(response);
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);
const fetchDeleteSize = createAsyncThunk(
    DELETE_SIZE_BY_ID,
    async (params, thunkApi) => {
        try {
            const response = await sizesApi.requestDeleteSize(params.id, params.accessToken);
            return response.success
                ? thunkApi.fulfillWithValue(response)
                : thunkApi.rejectWithValue(response);
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);

const sizeSlice = createSlice({
    name: "size",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //get All Size
            .addCase(fetchAllSizes.pending, (state, action) => {
                state.isLoading = true;
                state.sizeChanged = false;
                return state;
            })
            .addCase(fetchAllSizes.rejected, (state, action) => {
                state.isLoading = false;
                state.sizeChanged = false;
                return state;
            })
            .addCase(fetchAllSizes.fulfilled, (state, action) => {
                const sizes = action.payload.data;
                state.sizes = sizes;
                state.isLoading = false;
                state.sizeChanged = false;
                return state;
            })

            //get Size By Id
            .addCase(fetchSizeById.pending, (state, action) => {
                state.isLoading = true;
                state.sizeChanged = false;
                return state;
            }
            )
            .addCase(fetchSizeById.rejected, (state, action) => {
                state.isLoading = false;
                state.sizeChanged = false;
                return state;
            }
            )
            .addCase(fetchSizeById.fulfilled, (state, action) => {
                const size = action.payload.data;
                state.size = size;
                state.sizeChanged = false;
                return state;
            })
            // Update Size By Id
            .addCase(fetchUpdateSize.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.sizeChanged = false;
                MySwal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: 'Thất bại!',
                    text: `Cập nhật size giày thất bại!`,
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
            .addCase(fetchUpdateSize.pending, (state, action) => {
                state.isLoading = true;
                state.sizeChanged = false;
                return state;
            }
            )
            .addCase(fetchUpdateSize.fulfilled, (state, action) => {
                const data = action.payload.data;
                const list = state.sizes.filter((item) => item.id !== data.id);
                state.sizeChanged = true;
                state.isLoading = true;
                MySwal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: 'Thành công!',
                    text: `Cập nhật size giày thành công!`,
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
            /// Create Size
            .addCase(fetchCreateSize.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.sizeChanged = false;
                MySwal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: 'Thất bại!',
                    text: `Tạo size giày thất bại!`,
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
            .addCase(fetchCreateSize.pending, (state, action) => {
                state.isLoading = true;
                state.sizeChanged = false;
                return state;
            }
            )
            .addCase(fetchCreateSize.fulfilled, (state, action) => {
                const data = action.payload;
                state.sizeChanged = true;
                state.isLoading = true;
                MySwal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: 'Thành công!',
                    text: `Tạo size giày thành công!`,
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
            // Delete Size By Id
            .addCase(fetchDeleteSize.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.sizeChanged = false;
                MySwal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: 'Thất bại!',
                    text: `Xóa size giày thất bại!`,
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
            .addCase(fetchDeleteSize.pending, (state, action) => {
                state.isLoading = true;
                state.sizeChanged = false;
                return state;
            }
            )
            .addCase(fetchDeleteSize.fulfilled, (state, action) => {
                const data = action.payload;
                const list = state.sizes.filter(item => item.id !== data);
                state.sizes = list
                state.sizeChanged = true;
                state.isLoading = true;
                MySwal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: 'Thành công!',
                    text: `Xóa size giày thành công!`,
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

})

const sizeReducer = sizeSlice.reducer;
export default sizeReducer;
export { fetchAllSizes, fetchSizeById, fetchUpdateSize, fetchCreateSize, fetchDeleteSize };

