import { useEffect } from 'react';
import { useRouter } from 'next/router';
import H1Template from '@/components/UI/H1template';

const Error = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/');
    }, 3000);
  }, []);

  return (
    <div>
      <H1Template text="Error 404. Page not found" />
      <p>Something went wrong. Redirecting to main page.</p>
    </div>
  );
};

export default Error;
