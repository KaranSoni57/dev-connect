'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {API_URLS} from '../apiConfig';
import Link from 'next/link';
import GlassContainer from '../components/GlassContainer/GlassContainer';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(API_URLS.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const resData = await response.json();
      console.log(resData);
      const token = resData.data.token;

      localStorage.setItem('token', token);

      router.push('/');
    } catch (error: any) {
      setError('Login failed. Please try again.');
      console.error('Login error:', error.message);
    }
  };

  return (
    <GlassContainer maxWidth="400px">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Login</h1>

        <p className="error">{error}</p>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Email"
          name="email"
          id="email"
          autoComplete="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          name="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
        <br />
        <p>
          {"Don't"} have an account? <Link href="/register">Register</Link>
        </p>
      </form>
    </GlassContainer>
  );
}
