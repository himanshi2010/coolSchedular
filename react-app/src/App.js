import React, { useState } from 'react';
import { BrowserRouter , Route, NavLink } from 'react-router-dom';
import { Routes } from 'react-router';
import history from './Utils/History';

import Login from './containers/Login';
import Home from './containers/Home';
import './App.css'
import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';
import { getToken } from './Utils/Common';
import Schedule from './Schedule';
import PageNotFound from './containers/PageNotFound';

function App() {
  const [authLoading, setAuthLoading] = useState(false);

  // useEffect(() => {
  //   const token = getToken();
  //   if (!token) {
  //     return;
  //   }

  //   axios.get(`http://localhost:3001/verifyToken?token=${token}`).then(response => {
  //     setUserSession(response.data.token, response.data.user);
  //     setAuthLoading(false);
  //   }).catch(error => {
  //     removeUserSession();
  //     setAuthLoading(false);
  //   });
  // }, []);

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }

  return (
    <div className="App">
      <BrowserRouter history = {history}>
        <div>
          <div className="content">
            <Routes>
              <Route exact path="/" element={<PublicRoute component = {Login}/>} />
              <Route path="/home" element={<PrivateRoute component = {Home}/>} />
              <Route path="/schedule" element={<PrivateRoute component = {Schedule}/>} />
              <Route path="*" element={<PageNotFound/>} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;