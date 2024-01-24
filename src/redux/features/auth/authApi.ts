import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (loginCredential) => ({
        url: "/auth/login",
        method: "POST",
        body: loginCredential,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
