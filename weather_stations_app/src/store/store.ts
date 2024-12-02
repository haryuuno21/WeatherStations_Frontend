import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { dataReducer } from "./data/slice";

export const store = configureStore({
    reducer: combineReducers({
        data: dataReducer,
    }),
});