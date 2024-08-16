import { apiSlice } from "../apiSlice";

const USER_URL = "/user"

export const userApiSlice = apiSlice.injectEndpoints({
    //UPDATE USER PROFILE ENDPOINT
    endpoints: (builder) =>({
        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/profile`,
                method: "PUT",
                body: data,
                credentials: "include",
            }),
        }),

        // GET TEAM MEMBERS
        getTeamList: builder.query({
            query: (data) => ({
                url: `${USER_URL}/get-team`,
                method: "GET",
                body: data,
                credentials: "include",
            }),
        }),
        // DELETE USER

        deleteUser: builder.mutation({
            query: (id) => ({
                url: `${USER_URL}/${id}`,
                method: "DELETE",
                // body: data,
                credentials: "include",
            }),
        }),
    
        // USER ACTION
        userAction: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/${data.id}`,
                method: "PUT",
                body: data,
                credentials: "include",
            }),
        }),


    }),
});

export const { useUpdateUserMutation, useGetTeamListQuery,
     useDeleteUserMutation, useUserActionMutation } = userApiSlice;
