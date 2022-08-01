import './App.css';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './serve/firebase.js'

import SignIn from './components/SignIn'
import Chats from './components/Chats'

function App() {
  const [ user, loading, error ] = useAuthState(auth)

  return (
    <div className="App">
      <>
      {user ? <Chats /> : <SignIn />}
      </>
    </div>
  );
}

export default App;
