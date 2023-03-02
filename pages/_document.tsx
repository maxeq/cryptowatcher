import { Html, Head, Main, NextScript } from 'next/document'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Layout from '@/components/Layout'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Header />
        <Main />
        <NextScript />
        <Footer />
      </body>
    </Html>
  )
}
