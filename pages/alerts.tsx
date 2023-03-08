import { Inter } from 'next/font/google'
import Layout from '@/components/Layout'
import H1Template from '@/components/h1template'
const inter = Inter({ subsets: ['latin'] })
import Crypto_table3 from '@/components/Crypto_table3'
import NoSSR from '@/components/NoSSR'

export default function Alerts() {
    return (
<Layout>
<H1Template text="Hunt the crypto whale. Get 'em." />
<Crypto_table3 />
</Layout>
    )
}
