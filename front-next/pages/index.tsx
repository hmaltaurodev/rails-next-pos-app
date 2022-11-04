import Image from 'next/image';
import { useEffect } from 'react';
import styles from '../styles/Pages.module.css';

//MUI
import { Container } from '@mui/system';

function Home() {
  useEffect(() => {
    document.title = 'Full Moon Task List';
  }, []);
  
  return (
    <Container className={styles.main}>
      <Image className={styles.image} src='/fullmoon.svg' alt='Full Moon Logo' width={250} height={250} />
      <h1 className={styles.title}>
        Wellcome to Full Moon Task List
      </h1>
    </Container>
  );
}

export default Home;
