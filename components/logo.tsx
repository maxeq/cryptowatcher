import Image from 'next/image'

function Logo() {
  const handleTelegram = () => {
    window.open('https://t.me/more_media', '_blank');
  };
  return <Image src="/logo.png" alt="logo" width="128" height="128" onClick={handleTelegram} className="hover:animate-ping"/>
}

export default Logo