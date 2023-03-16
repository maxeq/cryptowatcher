import '@/styles/globals.css'
import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import Footer from '@/components/footer'
import Layout from "../components/Layout";
import Header from '@/components/header';

import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { useEffect, useState } from 'react'
import { configureChains, createClient, goerli, WagmiConfig } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { UserProvider } from '../context/UserContext';

// 1. Get projectID at https://cloud.walletconnect.com
if (!process.env.NEXT_PUBLIC_PROJECT_ID) {
  throw new Error('You need to provide NEXT_PUBLIC_PROJECT_ID env variable')
}

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID

// 2. Configure wagmi client
const chains = [goerli]

const { provider } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ version: 1, chains, projectId }),
  provider
})

// 3. Configure modal ethereum client
const ethereumClient = new EthereumClient(wagmiClient, chains)


function MyApp({ Component, pageProps }: AppProps) {
  // 4. Wrap your app with WagmiProvider and add <Web3Modal /> compoennt
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
  }, [])

  return (
    <>
      <UserProvider>
        {ready ? (
          <WagmiConfig client={wagmiClient}>
            <Header />
            <Layout>
              <Component {...pageProps} />
              <Analytics />
            </Layout>
            <Footer />
          </WagmiConfig>
        ) : null}
        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      </UserProvider>
    </>
  );
}

export default MyApp;
