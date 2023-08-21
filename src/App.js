import React from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import { useAuthContextValues } from './context/auth-context';

function App() {
const { isLoggedIn } = useAuthContextValues();
  return (
    <React.Fragment>
      <MainHeader />
      <main>
        {!isLoggedIn && <Login />}
        {isLoggedIn && <Home />}
      </main>
    </React.Fragment>
  );
}

export default App;
