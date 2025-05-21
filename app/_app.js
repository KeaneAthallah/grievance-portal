"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    if (!["/login", "/username"].includes(router.pathname)) {
      const username = sessionStorage.getItem("username");
      if (!username) {
        router.push("/login");
      }
    }
  }, []);
  return <Component {...pageProps} />;
}
