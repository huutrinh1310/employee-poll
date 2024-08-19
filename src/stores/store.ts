import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import sidebarReducer from "./features/sidebar/slice";
import authenReducer from "./features/auth/authSlice";
import questionReducer from "./features/question/questionSlice";
import userReducer from "./features/users/userSlice";
import logger from "redux-logger";

const rootReducer = combineReducers({
  sidebar: sidebarReducer,
  authen: authenReducer,
  question: questionReducer,
  users: userReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["sidebar", "authen"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(logger),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
