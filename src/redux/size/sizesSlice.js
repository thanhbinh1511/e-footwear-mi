import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    GET_ALL_SIZE,
} from "./sizesType";
import { sizesApi } from "~/apis/sizesApi";
const initialState = {
    sizes: [],
    size: null,
    isLoading: false,
};

const fetchAllSizes = createAsyncThunk(
    GET_ALL_SIZE,
    async (params, thunkApi) => {
        try {
            const response = await sizesApi.requestAllSize();
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
            .addCase(fetchAllSizes.pending, (state, action) => {
                state.isLoading = true;
                return state;
            })
            .addCase(fetchAllSizes.rejected, (state, action) => {
                state.isLoading = false;
                return state;
            })
            .addCase(fetchAllSizes.fulfilled, (state, action) => {
                const sizes = action.payload.data;
                state.sizes = sizes;
                state.isLoading = false;
                return state;
            });
    },
});

const sizeReducer = sizeSlice.reducer;
export default sizeReducer;
export { fetchAllSizes };
