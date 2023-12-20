import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPost, IUser } from "../utils/types";

// LEARN what else can fetchBaseQuery() do?

export const postsApi = createApi({
  reducerPath: "postsAPi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  endpoints: (builder) => ({
    getPosts: builder.query<IPost[], [string | null, string]>({
      query: ([userId, search]) => {
        let path = "posts";
        if (userId) {
          path = `users/${userId}/posts`;
        }

        if (search) {
          path += `?title_like=${search}`;
        }

        return path;
      },
    }),

    getUsersPostCnt: builder.query<number, string>({
      query: (userId) => {
        return `users/${userId}/posts`;
      },
      transformResponse: (response: IPost[]) => {
        return response.length;
      },
    }),

    getUsers: builder.query<IUser[], string | void>({
      query: (search) => {
        if (search) {
          return `users/?name_like=${search}`;
        }

        return "users";
      },
    }),

    getUser: builder.query<IUser, string>({
      query: (id) => `users/${id}`,
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetUsersQuery,
  useGetUserQuery,
  useGetUsersPostCntQuery,
} = postsApi;
