'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const [nganyaName, setNganyaName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [imageData, setImageData] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageData(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const displayId = nganyaName.replace(/\s+/g, '-').toLowerCase();

    const newNganya = {
      id: displayId,
      name: nganyaName,
      phoneNumber,
      image: imageData,
    };

    const existing = localStorage.getItem('nganyas');
    const parsed: typeof newNganya[] = existing ? JSON.parse(existing) : [];
    const updated = [...parsed.filter((n) => n.id !== displayId), newNganya];
    localStorage.setItem('nganyas', JSON.stringify(updated));

    router.push(`/screen/${displayId}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 shadow-xl p-8 rounded-xl w-full max-w-md space-y-5"
      >
        <h1 className="text-3xl font-bold text-center">Nganya Dashboard</h1>
        <input
          type="text"
          value={nganyaName}
          onChange={(e) => setNganyaName(e.target.value)}
          placeholder="Nganya Name"
          className="w-full p-2 border rounded bg-gray-700 text-white"
          required
        />
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Conductor Phone Number"
          className="w-full p-2 border rounded bg-gray-700 text-white"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full p-2 border rounded bg-gray-700 text-white"
          required
        />
        {imageData && (
          <img
            src={imageData}
            alt="Preview"
            className="mt-2 w-full max-h-64 object-cover rounded border"
          />
        )}
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded font-bold"
        >
          Display on Screen
        </button>
      </form>
    </div>
  );
}
