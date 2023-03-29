import { useWeb3Modal } from '@web3modal/react';
import { useState } from 'react';
import { useAccount, useDisconnect } from 'wagmi';

interface Web3ConnectProps {
  text?: any;
  className?: string;
}

const Web3CustomButton = ({ text, className }: Web3ConnectProps) => {
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
      className={`className=${className} m-0 md:h-[35px] p-2 rounded-lg items-center flex md:mt-1 bg-lime-600 hover:bg-lime-500 mr-2`}
      onClick={onClick}
      disabled={loading}
    >
      {loading ? 'Loading...' : label} {text}
    </button >
  );
};

export default Web3CustomButton;
