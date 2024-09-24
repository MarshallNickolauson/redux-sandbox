import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:8000/users';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const res = await axios.get(BASE_URL);
    return res.data;
});

export const createUser = createAsyncThunk('users/createUser', async (newUser) => {
    const res = await axios.post(BASE_URL, newUser);
    return res.data;
});

export const updateUser = createAsyncThunk('users/updateUser', async (updatedUser) => {
    const { id, ...data } = updatedUser;
    const res = await axios.put(`${BASE_URL}/${id}`, data);
    return res.data;
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
    await axios.delete(`${BASE_URL}/${id}`);
    return id;
});

const userSlice_1 = createSlice({
    name: 'users',
    initialState: {
        users: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
        
            .addCase(createUser.fulfilled, (state, action) => {
                state.users.push(action.payload);
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                const index = state.users.findIndex(user => user.id === action.payload.id);
                state.users[index] = action.payload;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter(user => user.id !== action.payload);
            });
    },
});

export default userSlice_1.reducer;