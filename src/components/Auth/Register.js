import React, { Component } from 'react';
import { registerUser } from '../../api';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

class Register extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    success: ''
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    try {
      const response = await registerUser(email, password);
      localStorage.setItem('token', response.data.token);
      this.setState({ success: 'Registration successful!' });
      this.props.navigate('/todos');
    } catch (err) {
      this.setState({ error: err.response?.data?.error || 'Registration failed' });
    }
  };

  render() {
    return (
      <div className="auth-container">
        <form onSubmit={this.handleSubmit}>
          <h2>Register</h2>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
          <button type="submit">Register</button>
          <p className="success">{this.state.success}</p>
          <p className="error">{this.state.error}</p>
        </form>
      </div>
    );
  }
}

export default function RegisterWithNavigate(props) {
  const navigate = useNavigate();
  return <Register {...props} navigate={navigate} />;
}
