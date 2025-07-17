'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';

type Nganya = {
  id: string;
  name: string;
  image: string;
  phoneNumber: string;
  fare?: number;
};

const Screen = () => {
  const { id } = useParams();
  const router = useRouter();
  const [nganya, setNganya] = useState<Nganya | null>(null);
  const [loading, setLoading] = useState(true);
  const [slide, setSlide] = useState(1);

  useEffect(() => {
    const access = sessionStorage.getItem('access_granted');
    if (!access) {
      router.push('/');
      return;
    }

    const data = localStorage.getItem('nganyas');
    if (data) {
      try {
        const parsed: Nganya[] = JSON.parse(data);
        const found = parsed.find((item) => item.id === id);
        setNganya(found || null);
      } catch (error) {
        console.error('Error parsing localStorage:', error);
      }
    }
    setLoading(false);
  }, [id, router]);

  if (loading || !nganya) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black text-white">
        Loading...
      </div>
    );
  }

  const handleStartTrip = () => {
    setSlide(2);
  };

  const handleBack = () => {
    setSlide(1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4 overflow-hidden">
      {slide === 1 && (
        <>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center">{nganya.name}</h1>

          <div className="relative w-full max-w-5xl aspect-video mb-8 border-2 border-white rounded-lg overflow-hidden">
            <Image
              src={nganya.image}
              alt={nganya.name}
              fill
              className="object-cover"
            />
          </div>

          <button
            onClick={handleStartTrip}
            className="mt-8 px-6 py-3 bg-green-500 text-black font-bold text-xl rounded hover:bg-green-600 transition"
          >
            Start Trip
          </button>
        </>
      )}

      {slide === 2 && (
  <>
    <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center">{nganya.name}</h1>
    <p className="text-3xl md:text-4xl font-semibold text-green-400 mb-4 text-center">
      PAY VIA MPESA: {nganya.phoneNumber}
    </p>

    <h1 className="text-6xl md:text-7xl font-extrabold text-white mb-4 text-center">
      ON BOARD
    </h1>

    {nganya.fare !== undefined && (
      <p className="text-4xl md:text-5xl font-bold bg-yellow-300 text-black px-10 py-4 rounded-xl shadow-lg text-center mb-8">
        Fare: Ksh {nganya.fare}
      </p>
    )}

    <button
      onClick={handleBack}
      className="mt-4 px-6 py-3 bg-white text-black font-bold text-xl rounded hover:bg-gray-300 transition"
    >
      Back
    </button>
  </>
)}

    </div>
  );
};

export default Screen;
