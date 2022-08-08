import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './navbar.module.css';
import { magic } from '../../lib/magic-client';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [username, setUsername] = useState('');

  const router = useRouter();

  const handleOnClickHome = () => {
    router.push('/');
  };

  const handleOnClickMyList = () => {
    router.push('/browse/my-list');
  };

  const handleShowDropdown = () => {
    setShowDropdown((state: boolean) => !state);
  };

  useEffect(() => {
    (async () => {
      try {
        const { email, issuer } = await magic.user.getMetadata();
        const didToken = await magic.user.getIdToken();
        if (email) {
          setUsername(email);
        }
      } catch (error) {
        console.error('Error retreiving metadata', error);
      }
    })();
  });

  const handleSignout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      await magic.user.logout();
      router.push('/login');
    } catch (error) {
      router.push('/login');
      console.error('Error logging out', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
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

        <p>{username}</p>
        <ul className={styles.navItems}>
          <li onClick={handleOnClickHome} className={styles.navItem}>
            Home
          </li>
          {/* <li onClick={handleOnClickMyList} className={styles.navItem2}>
            My List
          </li> */}
        </ul>
        <nav className={styles.navContainer}>
          <div>
            <button onClick={handleShowDropdown} className={styles.usernameBtn}>
              <p className={styles.uername}>{username}</p>
              <Image
                src={'/static/expand_more.svg'}
                width='24px'
                height='24px'
                alt='Expand more'
              />
            </button>

            {showDropdown && (
              <div className={styles.navDropdown}>
                <button className={styles.linkName} onClick={handleSignout}>
                  Sign out
                </button>
                <div className={styles.lineWrapper}></div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
