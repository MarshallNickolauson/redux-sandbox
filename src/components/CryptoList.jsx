import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCryptos } from '../features/crypto/cryptoSlice';

const CryptoList = () => {
    const dispatch = useDispatch();
    const crypto = useSelector((state) => state.crypto.cryptos);
    const status = useSelector((state) => state.crypto.status);
    const error = useSelector((state) => state.crypto.error);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCryptos());
        }
    }, [dispatch, status]);

    if (status === 'loading') {
        return <div>Loading cryptocurrencies...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2 className="text-xl font-bold">Cryptocurrency: {crypto.symbol}</h2>
            <ul className="space-y-4">
                <li className="p-4 bg-gray-100 rounded-lg">
                    <div className="flex justify-between">
                        <div>
                            <p className="font-bold">Primary Name: {crypto.primaryName}</p>
                            <p className="text-sm text-gray-500">Symbol: {crypto.symbol}</p>
                        </div>
                        <div>
                            <p className="text-lg font-bold">Last Price: ${crypto.lastPrice}</p>
                            <p className="text-sm">High Price: ${crypto.highPrice}</p>
                            <p className="text-sm">Low Price: ${crypto.lowPrice}</p>
                            <p className="text-sm">Volume: {crypto.volume}</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default CryptoList;
