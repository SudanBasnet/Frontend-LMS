import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import bookReducer from "../features/book/bookSlice";
import cartReducer from "../features/cart/cartSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/es/storage/index.js";

const cartPersistConfig = {
  key: "cart",
  storage,
  whitelist: ["cart"],
};

const rootReducer = combineReducers({
  userInfo: userReducer,
  bookInfo: bookReducer,
  cartInfo: persistReducer(cartPersistConfig, cartReducer),
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export default store;
