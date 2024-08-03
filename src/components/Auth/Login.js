// src/components/Login.js
import React, { Component } from 'react';
import { loginUser } from '../../api'; 
import { useNavigate } from 'react-router-dom';

class Login extends Component {
  state = {
    email: '',
    password: '',
    error: ''
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    try {
      const response = await loginUser(email, password);
      localStorage.setItem('token', response.data.token); // Store token in localStorage
      this.props.navigate('/todos'); // Redirect to /todos
    } catch (error) {
      this.setState({ error: error.response?.data?.error || 'Login failed. Please try again.' });
    }
  };

  render() {
    const { email, password, error } = this.state;

    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
        </form>
        {error && <p>{error}</p>}
      </div>
    );
  }
}

// Functional wrapper to provide `navigate` function to `Login` component
function LoginWithNavigate(props) {
  let navigate = useNavigate();
  return <Login {...props} navigate={navigate} />;
}

export default LoginWithNavigate;
