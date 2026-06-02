import './globals.css';

export const metadata = {
  title: 'Nikhil Sharma Portfolio',
  description: 'Premium personal portfolio built with Next.js 16',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-gray-50 dark:bg-gray-900">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen flex flex-col items-center justify-center p-4">
        {children}
      </body>
    </html>
  );
}
