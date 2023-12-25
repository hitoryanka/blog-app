import { configureStore } from "@reduxjs/toolkit";
import { postsApi } from "./features/posts";
import { myPostsSlice } from "./features/myPosts";
import { IAuthUser, ILocalStorage } from "./utils/types";
import { usersSlice } from "./features/users";

export interface IState {
  myPosts: IAuthUser;
  users: ILocalStorage;
}

export const store = configureStore({
  reducer: {
    [postsApi.reducerPath]: postsApi.reducer,
    myPosts: myPostsSlice.reducer,
    users: usersSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware),
});

// LEARN what does this do?
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
