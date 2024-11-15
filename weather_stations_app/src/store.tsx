import { combineReducers, configureStore } from "@reduxjs/toolkit"
import dataReducer from "./slices/dataSlice"

const rootReducer = combineReducers({ourData: dataReducer})
export default configureStore({
    reducer: rootReducer
})
export type RootState = ReturnType<typeof rootReducer>