import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPost, IUser } from "../utils/types";

// LEARN what else can fetchBaseQuery() do?

export const postsApi = createApi({
  reducerPath: "postsAPi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  endpoints: (builder) => ({
    getPosts: builder.query<IPost[], string | void>({
      query: (userId) => {
        console.log("refetch");
        if (userId) {
          return `users/${userId}/posts`;
        }

        return "posts";
      },
    }),

    getAllUsers: builder.query<IUser[], void>({
      query: () => "users",
    }),

    getUser: builder.query<IUser, string>({
      query: (id) => `users/${id}`,
    }),
  }),
});

export const { useGetPostsQuery, useGetAllUsersQuery, useGetUserQuery } =
  postsApi;
