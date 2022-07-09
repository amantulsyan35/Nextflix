import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../styles/Login.module.css';
import { magic } from '../lib/magic-client';
// import { Magic } from 'magic-sdk';

const Login = () => {
  const [userMsg, setUserMsg] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleOnChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const email = e.target.value;
    setEmail(email);
  };

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

  const handleLoginWithEmail = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (email) {
      if (email === 'amantulsyan35@gmail.com') {
        try {
          setIsLoading(true);

          const didToken = await magic.auth.loginWithMagicLink({
            email,
          });
          console.log(didToken);
          if (didToken) {
            router.push('/');
          }
        } catch (err) {
          console.error('Something went wrong with login', err);
          setIsLoading(false);

          // Handle errors if required!
        }
      } else {
        setIsLoading(false);
        setUserMsg('Something went wrong logging in');
      }
    } else {
      setIsLoading(false);
      setUserMsg('Enter a valid email address');
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Nextflix SignIn</title>
      </Head>

      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <a className={styles.logoLink}>
            <div className={styles.logoWrapper}>
              <Image
                src='/static/netflix.svg'
                alt='Netflix Logo'
                width='128px'
                height='34px'
              />
            </div>
          </a>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signinHeader}>Sign In</h1>

          <input
            type='text'
            placeholder='Email address'
            className={styles.emailInput}
            onChange={(e) => handleOnChangeEmail(e)}
          />

          <p className={styles.userMsg}>{userMsg}</p>

          <button
            className={styles.loginBtn}
            onClick={(e) => handleLoginWithEmail(e)}
          >
            {isLoading ? 'Loading...' : 'Sign In'}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
