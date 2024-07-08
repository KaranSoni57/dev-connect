'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {API_URLS} from '../apiConfig';
import Link from 'next/link';
import GlassContainer from '../components/GlassContainer/GlassContainer';

interface UserData {
  fullName: string;
  username: string;
  email: string;
  password: string;
}

export default function Register() {
  const [userData, setUserData] = useState<UserData>({
    fullName: '',
    username: '',
    email: '',
    password: '',
  });
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(API_URLS.REGISTER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      router.push('/login');
    } catch (error: any) {
      setError(error.message);
      console.error('Registration error:', error.message);
    }
  };

  return (
    <GlassContainer maxWidth="400px">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Register</h1>

        <p className="error">{error}</p>

        <label htmlFor="fullName">Full Name</label>
        <input
          type="text"
          placeholder="Full Name"
          name="fullName"
          id="fullName"
          autoComplete="name"
          value={userData.fullName}
          onChange={e => setUserData({...userData, fullName: e.target.value})}
          required
        />

        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="Username"
          name="username"
          id="username"
          autoComplete="username"
          value={userData.username}
          onChange={e => setUserData({...userData, username: e.target.value})}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Email"
          name="email"
          id="email"
          autoComplete="email"
          value={userData.email}
          onChange={e => setUserData({...userData, email: e.target.value})}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          name="password"
          id="password"
          autoComplete="current-password"
          value={userData.password}
          onChange={e => setUserData({...userData, password: e.target.value})}
          required
        />

        <button type="submit">Register</button>
        <br />
        <p>
          Already have an account? <Link href={'/login'}>Login</Link>
        </p>
      </form>
    </GlassContainer>
  );
}
