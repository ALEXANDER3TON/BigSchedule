import { combineReducers, configureStore } from "@reduxjs/toolkit";
import dateTimeSlice from "./Slice/dateTime.slice";

const rootReducer = combineReducers({
  [dateTimeSlice.name]: dateTimeSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
