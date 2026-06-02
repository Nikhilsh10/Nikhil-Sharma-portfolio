// src/app/not-found.tsx
import Link from 'next/link';

export const metadata = {
  title: 'Page not found – Nikhil Sharma',
  description: 'The page you’re looking for does not exist.',
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4 text-center">
      <h1 className="text-5xl font-bold text-gray-800 dark:text-gray-100">
        404 – Page Not Found
      </h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
      >
        Go back home
      </Link>
    </main>
  );
}
