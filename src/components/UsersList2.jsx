import React from 'react';
import { useGetUsersQuery, useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation } from '../features/users/userSlice_2';

const UserList2 = () => {
    const { data: users, error, isLoading } = useGetUsersQuery();
    const [createUser] = useCreateUserMutation();
    const [updateUser] = useUpdateUserMutation();
    const [deleteUser] = useDeleteUserMutation();

    const handleCreate = async () => {
        const newUser = { username: 'newuser', password: 'password123' }; // Creating a new user
        await createUser(newUser);
    };

    const handleUpdate = async (id) => {
        const updatedUser = { id, username: 'updateduser', password: 'newpassword123' }; // Updating a user
        await updateUser(updatedUser);
    };

    const handleDelete = async (id) => {
        await deleteUser(id); // Deleting a user
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <button onClick={handleCreate}>Create User</button>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <h3>Username: {user.username}</h3>
                        <p>Password: {user.password}</p>
                        <button onClick={() => handleUpdate(user.id)}>Update</button>
                        <button onClick={() => handleDelete(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList2;
