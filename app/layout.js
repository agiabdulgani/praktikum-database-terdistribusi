import "./globals.css";

export const metadata = {
  title: "SIRS-T Monitor",
  description: "Sistem Informasi Rumah Sakit",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}