import '@/styles/globals.css'
import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import Footer from '@/components/footer'
import Layout from "../components/Layout";
import Header from '@/components/header';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Layout>
        <Component {...pageProps} />
        <Analytics />
      </Layout>
      <Footer />
    </>
  );
}

export default MyApp;
