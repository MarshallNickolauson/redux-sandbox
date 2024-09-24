import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from './features/counter/counterSlice'
import CryptoList from './components/CryptoList';

function App() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <CryptoList />
    </div>
  )
}

export default App
