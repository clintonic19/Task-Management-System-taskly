
import { apiSlice } from "../apiSlice"

const AUTH_URL = "/user"

export const authApiSlice = apiSlice.injectEndpoints({
    //LOGIN ENDPOINT
    endpoints: (builder) =>({
        login: builder.mutation({
            query: (data) => ({
                url: `${ AUTH_URL }/login`,
                method: "POST",
                body: data,
                credentials: "include",
            }),
        }),

        //REGISTER ENDPOINT
        register: builder.mutation({
            query: (data) => ({
                url: `${ AUTH_URL }/register`,
                method: "POST",
                body: data,
                credentials: "include",
            }),
        }),

        //LOGOUT
        logout: builder.mutation({
            query: () => ({
                url: `${ AUTH_URL }/logout`,
                method: "POST",
                credentials: "include",
            }),
        }),
        
    }),
});

export const {useLoginMutation, useRegisterMutation, useLogoutMutation} = authApiSlice