import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from './features/counter/counterSlice'
import CryptoList from './components/CryptoList';
import UserList1 from './components/UserList1';
import UserList2 from './components/UsersList2';

function App() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <CryptoList />
      {/* <UserList1 /> */}
      <UserList2 />
    </div>
  )
}

export default App
