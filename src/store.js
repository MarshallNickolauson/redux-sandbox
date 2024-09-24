import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';
import cryptoReducer from './features/crypto/cryptoSlice'

const store = configureStore({
    reducer: {
        counter: counterReducer,
        crypto: cryptoReducer,
    },
});

export default store;