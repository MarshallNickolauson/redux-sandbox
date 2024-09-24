import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    cryptos: [],
    status: 'idle',
    error: null
};

export const fetchCryptos = createAsyncThunk('crypto/fetchCryptos', async () => {
    const res = await axios.get('https://api.xeggex.com/api/v2/market/getbysymbol/btc_usdt', {
        params: {
            symbol: 'BTC_USDT'
        },
    });
    return res.data;
});

const cryptoSlice = createSlice({
    name: 'crypto',
    initialState,
    reducers: {}, // no synchronous reducers in this example
    extraReducers: (builder) => {
        builder
            .addCase(fetchCryptos.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCryptos.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.cryptos = action.payload;
            })
            .addCase(fetchCryptos.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default cryptoSlice.reducer;