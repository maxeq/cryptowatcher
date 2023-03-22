// pages/index.js
import H1Template from '@/components/UI/HeaderTemplate';
import Head from 'next/head';
import CustomSlider from '../components/TrendingSliders';

export default function Trade() {
  return (
    <div>
      <Head>
        <title>Trending Widgets</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <H1Template text="Trending Widgets" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <CustomSlider />
        <CustomSlider />
        <CustomSlider />
      </div>
    </div>
  );
}
