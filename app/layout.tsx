"use client";

import "./globals.css";
import { useEffect, useState } from "react";
import useStore from "./store";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  const importFromSession = useStore((state) => state.importFromSession);

  useEffect(() => {
    const storeData = sessionStorage.getItem("storeData");
    if (storeData) {
      const parsedData = JSON.parse(storeData);
      importFromSession(parsedData);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [importFromSession]);

  return (
    <html lang="en">
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Customer Data Management</title>
      <body className="h-screen w-screen p-8 bg-slate-900 grid place-items-center">
        {isLoading ? (
          <p className="font-bold text-2xl text-white">
            Fetching the User Data...
          </p>
        ) : (
          <main className="h-full w-full">{children}</main>
        )}
      </body>
    </html>
  );
}
