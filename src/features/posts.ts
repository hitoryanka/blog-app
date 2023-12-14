import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPost } from "../App";

export const postsApi = createApi({
  reducerPath: "postsAPi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (builder) => ({
    getAllPosts: builder.query<IPost[], void>({
      query: () => "posts",
    }),
  }),
});

export const { useGetAllPostsQuery } = postsApi;
