import './globals.css';

export const metadata = {
  title: 'auterix',
  description: 'Dein Auto, deine Regeln – mit Leasing-Option schneller verkaufen.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}