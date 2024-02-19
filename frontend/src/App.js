import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Rooms from './component/Room.jsx';
import RoomDetails from './component/RoomDetails.jsx';
import './App.css';

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://attendance-green-five.vercel.app/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        onLogin();
      } else {
        setError("INVALID USERNAME OR PASSWORD");
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-wrapper">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Invigilator Login </h1>
        <h5>Login to your account.</h5>
        
        <label className="form-label">
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-input"
          />
        </label>
        <label className="form-label">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
          />
        </label>
        <button type="submit" className="form-button">
          {loading ? 'Loading...' : 'Login'}
        </button>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
}

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogin = () => {
    setAuthenticated(true);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            authenticated ? (
              <>
                <Rooms />
              </>
            ) : (
              <LoginForm onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/:roomName"
          element={
            authenticated ? (
              <RoomDetails />
            ) : (
              <LoginForm onLogin={handleLogin} />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
