
import React from 'react';
import Header from './components/Header'; // Adjust the import path as needed
import './globals.css';
import '@radix-ui/themes/styles.css';

// You can manually set font styles or rely on CSS for font handling
import { Inter } from 'next/font/google'; // For simplicity, assume CSS font loading or use any similar font import
const inter = 'Inter, sans-serif'; // You can modify the font import as necessary

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: inter }}>
        <Header />
        {children}
        <footer className="container py-8 text-gray-500">
          Job Board &copy; 2024 - All rights reserved
        </footer>
      </body>
    </html>
  );
}
