import Image from 'next/image';
import Link from "next/link";
import styles from '../../styles/Pages.module.css';
import { AppBar, Toolbar, IconButton, Container, Button, Typography } from '@mui/material';

function FullMoonAppBar() {
  const pages = [
    {
      title: 'Tasks',
      route: '/tasks'
    },
    {
      title: 'Categories',
      route: '/categories'
    },
    {
      title: 'Persons',
      route: '/persons'
    }
  ];

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href='/'>
            <IconButton>
              <Image src="/fullmoon.svg" alt="Full Moon Index" width={40} height={40}/>
            </IconButton>
          </Link>
          {pages.map((page) => (
            <Link className={styles.link} key={page.title} href={page.route}>
              <Button>
                <Typography sx={{ color: 'white', fontWeight: 'bold' }}>
                  {page.title}
                </Typography>
              </Button>
            </Link>
          ))}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default FullMoonAppBar;
