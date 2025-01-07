import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { headers as getHeaders } from 'next/headers'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headers: ReadonlyHeaders = await getHeaders();

  console.log("Processing request with user agent:", headers.get("user-agent"));

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
