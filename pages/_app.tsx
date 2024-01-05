import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/app/globals.css";
import type { AppProps } from "next/app";
import { LoadingWrapper } from "@/context/loading";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
