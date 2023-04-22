import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    GET_ALL_COLOR,
    DELETE_COLOR_BY_ID,
    CREATE_COLOR,
    UPDATE_COLOR_BY_ID,
} from "./colorsType";
import { colorsApi } from "~/apis/colorsApi";
import MySwal from "~/constants/MySwal";
const initialState = {
    colors: [],
    color: null,
    isLoading: false,
    colorChanged: false,
};

const fetchAllColors = createAsyncThunk(
    GET_ALL_COLOR,
    async (params, thunkApi) => {
        try {
            const response = await colorsApi.requestAllColor();
            return response.success
                ? thunkApi.fulfillWithValue(response)
                : thunkApi.rejectWithValue(response);
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);
const fetchDeleteColor = createAsyncThunk(
    DELETE_COLOR_BY_ID,
    async (id, thunkApi) => {
        try {
            const response = await colorsApi.requestDeleteColor(id);
            return response.success
                ? thunkApi.fulfillWithValue(response)
                : thunkApi.rejectWithValue(response);
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);
const fetchCreateColor = createAsyncThunk(
    CREATE_COLOR,
    async (params, thunkApi) => {
        try {
            const response = await colorsApi.requestCreateColor(params);
            return response.success
                ? thunkApi.fulfillWithValue(response)
                : thunkApi.rejectWithValue(response);
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);
const fetchUpdateColor = createAsyncThunk(
    UPDATE_COLOR_BY_ID,
    async (params, thunkApi) => {
        try {
            const response = await colorsApi.requestUpdateColor(params);
            return response.success
                ? thunkApi.fulfillWithValue(response)
                : thunkApi.rejectWithValue(response);
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);

const colorSlice = createSlice({
    name: "color",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //get All color
            .addCase(fetchAllColors.pending, (state, action) => {
                state.isLoading = true;
                return state;
            })
            .addCase(fetchAllColors.rejected, (state, action) => {
                state.isLoading = false;
                return state;
            })
            .addCase(fetchAllColors.fulfilled, (state, action) => {
                const colors = action.payload.data;
                state.colors = colors;
                state.isLoading = false;
                return state;
            })
            // Delete Color By Id
            .addCase(fetchDeleteColor.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.colorChanged = false;
                MySwal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: 'Thất bại!',
                    text: `Xóa màu thất bại!`,
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
            .addCase(fetchDeleteColor.pending, (state, action) => {
                state.isLoading = true;
                state.colorChanged = false;
                return state;
            }
            )
            .addCase(fetchDeleteColor.fulfilled, (state, action) => {
                const data = action.payload;
                const list = state.colors.filter(item => item.id !== data);
                state.colors = list
                state.colorChanged = true;
                state.isLoading = true;
                MySwal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: 'Thành công!',
                    text: `Xóa màu thành công!`,
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
            //Create Color
            .addCase(fetchCreateColor.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.colorChanged = false;
                MySwal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: 'Thất bại!',
                    text: `Tạo màu sắc thất bại!`,
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
            .addCase(fetchCreateColor.pending, (state, action) => {
                state.isLoading = true;
                state.colorChanged = false;
                return state;
            }
            )
            .addCase(fetchCreateColor.fulfilled, (state, action) => {
                const data = action.payload;
                state.colorChanged = true;
                state.isLoading = true;
                MySwal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: 'Thành công!',
                    text: `Tạo màu sắc thành công!`,
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
            // Update Color By Id
            .addCase(fetchUpdateColor.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.colorChanged = false;
                MySwal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: 'Thất bại!',
                    text: `Cập nhật màu sắc thất bại!`,
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
            .addCase(fetchUpdateColor.pending, (state, action) => {
                state.isLoading = true;
                state.colorChanged = false;
                return state;
            }
            )
            .addCase(fetchUpdateColor.fulfilled, (state, action) => {
                const data = action.payload.data;
                const list = state.colors.filter((item) => item.id !== data.id);
                state.colorChanged = true;
                state.isLoading = true;
                MySwal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: 'Thành công!',
                    text: `Cập nhật màu sắc thành công!`,
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
    },
});



const colorReducer = colorSlice.reducer;
export default colorReducer;
export { fetchCreateColor, fetchUpdateColor, fetchDeleteColor, fetchAllColors };

