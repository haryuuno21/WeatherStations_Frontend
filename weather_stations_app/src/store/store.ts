import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { dataReducer } from "./data/slice";
import { userReducer } from './user';

export const store = configureStore({
    reducer: combineReducers({
        data: dataReducer,
        user: userReducer,
    }),
});