import { api } from "./index";

const usersApi = api.injectEndpoints({
   endpoints: (build) => ({
      user: build.query({
         query: () => ({
            url: "users?page=2",
            method: "GET"
         }),
      }),
      userDelete: build.mutation({
         query: (id) => ({
            url: `users/${id}`,
            method: "DELETE",
         }),
      }),
   }),
});

export const { useUserQuery, useUserDeleteMutation } = usersApi