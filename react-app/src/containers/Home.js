import React from 'react';
import { getUser, removeUserSession } from '../Utils/Common';
import history from '../Utils/History';

function Home(props) {
  const user = getUser();

  const handleLogout = () => {
    removeUserSession();
    history.push('/');
    window.location.reload();
  }

  return (
    <div>
      Welcome {user}<br /><br />
      <input type="button" onClick={handleLogout} value="Logout" />
    </div>
  );
}

export default Home;