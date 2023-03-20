import Image from 'next/image';

interface LogoProps {
  size: number;
}

export default function Logo(props: LogoProps) {
  const handleTelegram = () => {
    window.open('https://t.me/more_media', '_blank');
  };
  return (
    <Image
      src="/logo.png"
      alt="logo"
      width={props.size}
      height={props.size}
      onClick={handleTelegram}
      className={`logo-width-${props.size} my-2 md:my-4 cursor-pointer`}
    />
  );
}
