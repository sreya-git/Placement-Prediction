import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Data Science Lab | Interactive AI Learning Lab for Students',
  description: 'Interactive Data Science and Machine Learning learning web application for 1st-year B.Tech students. Experience the complete pipeline: Data -> Clean -> Analyze -> Visualize -> Train ML -> Predict.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#050914] text-slate-100 antialiased selection:bg-indigo-500 selection:text-white font-sans">
        {children}
      </body>
    </html>
  );
}
