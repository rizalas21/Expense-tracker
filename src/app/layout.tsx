import ClientWrapper from "./components/ClientWrapper";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-screen h-screen flex p-0 m-0 overflow-hidden">
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
