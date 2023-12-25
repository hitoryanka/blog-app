// TODO create this slice and rename myPosts to usersPosts

import { createSlice } from "@reduxjs/toolkit";
import { ILocalStorage } from "../utils/types";

const getInitialState = (): ILocalStorage => {
  const currentUser = localStorage.getItem("currentUser");
  const users = localStorage.getItem("users");

  const initialState: ILocalStorage = {
    currentUser: currentUser !== null ? JSON.parse(currentUser) : currentUser,
    users: users !== null ? JSON.parse(users) : [],
  };

  return initialState;
};

export const usersSlice = createSlice({
  name: "loggedUser",
  initialState: getInitialState(),
  reducers: {
    updateCurrentUser(state, { payload }) {
      state.currentUser = payload;

      localStorage.setItem("currentUser", JSON.stringify(payload));
    },

    addUser(state, { payload }) {
      state.users.push(payload);

      localStorage.setItem("users", JSON.stringify(payload));
    },
  },
});

export const { updateCurrentUser, addUser } = usersSlice.actions;
