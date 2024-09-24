import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';
import cryptoReducer from './features/crypto/cryptoSlice';
import { usersApi } from './features/users/userSlice_2';
// import userReducer from './features/users/userSlice_1';

const store = configureStore({
    reducer: {
        counter: counterReducer,
        crypto: cryptoReducer,
        // user: userReducer,
        [usersApi.reducerPath]: usersApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(usersApi.middleware),
});

export default store;