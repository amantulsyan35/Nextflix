import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { magic } from '../lib/magic-client';
import Loading from '../components/loading/loading';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const isLoggedIn = await magic.user.isLoggedIn();
      if (isLoggedIn) {
        router.push('/');
      } else {
        router.push('/login');
      }
    })();
  }, []);

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
    };

    (async () => {
      router.events.on('routeChangeComplete', handleComplete);
      router.events.on('routeChangeError', handleComplete);

      return () => {
        router.events.off('routeChangeComplete', handleComplete);
        router.events.off('routeChangeError', handleComplete);
      };
    })();
  }, [router]);

  return isLoading ? <Loading /> : <Component {...pageProps} />;
}

export default MyApp;
