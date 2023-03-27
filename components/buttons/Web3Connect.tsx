import { useWeb3Modal } from '@web3modal/react';
import { useState } from 'react';
import { useAccount, useDisconnect } from 'wagmi';

interface Web3ConnectProps {
  text?: any;
}

const Web3CustomButton = ({ text }: Web3ConnectProps) => {
  const [loading, setLoading] = useState(false);
  const { open } = useWeb3Modal();
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const label = isConnected ? 'Disconnect' : ``;

  async function onOpen() {
    setLoading(true);
    await open();
    setLoading(false);
  }

  function onClick() {
    if (isConnected) {
      disconnect();
    } else {
      onOpen();
    }
  }

  return (
    <button
      className="px-4 bg-lime-600 transition duration-300 ease-in-out hover:bg-lime-500 py-2 mx:px-0 text-white font-bold rounded-lg whitespace-nowrap"
      onClick={onClick}
      disabled={loading}
    >
      {loading ? 'Loading...' : label} {text}
    </button>
  );
};

export default Web3CustomButton;
