// pages/index.js
import H1Template from '@/components/UI/HeaderTemplate';
import Head from 'next/head';
import LoadingSkeleton from '@/components/icons/LoadingSkeleton';
import CryptoTableSkeleton from '@/components/UI/CryptoTableSkeleton';

export default function Trade() {
  return (
    <div>
      <Head>
        <title>Trending Widgets</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <H1Template text="Trending Widgets" />

    </div>
  );
}
