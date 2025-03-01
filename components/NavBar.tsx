'use client';
import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/landing" className="font-medium text-emerald-600">
          Climate Pledge
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/dashboard" className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100">
            Dashboard
          </Link>
          <Link href="/auth" className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600">
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
}