import Image from "next/image";
import { useEffect } from "react";

import styles from '../styles/Home.module.css';
import FullMoonAppBar from "../src/components/FullMoonAppBar";

//MUI
import { Container } from "@mui/system";

function Home() {
  useEffect(() => {
    document.title = 'Full Moon Task List';
  }, []);
  
  return (
    <>
      <FullMoonAppBar />
      <Container className={styles.main}>
        <Image className={styles.image} src="/fullmoon.svg" alt="Full Moon Logo" width={250} height={250} />
        <h1 className={styles.title}>
          Wellcome to Full Moon Task List
        </h1>
      </Container>
    </>
  );
}

export default Home;
