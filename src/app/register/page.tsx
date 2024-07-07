'use client';

import { useState } from 'react';
import styles from './styles.module.css';

interface DATA {
  fullname: string;
  username: string;
  email: string;
  password: string;
}

export default function Login() {
  const [data, setData] = useState({} as DATA);

  return (
    <div className={styles.loginContainer}>
      <div className={styles.container}>
        <div className={styles.background}>
          <div className={styles.shape}></div>
          <div className={styles.shape}></div>
        </div>
        <form className={styles.form}>
          <h1>Register</h1>

          <label htmlFor="fullname">Full Name</label>
          <input
            type="text"
            placeholder="Full Name"
            name="fullname"
            id="fullname"
            autoComplete="fullname"
            value={data.fullname}
            onChange={(e) => setData({ ...data, fullname: e.target.value })}
            required
          />

          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Username"
            name="username"
            id="username"
            autoComplete="username"
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            id="email"
            autoComplete="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            autoComplete="current-password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            required
          />

          <button type="submit">Register</button>
          <br />
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
}
