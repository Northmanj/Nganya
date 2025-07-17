'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

type Nganya = {
  id: string;
  name: string;
  image: string;
  phoneNumber: string;
};

const Screen = () => {
  const { id } = useParams();
  const [nganya, setNganya] = useState<Nganya | null>(null);

  useEffect(() => {
    const data = localStorage.getItem('nganyas');
    if (data) {
      try {
        const parsed = JSON.parse(data);
        const found = parsed.find((item: Nganya) => item.id === id);
        setNganya(found);
      } catch (error) {
        console.error('Error parsing localStorage:', error);
      }
    }
  }, [id]);

  if (!nganya) return <div className="text-white text-center p-10">Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4 overflow-hidden">
      <h1 className="text-5xl md:text-6xl font-bold mb-4 text-center">{nganya.name}</h1>

      <div className="relative w-full max-w-4xl aspect-video mb-8">
        <Image
          src={nganya.image}
          alt={nganya.name}
          fill
          className="object-cover rounded-lg border-2 border-white shadow-lg"
        />
      </div>

      <p className="text-3xl md:text-4xl font-bold text-green-400">
        PAY VIA MPESA: {nganya.phoneNumber}
      </p>
    </div>
  );
};

export default Screen;
