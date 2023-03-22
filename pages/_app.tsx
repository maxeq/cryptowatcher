import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import Footer from '@/components/nav/FooterNav';
import Layout from '../components/layouts/Layout';
import Header from '@/components/nav/HeaderNav';
import '../styles/slider.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { configureChains, createClient, goerli, WagmiConfig } from 'wagmi';
import { UserProvider } from '../context/UserContext';
import ScrollToTopArrow from '@/components/UI/ScrollToTop';

// 1. Get projectID at https://cloud.walletconnect.com
if (!process.env.NEXT_PUBLIC_PROJECT_ID) {
  throw new Error('You need to provide NEXT_PUBLIC_PROJECT_ID env variable');
}

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

const chains = [goerli];

const { provider } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ version: 1, chains, projectId }),
  provider,
});

const ethereumClient = new EthereumClient(wagmiClient, chains);

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <UserProvider>
        <WagmiConfig client={wagmiClient}>
          <Header />
          <Layout>
            <Component {...pageProps} />
            <ScrollToTopArrow />
            <Analytics />
          </Layout>
          <Footer />
        </WagmiConfig>
        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      </UserProvider>
    </>
  );
}

export default MyApp;
