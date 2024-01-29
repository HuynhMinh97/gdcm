export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const t = () => {
    const a = 1;
  };
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
