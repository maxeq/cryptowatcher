import { Inter } from 'next/font/google'
import H1Template from '@/components/h1template'
const inter = Inter({ subsets: ['latin'] })
import NoSSR from '@/components/NoSSR'
import Trader from '@/components/Trade'

export default function Trade() {
    return (
        <NoSSR>
            <H1Template text="Swap crypto with confidence" />
            <Trader />
        </NoSSR>
    )
}
