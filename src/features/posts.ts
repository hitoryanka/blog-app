import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPost, IUser } from "../utils/types";

export const postsApi = createApi({
  reducerPath: "postsAPi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  endpoints: (builder) => ({
    getAllPosts: builder.query<IPost[], void>({
      query: () => "posts",
    }),
    getAllUsers: builder.query<IUser[], void>({
      query: () => "users",
    }),

    getUser: builder.query<IUser, number>({
      query: (id) => `users/${id}`,
    }),
  }),
});

export const { useGetAllPostsQuery, useGetAllUsersQuery, useGetUserQuery } =
  postsApi;
