import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// reducers
import sizeReducer from "~/redux/size/sizesSlice";
import colorReducer from "~/redux/color/colorsSlice";
import categoryReducer from "~/redux/category/categoriesSlice";
import galleryReducer from "~/redux/gallery/galleriesSlice";
import typeGalleryReducer from "~/redux/type-gallery/typeGalleriesSlice";
import couponReducer from "~/redux/coupon/couponsSlice";
const persistConfig = {
    key: "root",
    storage,
};
// const userPersistConfig ={
//     key:"user",
//     sessionStorage,
//     whitelist:['authReducer']
// }

const rootReducer = combineReducers({
    sizeReducer: sizeReducer,
    colorReducer: colorReducer,
    galleryReducer: galleryReducer,
    categoryReducer: categoryReducer,
    typeGalleryReducer: typeGalleryReducer,
    couponReducer: couponReducer,

});
//----
const appReducer = (state, action) => {
    if (action.type === "AUTH_LOGOUT" + "/fulfilled") {
        return rootReducer(undefined, action);
    }

    return rootReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, appReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                ignoredActionPaths: ["payload.headers"],
            },
        }),
});

export const persistor = persistStore(store);
