import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import Header from '@/components/header'
import styles from '@/styles/header.module.css';
import Layout from '@/components/Layout'
import H1Template from '@/components/h1template'
const inter = Inter({ subsets: ['latin'] })
import Charts from '@/components/Chart'
import NoSSR from '@/components/NoSSR'

export default function Alerts() {
    return (
<Layout>
<NoSSR>
<H1Template text="Hunt the crypto whale. Get 'em." />
<Charts symbol="BTCBUSD" />
</NoSSR>
</Layout>
    )
}
