'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const correctPassword = 'nganya2025';

  const handleLogin = () => {
    if (password.trim() === correctPassword) {
      sessionStorage.setItem('access_granted', 'true');
      router.push('/upload'); // Direct to upload form
    } else {
      setError('Invalid password');
    }
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-black text-white px-4">
      <h1 className="text-3xl font-bold mb-4">🔒 Nganya Access</h1>

      <div className="w-full max-w-xs flex flex-col gap-2">
        <input
          type={showPassword ? 'text' : 'password'}
          className="px-4 py-2 text-black rounded"
          placeholder="Enter access code"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label className="flex items-center gap-2 text-sm text-gray-300">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(prev => !prev)}
          />
          Show password
        </label>

        <button
          onClick={handleLogin}
          className="mt-2 bg-green-600 px-6 py-2 rounded text-white hover:bg-green-700"
        >
          Unlock
        </button>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    </main>
  );
}
