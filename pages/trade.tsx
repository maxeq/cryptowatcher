import SliderData from '@/components/sliders/SliderData';
import H1Template from '@/components/UI/HeaderTemplate';
import TableComponent from '@/components/UI/TableWindowed';
import Head from 'next/head';

export default function Trade() {
  return (
    <div>
      <Head>
        <title>Trending Widgets</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <H1Template text="Window Scrolling Example" className="mt-4 md:mt-0" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="hidden sm:block">
          <SliderData sliderTypes={['trending']} />
        </div>
        <div className="hidden sm:block">
          <SliderData sliderTypes={['biggestLosers']} />
        </div>
        <div className="hidden sm:block">
          <SliderData sliderTypes={['topGainers']} />
        </div>
      </div>
    </div>
  );
}
