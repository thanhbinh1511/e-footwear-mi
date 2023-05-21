import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { typeGalleriesApi } from "~/apis/typeGalleriesApi";
import MySwal from "~/constants/MySwal";
import {
    CREATE_TYPE_GALLERY,
    DELETE_TYPE_GALLERY_BY_ID,
    GET_ALL_TYPE_GALLERY,
    UPDATE_TYPE_GALLERY_BY_ID
} from "./typeGalleriesType";
const initialState = {
    typeGalleries: [],
    typeGallery: null,
    isLoading: false,
    typeGalleryChanged: false,
};
const fetchAllTypeGalleries = createAsyncThunk(
    GET_ALL_TYPE_GALLERY,
    async (params, thunkApi) => {
        try {
            const response = await typeGalleriesApi.requestAllTypeGallery(params);
            return response.success
                ? thunkApi.fulfillWithValue(response)
                : thunkApi.rejectWithValue(response);
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);
const fetchCreateTypeGallery = createAsyncThunk(
    CREATE_TYPE_GALLERY,
    async (params, thunkApi) => {
        try {
            const response = await typeGalleriesApi.requestAddTypeGallery(params.data, params.accessToken);
            return response.success
                ? thunkApi.fulfillWithValue(response)
                : thunkApi.rejectWithValue(response);
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);
const fetchUpdateTypeGallery = createAsyncThunk(
    UPDATE_TYPE_GALLERY_BY_ID,
    async (params, thunkApi) => {
        try {
            const response = await typeGalleriesApi.requestUpdateTypeGallery(params.data, params.accessToken);
            return response.success
                ? thunkApi.fulfillWithValue(response)
                : thunkApi.rejectWithValue(response);
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);
const fetchDeleteTypeGallery = createAsyncThunk(
    DELETE_TYPE_GALLERY_BY_ID,
    async (params, thunkApi) => {
        try {
            const response = await typeGalleriesApi.requestDeleteTypeGallery(params.id, params.accessToken);
            return response.success
                ? thunkApi.fulfillWithValue(response)
                : thunkApi.rejectWithValue(response);
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);


const typeGallerySlice = createSlice({
    name: "typeGallery",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //get All typeGallery
            .addCase(fetchAllTypeGalleries.pending, (state, action) => {
                state.isLoading = true;
                state.typeGalleryChanged = false;
                return state;
            })
            .addCase(fetchAllTypeGalleries.rejected, (state, action) => {
                state.isLoading = false;
                state.typeGalleryChanged = false;
                return state;
            })
            .addCase(fetchAllTypeGalleries.fulfilled, (state, action) => {
                const typeGalleries = action.payload.data;
                state.typeGalleries = typeGalleries;
                state.isLoading = false;
                state.typeGalleryChanged = false;
                return state;
            })
            // Delete typeGallery by id
            .addCase(fetchDeleteTypeGallery.rejected, (state, action) => {
                state.isLoading = false;
                state.typeGalleryChanged = false;
                MySwal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: 'Thất bại!',
                    text: `Xóa loại ảnh thất bại!`,
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
            .addCase(fetchDeleteTypeGallery.pending, (state, action) => {
                state.isLoading = true;
                state.typeGalleryChanged = false;
                return state;
            }
            )
            .addCase(fetchDeleteTypeGallery.fulfilled, (state, action) => {
                const data = action.payload;
                const list = state.typeGalleries.filter(item => item.id !== data);
                state.typeGalleries = list
                state.typeGalleryChanged = true;
                state.isLoading = true;
                MySwal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: 'Thành công!',
                    text: `Xóa loại ảnh thành công!`,
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
            //Create typeGallery
            .addCase(fetchCreateTypeGallery.rejected, (state, action) => {
                state.isLoading = false;
                state.typeGalleryChanged = false;
                MySwal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: 'Thất bại!',
                    text: `Thêm loại ảnh thất bại!`,
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
            .addCase(fetchCreateTypeGallery.pending, (state, action) => {
                state.isLoading = true;
                state.typeGalleryChanged = false;
                return state;
            }
            )
            .addCase(fetchCreateTypeGallery.fulfilled, (state, action) => {
                state.typeGalleryChanged = true;
                state.isLoading = true;
                MySwal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: 'Thành công!',
                    text: `Thêm loại ảnh thành công!`,
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
            // Update typeGallery by id
            .addCase(fetchUpdateTypeGallery.rejected, (state, action) => {
                state.isLoading = false;
                state.typeGalleryChanged = false;
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
            .addCase(fetchUpdateTypeGallery.pending, (state, action) => {
                state.isLoading = true;
                state.typeGalleryChanged = false;
                return state;
            }
            )
            .addCase(fetchUpdateTypeGallery.fulfilled, (state, action) => {
                state.typeGalleryChanged = true;
                state.isLoading = true;
                MySwal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: 'Thành công!',
                    text: `Cập nhật loại ảnh thành công!`,
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
const typeGalleryReducer = typeGallerySlice.reducer;
export default typeGalleryReducer;
export { fetchCreateTypeGallery, fetchDeleteTypeGallery, fetchUpdateTypeGallery, fetchAllTypeGalleries };

