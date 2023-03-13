import { useWeb3Modal } from '@web3modal/react'
import { useState } from 'react'
import { useAccount, useDisconnect } from 'wagmi'



export default function Web3CustomButton() {
    const [loading, setLoading] = useState(false)
    const { open } = useWeb3Modal()
    const { isConnected } = useAccount()
    const { disconnect } = useDisconnect()
    const label = isConnected ? 'Disconnect' : 'Connect Custom'

    async function onOpen() {
        setLoading(true)
        await open()
        setLoading(false)
    }

    function onClick() {
        if (isConnected) {
            disconnect()
        } else {
            onOpen()
        }
    }

    return (
        <button className="px-4 bg-lime-600 hover:bg-lime-500 shadow-lg shadow-lime-500/50 py-2 mx:px-0 text-white font-bold rounded whitespace-nowrap" onClick={onClick} disabled={loading}>
            {loading ? 'Loading...' : label}
        </button>
    )
} 