import { configureStore } from "@reduxjs/toolkit";
import drumReducer from './drumSlice';

const store = configureStore({
    reducer: {
        drum: drumReducer
    },
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;