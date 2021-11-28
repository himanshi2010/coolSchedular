import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from '../Utils/Common';
import history from '../Utils/History';
import "./Login.css"

function Login(props) {
  const [loading, setLoading] = useState(false);
  const email = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null); 

  const handleLogin = function () {
    setError(null);
    setLoading(true);
    axios.post('http://localhost:3001/login', { data: {email: email.value, password: password.value} }).then(response => {
      setLoading(false);
      setUserSession(response.data.payload.token, response.data.payload.firstName);
      history.push("/home");
      window.location.reload();
    }).catch(error => {
      setLoading(false);
      // setError(error.response.data.message);
    });
  }

  return (
    <div>
    <div className="main">
      <div className="sign">Login</div><br /><br />
      <div >
        {/* Email<br /> */}
        <input className="un" placeholder="Email-Id" type="text" {...email} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
        {/* Password<br /> */}
        <input className="pass" placeholder="Password" type="password" {...password} autoComplete="new-password" />
      </div>
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <input className="submit" type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />
    </div>
      For testing purposes, you can use 'name@sample.com' and 'password123' as email-id and password resp.
    </div>
  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

export default Login;