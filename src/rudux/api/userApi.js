import { api } from "./index";

const usersApi = api.injectEndpoints({
   endpoints: (build) => ({
      user: build.query({
         query: () => ({
            url: "users?page=2",
            method: "GET"
         }),
         providesTags: ["USERS"],
      }),
      userDelete: build.mutation({
         query: (id) => ({
            url: `users/${id}`,
            method: "DELETE",
         }),
         invalidatesTags: ["USERS"],
      }),
      userCreate: build.mutation({
         query: (body) => ({
            url: `users`,
            method: "POST",
            body,
         }),
         invalidatesTags: ["USERS"],
      }),
   }),
});

export const { useUserQuery, useUserDeleteMutation, useUserCreateMutation } = usersApi