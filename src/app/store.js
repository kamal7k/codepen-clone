import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "../features/auth/userApi";
import { userSlice } from "../features/auth/userSlice";





export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,

    [userSlice.name]: userSlice.reducer,


  },
  middleware: (getDefaultMiddlware) => getDefaultMiddlware().concat([

    userApi.middleware,

  ])
})