import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import StyledPaper from '../../../src/components/StyledPaper';
import ROUTES from '../../../src/config/routes';
import TaskService from '../../../src/services/TaskService';
import formatDate from '../../../src/utils/formatDate';
import styles from '../../../styles/Pages.module.css';

//MUI
import { Button, Grid, LinearProgress, Typography } from '@mui/material';
import { Container } from '@mui/system';

function ShowTask() {
  const router = useRouter();
  const { id } = router.query;
  const [task, setTask] = useState(Object);
  const [isLoading, setIsLoading] = useState(true);

  const getTask = async (id: number) => {
    const data = await TaskService.getById(id);
    setTask(data);
  }

  useEffect(() => {
    if (id) {
      document.title = `Showing Task ${id}`;
      getTask(Number(id)).then(() => {
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
              Showing Task {id}
            </Typography>
          </Grid>
          <Grid item>
            <Link className={styles.link} href={{ pathname: ROUTES.tasks.root }}>
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
            <Typography component='div' variant='h5'>
              {task.description}
            </Typography>
            <Typography component='div'>
              Status: { task.completed ? 'Completed' : 'To do' }
            </Typography>
          </StyledPaper>
        </Grid>
        <Grid item>
          <StyledPaper>
            <Typography component='div'>
              Category: {task.category.name}
            </Typography>
            <Typography component='div'>
              Person in Charge: {task.person_in_charge.name}
            </Typography>
            <Typography component='div'>
              Created At: {formatDate(task.created_at)}
            </Typography>
            <Typography component='div'>
              Updated At: {formatDate(task.updated_at)}
            </Typography>
          </StyledPaper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ShowTask;
