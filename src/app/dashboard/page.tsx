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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const displayId = nganyaName.replace(/\s+/g, '-').toLowerCase();
    const data = { nganyaName, phoneNumber, imageData };
    localStorage.setItem(displayId, JSON.stringify(data));
    router.push(`/screen/${displayId}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg p-8 rounded-xl w-full max-w-md space-y-5">
        <h1 className="text-2xl font-bold">Nganya Dashboard</h1>
        <input type="text" value={nganyaName} onChange={(e) => setNganyaName(e.target.value)} placeholder="Nganya Name" className="w-full p-2 border rounded" required />
        <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Conductor Phone Number" className="w-full p-2 border rounded" required />
        
        <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full p-2 border rounded" required />
        {imageData && <img src={imageData} alt="Preview" className="mt-2 w-48 h-48 object-cover rounded border" />}
        
        <button type="submit" className="w-full bg-black text-white p-2 rounded hover:bg-gray-800">Display Info</button>
      </form>
    </div>
  );
}
