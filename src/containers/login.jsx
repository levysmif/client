import React from 'react';
import './login-signup.css';

function Login() {
  return (
    <div className="login">
      <h1>Squeegee</h1>
      <div className="form-inline">
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="&#xf0e0;   Email"
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="password"
            placeholder="&#xf084;   Password"
          />
        </div>
        <p>Forgot Password?</p>
        <button
          className="btn btn-primary"
          type="button"
        >
        Login
        </button>
        <button
          className="btn btn-primary"
          id="newAccount"
          type="button"
        >
        Create New Account
        </button>
      </div>
    </div>
  );
}

export default Login;