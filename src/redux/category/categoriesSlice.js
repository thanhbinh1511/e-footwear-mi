import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    GET_ALL_CATEGORY,
} from "./categoriesType";
import { categoriesApi } from "~/apis/categoriesApi";
const initialState = {
    categories: [],
    category: null,
    isLoading: false,
};

const fetchAllCategories = createAsyncThunk(
    GET_ALL_CATEGORY,
    async (params, thunkApi) => {
        try {
            const response = await categoriesApi.requestAllCategory();
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
    },
});



const categoryReducer = categorySlice.reducer;
export default categoryReducer;
export { fetchAllCategories };

