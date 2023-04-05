import H1Template from '@/components/UI/HeaderTemplate';
import TableComponent from '@/components/UI/table';
import Head from 'next/head';

export default function Trade() {
  return (
    <div>
      <Head>
        <title>Trending Widgets</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <H1Template text="Trending Widgets" className="mt-3 md:mt-0" />
      <TableComponent />
    </div>
  );
}
