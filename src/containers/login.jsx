import React from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { TextInput, Button } from 'react-materialize';
import { auth } from '../api';
import './login-signup.css';

// TODO: add redirect to from path (populated in redirect_routes PrivateRoute)
class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      formErrors: '',
      // emailValid: false,
      // formValid: false,

    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    let errorMsg = '';
    if (!email || !password) {
      errorMsg = 'All fields must be filled in!';
    }

    this.setState({ formErrors: errorMsg });
    if (errorMsg) {
      return;
    }

    auth.login(email, password).then((result) => {
      const { success } = result;

      if (!success) {
        console.log('error logging in');
        console.log(result.error);
        return;
      }

      const { token } = result;
      localStorage.setItem('JWT', token);


      // TODO: feedback
      console.log('successful signup');
      const { history } = this.props;
      history.push('/dashboard');
    });
  }

  render() {
    const { email, password, formErrors } = this.state;
    return (
      <div className="page-container">
        <div className="login-signup">
          <h1>Squeegee</h1>
          {!!formErrors && <span className="login-signup-error">{formErrors}</span>}
          <form className="form-inline" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <TextInput
                style={{ color: 'white' }}
                email
                validate
                icon="email"
                label="Email"
                name="email"
                value={email}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <TextInput
                style={{ color: 'white' }}
                password
                icon="vpn_key"
                label="Password"
                name="password"
                value={password}
                onChange={this.handleChange}
              />
            </div>
            <Button type="submit" waves="light">
              Login
            </Button>
            <Link className="btn account-btn" to="/signup">
              Create New Account
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
