import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import StyledPaper from '../../../src/components/StyledPaper';
import ROUTES from '../../../src/config/routes';
import CategoryService from '../../../src/services/CategoryService';
import formatDate from '../../../src/utils/formatDate';
import styles from '../../../styles/Pages.module.css';

//MUI
import { Button, Grid, LinearProgress, Typography } from '@mui/material';
import { Container } from '@mui/system';

function ShowCategory() {
  const router = useRouter();
  const { id } = router.query;
  const [category, setCategory] = useState(Object);
  const [isLoading, setIsLoading] = useState(true);

  const getCategory = async (id: number) => {
    const data = await CategoryService.getById(id);
    setCategory(data);
  }

  useEffect(() => {
    if (id) {
      document.title = `Showing Category ${id}`;
      getCategory(Number(id)).then(() => {
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
              Showing Category {id}
            </Typography>
          </Grid>
          <Grid item>
            <Link className={styles.link} href={{ pathname: ROUTES.categories.root }}>
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
              {category.name}
            </Typography>
          </StyledPaper>
        </Grid>
        <Grid item>
          <StyledPaper>
            <Typography component='div'>
              Created At: {formatDate(category.created_at)}
            </Typography>
            <Typography component='div'>
              Updated At: {formatDate(category.updated_at)}
            </Typography>
          </StyledPaper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ShowCategory;
