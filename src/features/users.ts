// TODO create this slice and rename myPosts to usersPosts

import { createSlice } from "@reduxjs/toolkit";
import { ILocalStorage } from "../utils/types";
import { getUsers } from "../utils/lib";

const getInitialState = (): ILocalStorage => {
  const currentUser = localStorage.getItem("currentUser");
  const users = localStorage.getItem("users");

  const initialState: ILocalStorage = {
    currentUser: currentUser !== null ? JSON.parse(currentUser) : currentUser,
    users: JSON.parse(users ?? "[]"),
  };

  return initialState;
};

export const usersSlice = createSlice({
  name: "loggedUser",
  initialState: getInitialState(),
  reducers: {
    updateCurrentUser(state, { payload }) {
      if (state.currentUser !== null) {
        const index = state.users.findIndex(
          (user) => state.currentUser?.username === user.username
        );
        state.users[index] = state.currentUser;

        localStorage.setItem("users", JSON.stringify(state.users));
      }

      state.currentUser = payload;

      if (payload === null) {
        localStorage.removeItem("currentUser");
        return;
      }

      localStorage.setItem("currentUser", JSON.stringify(payload));
    },

    addUser(state, { payload }) {
      state.users.push(payload);

      localStorage.setItem("users", JSON.stringify(state.users));
    },

    removePost(state, { payload }) {
      if (state.currentUser === null) {
        return;
      }
      state.currentUser.posts = state.currentUser.posts.filter(
        ({ id }) => id !== payload
      );
      localStorage.setItem("currentUser", JSON.stringify(state.currentUser));

      const users = getUsers();
      const index = users.findIndex(
        (user) => user.username === state.currentUser.username
      );

      users[index] = state.currentUser;
      localStorage.setItem("users", JSON.stringify(users));
    },
    addPost(state, { payload }) {
      if (state.currentUser === null) {
        return;
      }
      const newPost = {
        id: Date.now().toString(),
        title: payload.title as string,
        body: payload.body as string,
      };

      state.currentUser.posts.push(newPost);

      localStorage.setItem("currentUser", JSON.stringify(state));
      const users = getUsers();
      const index = users.findIndex(
        (user) => user.username === state.currentUser.username
      );

      users[index] = state.currentUser;
      localStorage.setItem("users", JSON.stringify(users));
    },

    updatePost(state, { payload }) {
      if (state.currentUser === null) {
        return;
      }
      const postIndex = state.currentUser.posts.findIndex(
        (post) => post.id === payload.id
      );
      state.currentUser.posts[postIndex] = {
        id: payload.id,
        body: payload.body,
        title: payload.title,
      };

      localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
      const users = getUsers();
      const index = users.findIndex(
        (user) => user.username === state.currentUser.username
      );

      users[index] = state.currentUser;
      localStorage.setItem("users", JSON.stringify(users));
    },

    addToFavorites(state, { payload }) {
      if (state.currentUser === null) {
        return;
      }
      state.currentUser.favorites.push(payload);

      localStorage.setItem("currentUser", JSON.stringify(state));
      const users = getUsers();
      const index = users.findIndex(
        (user) => user.username === state.currentUser.username
      );

      users[index] = state.currentUser;
      localStorage.setItem("users", JSON.stringify(users));
    },

    removeFromFavorites(state, { payload }) {
      if (state.currentUser === null) {
        return;
      }
      state.currentUser.favorites = state.currentUser.favorites.filter(
        (id) => id !== payload
      );

      localStorage.setItem("currentUser", JSON.stringify(state));
      const users = getUsers();
      const index = users.findIndex(
        (user) => user.username === state.currentUser.username
      );

      users[index] = state.currentUser;
      localStorage.setItem("users", JSON.stringify(users));
    },
  },
});

export const {
  updateCurrentUser,
  addUser,
  addPost,
  updatePost,
  removePost,
  addToFavorites,
  removeFromFavorites,
} = usersSlice.actions;
