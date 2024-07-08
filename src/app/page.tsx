'use client';

import {useEffect, useState} from 'react';
import styles from './styles.module.css';
import {useRouter} from 'next/navigation';
import {API_URLS} from './apiConfig';
import GlassContainer from './components/GlassContainer/GlassContainer';

interface UserData {
  givenName: string;
  familyName: string;
  username: string;
  email: string;
}

export default function Profile() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user profile data with authentication token
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }
      try {
        const response = await fetch(API_URLS.PROFILE, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const responseData = await response.json();
        setUserData(responseData.data);
        setLoading(false);
      } catch (error: any) {
        console.error('Error fetching user profile:', error.message);
        router.push('/login');
      }
    };

    fetchUserProfile();
  }, [router]);

  return (
    <GlassContainer maxWidth="400px">
      <h1>User Profile</h1>
      {loading && (
        <div>
          <div className={styles.name}>
            <p>Loading...</p>
          </div>
          <div className={styles.email}>
            <p>Loading...</p>
          </div>
        </div>
      )}
      {userData && (
        <div>
          <div className={styles.name}>
            {userData.givenName + ' ' + userData.familyName}
          </div>
          <div className={styles.email}>{userData.email}</div>
        </div>
      )}
    </GlassContainer>
  );
}
