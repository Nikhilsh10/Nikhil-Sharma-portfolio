import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Nikhil Sharma — AI/ML Engineer | Final-Year CS Undergraduate',
  description: 'End-to-end ML systems — from data pipelines and model training to production deployment and MLOps. Experience across NLP/RAG, computer vision, and CI/CD-driven ML infrastructure.',
  openGraph: {
    title: 'Nikhil Sharma — AI/ML Engineer | Final-Year CS Undergraduate',
    description: 'Building machine learning systems that ship.',
    url: 'https://nikhil-sharma.vercel.app',
    siteName: 'Nikhil Sharma Portfolio',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Nikhil Sharma",
              "jobTitle": "AI/ML Engineer",
              "url": "https://nikhil-sharma.vercel.app",
              "sameAs": [
                "https://github.com/Nikhilsh10",
                "https://linkedin.com/in/nikhil-sh10",
                "https://x.com/Nikhil_Sharam10"
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans bg-main text-primary antialiased selection:bg-primary/20 selection:text-primary`}>
        {children}
      </body>
    </html>
  );
}
