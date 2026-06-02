import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Nikhil Sharma – Portfolio',
  description: 'Premium personal portfolio built with Next.js 16, Tailwind CSS, and Framer Motion',
};

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 p-4">
      <section className="text-center max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500 mb-4">
          Nikhil Sharma
        </h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
          A senior front‑end engineer crafting premium digital experiences.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/projects"
            className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
          >
            View Projects
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 border border-purple-600 text-purple-600 rounded-md hover:bg-purple-50 dark:hover:bg-gray-800 transition"
          >
            Contact Me
          </Link>
        </div>
      </section>
    </main>
  );
}
