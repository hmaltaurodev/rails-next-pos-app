import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import StyledPaper from '../../../src/components/StyledPaper';
import ROUTES from '../../../src/config/routes';
import PersonService from '../../../src/services/PersonService';
import formatDate from '../../../src/utils/formatDate';
import styles from '../../../styles/Pages.module.css';

//MUI
import { Button, Grid, LinearProgress, Typography } from '@mui/material';
import { Container } from '@mui/system';

function ShowPerson() {
  const router = useRouter();
  const { id } = router.query;
  const [person, setPerson] = useState(Object);
  const [isLoading, setIsLoading] = useState(true);

  const getPerson = async (id: number) => {
    const data = await PersonService.getById(id);
    setPerson(data);
  }

  useEffect(() => {
    if (id) {
      document.title = `Showing Person ${id}`;
      getPerson(Number(id)).then(() => {
        setIsLoading(false);
      });
    }
  }, [id]);

  if (isLoading) return <LinearProgress />;

  return (
    <Container>
      <Grid container direction='column' mt={2} spacing={2}>
        <Grid container item spacing={2}>
          <Grid item>
            <Typography variant='h5'>
              Showing Person {id}
            </Typography>
          </Grid>
          <Grid item>
            <Link className={styles.link} href={{ pathname: ROUTES.persons.root }}>
              <Button variant='contained' color='error' size='small'>
                <Typography sx={{ color: 'white' }}>
                  Return
                </Typography>
              </Button>
            </Link>
          </Grid>
        </Grid>
        <Grid item>
          <StyledPaper>
            <Typography variant='h5'>
              {person.name}
            </Typography>
          </StyledPaper>
        </Grid>
        <Grid item>
          <StyledPaper>
            <Typography component='div' variant='body2' color='text.secondary'>
              Created At: {formatDate(person.created_at)}
            </Typography>
            <Typography component='div' variant='body2' color='text.secondary'>
              Updated At: {formatDate(person.updated_at)}
            </Typography>
          </StyledPaper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ShowPerson;
