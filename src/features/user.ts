// TODO create this slice and rename myPosts to usersPosts

import { createSlice } from "@reduxjs/toolkit";
import { IAuthUser } from "../utils/types";

const getCurrentUser = (): IAuthUser | null => {
  const user = localStorage.getItem("currentUser");

  return user !== null ? JSON.parse(user) : user;
};

export const loggedUserSLice = createSlice({
  name: "loggedUser",
  initialState: getCurrentUser(),
  reducers: {
    setUser(state) {
      state = getCurrentUser();
    },
  },
});

export const { setUser } = loggedUserSLice.actions;
