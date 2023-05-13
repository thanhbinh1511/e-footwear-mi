import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    GET_ALL_CATEGORY,
    DELETE_CATEGORY_BY_ID,
    CREATE_CATEGORY,
    UPDATE_CATEGORY_BY_ID,
} from "./categoriesType";
import { categoriesApi } from "~/apis/categoriesApi";
import MySwal from "~/constants/MySwal";
const initialState = {
    categories: [],
    category: null,
    isLoading: false,
    categoryChanged: false,
};

const fetchAllCategories = createAsyncThunk(
    GET_ALL_CATEGORY,
    async (params, thunkApi) => {
        try {
            const response = await categoriesApi.requestAllCategory(params);
            return response.success
                ? thunkApi.fulfillWithValue(response)
                : thunkApi.rejectWithValue(response);
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);
const fetchDeleteCategory = createAsyncThunk(
    DELETE_CATEGORY_BY_ID,
    async (params, thunkApi) => {
        try {
            const response = await categoriesApi.requestDeleteCategory(params.id, params.accessToken);
            return response.success
                ? thunkApi.fulfillWithValue(response)
                : thunkApi.rejectWithValue(response);
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);
const fetchCreateCategory = createAsyncThunk(
    CREATE_CATEGORY,
    async (params, thunkApi) => {
        try {
            const response = await categoriesApi.requestCreateCategory(params.data, params.accessToken);
            return response.success
                ? thunkApi.fulfillWithValue(response)
                : thunkApi.rejectWithValue(response);
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);
const fetchUpdateCategory = createAsyncThunk(
    UPDATE_CATEGORY_BY_ID,
    async (params, thunkApi) => {
        try {
            const response = await categoriesApi.requestUpdateCategory(params.data, params.accessToken);
            return response.success
                ? thunkApi.fulfillWithValue(response)
                : thunkApi.rejectWithValue(response);
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);
const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //get All category
            .addCase(fetchAllCategories.pending, (state, action) => {
                state.isLoading = true;
                return state;
            })
            .addCase(fetchAllCategories.rejected, (state, action) => {
                state.isLoading = false;
                return state;
            })
            .addCase(fetchAllCategories.fulfilled, (state, action) => {
                const categories = action.payload.data;
                state.categories = categories;
                state.isLoading = false;
                return state;
            })
            //delete category
            .addCase(fetchDeleteCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.categoryChanged = false;
                MySwal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: 'Thất bại!',
                    text: `Xóa danh mục thất bại!`,
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
            .addCase(fetchDeleteCategory.pending, (state, action) => {
                state.isLoading = true;
                state.categoryChanged = false;
                return state;
            }
            )
            .addCase(fetchDeleteCategory.fulfilled, (state, action) => {
                const data = action.payload;
                const list = state.categories.filter(item => item.id !== data);
                state.sizes = list
                state.categoryChanged = true;
                state.isLoading = true;
                MySwal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: 'Thành công!',
                    text: `Xóa danh mục thành công!`,
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
            //add category
            .addCase(fetchCreateCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.categoryChanged = false;
                MySwal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: 'Thất bại!',
                    text: `Thêm danh mục thất bại!`,
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
            .addCase(fetchCreateCategory.pending, (state, action) => {
                state.isLoading = true;
                state.categoryChanged = false;
                return state;
            })
            .addCase(fetchCreateCategory.fulfilled, (state, action) => {
                const data = action.payload;
                state.categoryChanged = true;
                state.isLoading = true;
                MySwal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: 'Thành công!',
                    text: `Thêm danh mục thành công!`,
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
            .addCase(fetchUpdateCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.categoryChanged = false;
                MySwal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: 'Thất bại!',
                    text: `Thêm danh mục thất bại!`,
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
            .addCase(fetchUpdateCategory.pending, (state, action) => {
                state.isLoading = true;
                state.categoryChanged = false;
                return state;
            }
            )
            .addCase(fetchUpdateCategory.fulfilled, (state, action) => {
                state.categoryChanged = true;
                state.isLoading = true;
                MySwal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: 'Thành công!',
                    text: `Cập nhật danh mục thành công!`,
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




const categoryReducer = categorySlice.reducer;
export default categoryReducer;
export { fetchCreateCategory, fetchUpdateCategory, fetchDeleteCategory, fetchAllCategories };

