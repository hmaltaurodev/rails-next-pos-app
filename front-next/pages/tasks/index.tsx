import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ROUTES from '../../src/config/routes';
import TaskService from '../../src/services/TaskService';
import formatDate from '../../src/utils/formatDate';
import styles from '../../styles/Pages.module.css';

//MUI
import { DeleteForever, Edit, Visibility } from '@mui/icons-material';
import { Button, Checkbox, Grid, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Container } from '@mui/system';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getTasks = async () => {
    const data = await TaskService.getAll();
    setTasks(data);
  }

  const deleteTask = (task: any) => {
    setIsLoading(true);
    TaskService.destroy(task.id)
      .then((data) => {
        getTasks().then(() => {
          setIsLoading(false);
          toast.success('Task deleted sucessfully!');
        });
      })
      .catch((e) => {
        setIsLoading(false);
        toast.error(`Error when delete task: ${e.message}`);
      });
  }

  const toogleTask = (id: number, isCompleted: boolean) => {
    setIsLoading(true);
    if (isCompleted) {
      TaskService.complete(id)
        .then((data) => {
          getTasks().then(() => {
            setIsLoading(false);
            toast.info('Task marked as completed sucessfully!');
          });
        })
        .catch((e) => {
          setIsLoading(false);
          toast.error(`Error when mark task as completed: ${e.message}`);
        });
    }
    else {
      TaskService.todo(id)
        .then((data) => {
          getTasks().then(() => {
            setIsLoading(false);
            toast.info('Task marked as to do sucessfully!');
          });
        })
        .catch((e) => {
          setIsLoading(false);
          toast.error(`Error when mark task as to do: ${e.message}`);
        });
    }
  }

  useEffect(() => {
    document.title = 'Tasks List';
    getTasks().then(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <LinearProgress />;

  if (!tasks.length)
    return (
      <Container>
        <Grid container mt={2} spacing={2}>
          <Grid item>
            <Typography variant='h5'>
              Empty Tasks Lists
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Link className={styles.link} href={{ pathname: ROUTES.tasks.new }}>
              <Button variant='contained' color='secondary' size='small'>
                <Typography sx={{ color: 'white' }}>
                  New Task
                </Typography>
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Container>
    );

  return (
    <Container>
      <Grid container mt={2} spacing={2}>
        <Grid item>
          <Typography variant='h5'>
            Tasks List
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Link className={styles.link} href={{ pathname: ROUTES.tasks.new }}>
            <Button variant='contained' color='secondary' size='small'>
              <Typography sx={{ color: 'white' }}>
                New Task
              </Typography>
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size='small'>
              <TableHead>
                <TableRow>
                  <TableCell align='center'>&nbsp;</TableCell>
                  <TableCell align='center'>ID</TableCell>
                  <TableCell align='left'>Description</TableCell>
                  <TableCell align='left'>Category</TableCell>
                  <TableCell align='left'>Person in Charge</TableCell>
                  <TableCell align='left'>Created At</TableCell>
                  <TableCell align='left'>Updated At</TableCell>
                  <TableCell align='left'>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tasks.map((task: any) => (
                  <TableRow
                    key={task.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align='center'>
                      <Checkbox
                        onChange={e => { toogleTask(task.id, !task.is_completed); }}
                        checked={task.is_completed}
                        color="secondary" />
                    </TableCell>
                    <TableCell align='center' component='th' scope='row'>{task.id}</TableCell>
                    <TableCell align='left'>{task.description}</TableCell>
                    <TableCell align='left'>{task.category.name}</TableCell>
                    <TableCell align='left'>{task.person_in_charge.name}</TableCell>
                    <TableCell align='left'>{formatDate(task.created_at)}</TableCell>
                    <TableCell align='left'>{formatDate(task.updated_at)}</TableCell>
                    <TableCell align='left'>
                      <Grid container spacing={1}>
                        <Grid item>
                          <Link href={{ pathname: ROUTES.tasks.show, query: { id: task.id }}}>
                            <Button variant='contained' color='secondary' size='small'>
                              <Visibility fontSize='small' style={{ color: 'white' }} />
                            </Button>
                          </Link>
                        </Grid>
                        <Grid item>
                          <Link href={{ pathname: ROUTES.tasks.edit, query: { id: task.id }}}>
                            <Button variant='contained' color='warning' size='small'>
                              <Edit fontSize='small' style={{ color: 'white' }} />
                            </Button>
                          </Link>
                        </Grid>
                        <Grid item>
                          <Button variant='contained' color='error' size='small' onClick={() => deleteTask(task)}>
                            <DeleteForever fontSize='small' style={{ color: 'white' }} />
                          </Button>
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
}

export default TaskList;
