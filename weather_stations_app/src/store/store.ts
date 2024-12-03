import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { dataReducer } from "./data/slice";
import { userReducer } from './user';
import { reportReducer } from './report';

export const store = configureStore({
    reducer: combineReducers({
        data: dataReducer,
        user: userReducer,
        report: reportReducer,
    }),
});