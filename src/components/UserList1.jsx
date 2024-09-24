import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, createUser, deleteUser, updateUser } from '../features/users/userSlice_1'; 

const UserList1 = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const { users, status, error } = useSelector((state) => state.user);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchUsers());
        }
    }, [dispatch, status]);

    const handleSetUsername = (e) => {
        setUsername(e.target.value);
    };

    const handleSetPassword = (e) => {
        setPassword(e.target.value);
    };

    const handleCreate = (e) => {
        e.preventDefault();

        if (username && password) {
            const newUser = { username, password };
            dispatch(createUser(newUser));

            setUsername('');
            setPassword('');
        }
    };
    
    const handleEdit = (user) => {
        const updatedUser = { 
            id: user.id, 
            username: user.username + "a",
            password: user.password + "a",
        }
        dispatch(updateUser(updatedUser));
    };

    const handleDelete = (id) => {
        dispatch(deleteUser(id));
    };

    if (status === 'loading') return <div>Loading Users...</div>;
    if (status === 'failed') return <div>Error: {error}</div>;

    return (
        <div>
            {/* Form to create a new user */}
            <div className='flex flex-row'>
                <form onSubmit={handleCreate}>
                    <input
                        type="text"
                        value={username}
                        onChange={handleSetUsername}
                        className='border-gray-500 border-2 rounded'
                        placeholder='Username'
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={handleSetPassword}
                        className='border-gray-500 border-2 rounded'
                        placeholder='Password'
                    />
                    <button type='submit' className='ml-2'>Create</button>
                </form>
            </div>

            {/* Display the list of users */}
            {users.map((user) => (
                <div key={user.id} className='flex flex-row space-x-6'>
                    <h1>{user.id} - {user.username} - {user.password}</h1>
                    <button onClick={() => handleEdit(user)}>Edit</button>
                    <button onClick={() => handleDelete(user.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default UserList1;
