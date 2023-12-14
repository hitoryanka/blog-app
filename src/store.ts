import { configureStore } from "@reduxjs/toolkit";
import { postsApi } from "./features/posts";

export const store = configureStore({
  reducer: {
    [postsApi.reducerPath]: postsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware),
});

// LEARN what does this do?
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
