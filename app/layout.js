import './globals.css';

export const metadata = {
  title: 'CST Monitoring System',
  description: 'Continuous Settling Tank industrial IoT dashboard'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
