import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
    tagTypes: ['User'], // Tag used to invalidate cache after mutations
    endpoints: (builder) => ({

        // 1. Fetch all users (GET)
        getUsers: builder.query({
            query: () => '/users',
            providesTags: (result) => result ? [...result.map(({ id }) => ({ type: 'User', id })), 'User'] : ['User'],
        }),

        // 2. Create a new user (POST)
        createUser: builder.mutation({
            query: (newUser) => ({
                url: '/users',
                method: 'POST',
                body: newUser,
            }),
            invalidatesTags: ['User'],
        }),

        // 3. Update a user (PUT)
        updateUser: builder.mutation({
            query: ({ id, ...updatedUser }) => ({
                url: `/users/${id}`,
                method: 'PUT',
                body: updatedUser,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
        }),

        // 4. Delete a post (DELETE)
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'User', id }],
        }),
    }),
});


// Auto-generated hooks for the queries and mutations. You customize the name on export
export const {
    useGetUsersQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = usersApi;