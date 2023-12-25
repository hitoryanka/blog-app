import { createSlice } from "@reduxjs/toolkit";
import { IAuthUser } from "../utils/types";

const currentUser = localStorage.getItem("currentUser");
const initialState: IAuthUser =
  currentUser !== null ? JSON.parse(currentUser) : {};

export const myPostsSlice = createSlice({
  name: "myPosts",
  initialState,
  reducers: {
    addPost(state, { payload }) {
      const newPost = {
        id: Date.now().toString(),
        title: payload.title as string,
        body: payload.body as string,
      };

      state.posts.push(newPost);

      // TODO maybe move it to middleware
      // TODO rewrite to RTK as extra reducer
      localStorage.setItem("currentUser", JSON.stringify(state));
    },

    removePost(state, { payload }) {
      state.posts = state.posts.filter(({ id }) => id !== payload);
      localStorage.setItem("currentUser", JSON.stringify(state));
    },

    updatePost(state, { payload }) {
      const postIndex = state.posts.findIndex((post) => post.id === payload.id);
      state.posts[postIndex] = {
        id: payload.id,
        body: payload.body,
        title: payload.title,
      };

      localStorage.setItem("currentUser", JSON.stringify(state));
    },

    addToFavorites(state, { payload }) {
      state.favorites.push(payload);
      console.log("added");
      localStorage.setItem("currentUser", JSON.stringify(state));
    },

    removeFromFavorites(state, { payload }) {
      state.favorites = state.favorites.filter((id) => id !== payload);
      console.log(JSON.parse(JSON.stringify(state)));
      localStorage.setItem("currentUser", JSON.stringify(state));
    },
  },
});

export const {
  addPost,
  updatePost,
  removePost,
  addToFavorites,
  removeFromFavorites,
} = myPostsSlice.actions;
