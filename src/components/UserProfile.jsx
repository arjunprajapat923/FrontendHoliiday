import React, { useEffect, useState } from 'react';
import { auth } from '../Firebase';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DEFAULT_PROFILE_IMAGE = 'data:image/jpeg;base64,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';

const UserProfile = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState('');
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [imgSrc, setImgSrc] = useState(DEFAULT_PROFILE_IMAGE);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const token = await user.getIdToken();
          const res = await axios.post(
            'http://localhost:8000/api/users/firebase-login',
            { token },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setCurrentUser(res.data.user);
          setImgSrc(res.data.user.image || DEFAULT_PROFILE_IMAGE);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch user data');
      }
    };
    fetchUserData();
  }, []);

  // 3D tilt effect handlers
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 15; // max 15deg
    const rotateY = ((x - centerX) / centerX) * 15;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-800">
      <div className="bg-white shadow-md p-8 flex flex-col items-center justify-center rounded-xl w-full max-w-md">
        {currentUser ? (
          <>
            <div
              className="w-24 h-24 mb-2"
              style={{ perspective: '600px' }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={imgSrc}
                alt="profile"
                className="w-24 h-24 rounded-full"
                onError={() => setImgSrc(DEFAULT_PROFILE_IMAGE)}
                style={{
                  transform: `rotateX(${-tilt.x}deg) rotateY(${tilt.y}deg)`,
                  transition: tilt.x === 0 && tilt.y === 0 ? 'transform 0.3s' : 'transform 0.05s',
                }}
              />
            </div>
            <h2 className="text-xl font-semibold">{currentUser.name}</h2>
            <p className="text-sm text-gray-600">{currentUser.email}</p>
            {currentUser.qrCode && (
              <img src={currentUser.qrCode} alt="QR Code" className="mt-2 mx-auto" />
            )}
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
              onClick={() => navigate('/all-users')}
            >
              View All Users
            </button>
          </>
        ) : (
          <p>Loading profile...</p>
        )}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default UserProfile;
