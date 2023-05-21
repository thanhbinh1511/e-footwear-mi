import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    GET_ALL_GALLERY,
    CREATE_GALLERY,
    UPDATE_GALLERY_BY_ID,
    DELETE_GALLERY_BY_ID,

} from "./galleriesType";

import { galleriesApi } from "~/apis/galleriesApi";
import MySwal from "~/constants/MySwal";
const initialState = {
    galleries: [],
    gallery: null,
    isLoading: false,
    galleryChanged: false,
};
const fetchAllGalleries = createAsyncThunk(
    GET_ALL_GALLERY,
    async (params, thunkApi) => {
        try {
            const response = await galleriesApi.requestAllGallery(params);
            return response.success
                ? thunkApi.fulfillWithValue(response)
                : thunkApi.rejectWithValue(response);
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);
const fetchDeleteGallery = createAsyncThunk(
    DELETE_GALLERY_BY_ID,
    async (params, thunkApi) => {
        try {
            const response = await galleriesApi.requestDeleteGallery(params.id, params.accessToken);
            return response.success
                ? thunkApi.fulfillWithValue(response)
                : thunkApi.rejectWithValue(response);
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);
const fetchCreateGallery = createAsyncThunk(
    CREATE_GALLERY,
    async (params, thunkApi) => {
        try {
            const response = await galleriesApi.requestCreateGallery(params.data, params.accessToken);
            return response.success
                ? thunkApi.fulfillWithValue(response)
                : thunkApi.rejectWithValue(response);
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);
const fetchUpdateGallery = createAsyncThunk(
    UPDATE_GALLERY_BY_ID,
    async (params, thunkApi) => {
        try {
            const response = await galleriesApi.requestUpdateGallery(params.data, params.accessToken);
            return response.success
                ? thunkApi.fulfillWithValue(response)
                : thunkApi.rejectWithValue(response);
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);



const gallerySlice = createSlice({
    name: "gallery",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //get All gallery
            .addCase(fetchAllGalleries.pending, (state, action) => {
                state.isLoading = true;
                return state;
            })
            .addCase(fetchAllGalleries.rejected, (state, action) => {
                state.isLoading = false;
                return state;
            })
            .addCase(fetchAllGalleries.fulfilled, (state, action) => {
                const galleries = action.payload.data;
                state.galleries = galleries;
                state.isLoading = false;
                return state;
            })
            //delete gallery by id
            .addCase(fetchDeleteGallery.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.galleryChanged = false;
                MySwal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: 'Thất bại!',
                    text: `Xóa ảnh thất bại!`,
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
            .addCase(fetchDeleteGallery.pending, (state, action) => {
                state.isLoading = true;
                state.galleryChanged = false;
                return state;
            }
            )
            .addCase(fetchDeleteGallery.fulfilled, (state, action) => {
                const data = action.payload;
                const list = state.galleries.filter(item => item.id !== data);
                state.galleries = list
                state.galleryChanged = true;
                state.isLoading = true;
                MySwal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: 'Thành công!',
                    text: `Xóa ảnh thành công!`,
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
            .addCase(fetchCreateGallery.rejected, (state, action) => {
                state.isLoading = false;
                state.galleryChanged = false;
                MySwal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: 'Thất bại!',
                    text: `Thêm ảnh thất bại!`,
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
            .addCase(fetchCreateGallery.pending, (state, action) => {
                state.isLoading = true;
                state.galleryChanged = false;
                return state;
            }
            )
            .addCase(fetchCreateGallery.fulfilled, (state, action) => {
                state.galleryChanged = true;
                state.isLoading = true;
                MySwal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: 'Thành công!',
                    text: `Thêm ảnh thành công!`,
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
            .addCase(fetchUpdateGallery.rejected, (state, action) => {
                state.isLoading = false;
                state.galleryChanged = false;
                MySwal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: 'Thất bại!',
                    text: `Cập nhật ảnh thất bại!`,
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
            .addCase(fetchUpdateGallery.pending, (state, action) => {
                state.isLoading = true;
                state.galleryChanged = false;
                return state;
            }
            )
            .addCase(fetchUpdateGallery.fulfilled, (state, action) => {
                state.galleryChanged = true;
                state.isLoading = true;
                MySwal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: 'Thành công!',
                    text: `Cập nhật ảnh thành công!`,
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
const galleryReducer = gallerySlice.reducer;
export default galleryReducer;
export { fetchUpdateGallery, fetchCreateGallery, fetchDeleteGallery, fetchAllGalleries };

