'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const UploadNganya = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [id, setId] = useState('');
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

  const handleSubmit = () => {
    if (!id || !name || !phoneNumber || !imageData) return;

    const existing = JSON.parse(localStorage.getItem('nganyas') || '[]');
    const updated = [...existing, { id, name, phoneNumber, image: imageData }];
    localStorage.setItem('nganyas', JSON.stringify(updated));
    router.push(`/screen/${id}`);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6 text-center">Upload Nganya Info</h1>

      <div className="w-full max-w-md space-y-5">
        <input
          type="text"
          placeholder="Nganya ID (e.g. baba-yaga)"
          className="w-full p-3 rounded bg-gray-800 border border-gray-700"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        <input
          type="text"
          placeholder="Nganya Name"
          className="w-full p-3 rounded bg-gray-800 border border-gray-700"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="MPESA Phone Number"
          className="w-full p-3 rounded bg-gray-800 border border-gray-700"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          className="w-full p-3 rounded bg-gray-800 border border-gray-700"
          onChange={handleImageUpload}
        />

        {imageData && (
          <Image
            src={imageData}
            alt="Preview"
            width={300}
            height={200}
            className="rounded border border-white"
          />
        )}

        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded text-lg font-semibold"
        >
          Save & View
        </button>
      </div>
    </div>
  );
};

export default UploadNganya;
