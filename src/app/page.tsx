import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center p-8">
      <h1 className="text-3xl font-bold">Welcome to the Nganya Display App</h1>
      <p className="mt-4 text-gray-600">Manage your matatu display screen with ease.</p>
      <Link href="/dashboard" className="mt-6 bg-black text-white px-6 py-2 rounded hover:bg-gray-800">Go to Dashboard</Link>
    </div>
  );
}
