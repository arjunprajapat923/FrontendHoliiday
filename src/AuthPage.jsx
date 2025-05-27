import React, { useState, useEffect } from 'react';
import {
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logOut,
  auth
} from './Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

async function notifyBackend() {
  const user = auth.currentUser;
  if (user) {
    const idToken = await user.getIdToken();
    await fetch('http://localhost:8000/api/users/firebase-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
                  'Authorization': `Bearer ${idToken}`
       },
      body: JSON.stringify({ token: idToken }),
    });
  }
}

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [user, setUser] = useState(null);
  const [resetEmail, setResetEmail] = useState('');
  const [showReset, setShowReset] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogle = async () => {
    setLoading(true);
    setError('');
    try {
      await signInWithGoogle();
      await notifyBackend();
      navigate('/profile');
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (isRegister) {
        await registerWithEmailAndPassword(name, email, password);
      } else {
        await logInWithEmailAndPassword(email, password);
      }
      await notifyBackend();
      navigate('/profile');
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await sendPasswordReset(resetEmail);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleLogout = () => {
    logOut();
  };

  if (user) {
    return (
      <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-xl shadow-md text-center">
        <h2 className="text-xl font-semibold mb-4">Welcome, {user.displayName || user.email}</h2>
        <button
          className="w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-2xl text-black font-bold text-center mb-6">{isRegister ? 'Sign Up' : 'Sign In'}</h2>

      <button
        className="w-full py-2 bg-black text-white rounded-lg mb-4 hover:opacity-90"
        onClick={handleGoogle}
        disabled={loading}
      >
        Continue with Google
      </button>

      <div className="text-gray-400 text-center mb-4">or</div>

      <form onSubmit={handleSubmit} className="space-y-4 border-black">
        {isRegister && (
          <input
            type="text"
            placeholder="Name"
            className="w-full px-4 py-2 border  border-black rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
          disabled={loading}
        >
          {isRegister ? 'Sign Up' : 'Sign In'}
        </button>
      </form>

      <div className="mt-4 flex justify-between text-sm">
        <button
          onClick={() => setIsRegister((prev) => !prev)}
          className="text-blue-600 hover:underline"
          disabled={loading}
        >
          {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
        </button>
        <button
          onClick={() => setShowReset((prev) => !prev)}
          className="text-blue-600 hover:underline"
          disabled={loading}
        >
          Forgot Password?
        </button>
      </div>

      {showReset && (
        <form onSubmit={handleReset} className="mt-4 space-y-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-md"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            disabled={loading}
          >
            Send Password Reset
          </button>
        </form>
      )}

      {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
    </div>
  );
};

export default AuthPage;
