import Button from './buttons/Button';
import Logo from '@/components/icons/LogoNew';

export default function Twitter() {
  return (
    <div className="top mx-4 mt-4 md:mx-6 md:my-2 flex items-center justify-between">
      <Logo size={64} className="my-2 md:my-4 cursor-pointer" /> <div >CryptoWatcher</div>
      <Button text="+ Follow" />
    </div>
  );
}
