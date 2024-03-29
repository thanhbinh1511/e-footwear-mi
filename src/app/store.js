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
import productReducer from "~/redux/product/productSlice";
import productDetailReducer from "~/redux/product-detail/productDetailSlice";
import authReducer from "~/redux/auth/authSlice";
import addressReducer from "~/redux/address/addressSlice";
import orderReducer from "~/redux/order/orderSlice";
import customerReducer from "~/redux/customer/customerSlice";
import orderStatusReducer from "~/redux/order-status/orderStatusSlice";
import { AUTH_LOGOUT } from "~/redux/auth/authType";

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
    productReducer: productReducer,
    productDetailReducer: productDetailReducer,
    authReducer: authReducer,
    addressReducer: addressReducer,
    orderReducer: orderReducer,
    customerReducer: customerReducer,
    orderStatusReducer: orderStatusReducer,

});
//----
const appReducer = (state, action) => {
    if (action.type === AUTH_LOGOUT + "/fulfilled") {
        return rootReducer(undefined, action);
    }

    return rootReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, appReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            // serializableCheck: {
            //     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            //     ignoredActionPaths: ["payload.headers"],
            // },
            serializableCheck: false,
            immutableCheck: false,
        }),
});

export const persistor = persistStore(store);
