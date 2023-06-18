import React, { useState } from 'react';
import styles from './Login.module.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await auth.login(email, password);
      console.log("Login successful!", response);
      navigate('/home');
    } catch (error) {
      console.error("Login failed", error);
    }
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className={styles.login}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <Link to="/signup" className={styles.signupLink}>Create a new account</Link>
    </div>
  );
};

export default Login;
