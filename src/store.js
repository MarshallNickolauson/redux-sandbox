import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';
import cryptoReducer from './features/crypto/cryptoSlice';
import userReducer from './features/users/userSlice_1';

const store = configureStore({
    reducer: {
        counter: counterReducer,
        crypto: cryptoReducer,
        user: userReducer,
    },
});

export default store;