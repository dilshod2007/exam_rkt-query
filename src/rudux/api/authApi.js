import { api } from "./index";

const authAPi = api.injectEndpoints({
   endpoints: (build) => ({
      userLogin: build.mutation({
         query: (body) => ({
            url: "/login",
            method: "POST",
            body,
         }),
      }),
      userSignUp: build.mutation({
         query: (body) => ({
            url: "/register",
            method: "POST",
            body,
         }),
      }),
   }),
});

export const { useUserLoginMutation, useUserSignUpMutation } = authAPi