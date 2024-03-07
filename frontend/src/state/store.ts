import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import persistStore from "redux-persist/es/persistStore";
import * as authReducers from "./reducers/authReducers";

const rootReducer = combineReducers({
  registerUser: authReducers.registerUserReducer,
  loginUser: authReducers.loginUserReducer,
  logoutUser: authReducers.logoutUserReducer,
  resetPassword: authReducers.resetPasswordReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);

export const removeStoreData = () => {
  persistor.pause();
  persistor.flush().then(() => {
    return persistor.purge();
  });
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
