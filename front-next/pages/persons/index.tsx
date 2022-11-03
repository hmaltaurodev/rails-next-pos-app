import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import FullMoonAppBar from '../../src/components/FullMoonAppBar';
import ROUTES from '../../src/config/routes';
import PersonService from '../../src/services/PersonService';
import formatDate from '../../src/utils/formatDate';
import styles from '../../styles/Pages.module.css';

//MUI
import { DeleteForever, Edit, Visibility } from '@mui/icons-material';
import { Button, Grid, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Container } from '@mui/system';

function PersonList() {
  const [persons, setPersons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getPersons = async () => {
    const data = await PersonService.getAll();
    setPersons(data);
  }

  const deletePerson = (person: any) => {
    setIsLoading(true);
    PersonService.destroy(person.id)
      .then((data) => {
        getPersons().then(() => {
          setIsLoading(false);
          toast.success('Person deleted sucessfully!');
        });
      })
      .catch((e) => {
        setIsLoading(false);
        toast.error(`Erro when delete person: ${e.message}`);
      });
  }

  useEffect(() => {
    document.title = 'Person List';
    getPersons().then(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading)
    return (
      <>
        <FullMoonAppBar />
        <LinearProgress />
      </>
    );

  return (
    <>
      <FullMoonAppBar />
      <Container>
        <Grid container mt={2} spacing={2}>
          <Grid item>
            <Typography variant='h5'>Persons List</Typography>
          </Grid>
          <Grid item xs={6}>
            <Link className={styles.link} href={{ pathname: ROUTES.persons.new }}>
              <Button variant='contained' color='secondary' size='small'>
                <Typography sx={{ color: 'white', fontWeight: 'bold' }}>
                  New Person
                </Typography>
              </Button>
            </Link>
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
                <TableHead>
                  <TableRow>
                    <TableCell align='center'>ID</TableCell>
                    <TableCell align='left'>Name</TableCell>
                    <TableCell align='left'>Created At</TableCell>
                    <TableCell align='left'>Updated At</TableCell>
                    <TableCell align='left'>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {persons.map((person: any) => (
                    <TableRow
                      key={person.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell align='center' component='th' scope='row'>{person.id}</TableCell>
                      <TableCell align='left'>{person.name}</TableCell>
                      <TableCell align='left'>{formatDate(person.created_at)}</TableCell>
                      <TableCell align='left'>{formatDate(person.updated_at)}</TableCell>
                      <TableCell align='left'>
                        <Grid container spacing={1}>
                          <Grid item>
                            <Link href={{ pathname: ROUTES.persons.show, query: { id: person.id }}}>
                              <Button variant='contained' color='secondary' size='small'>
                                <Visibility fontSize='small' style={{ color: 'white' }} />
                              </Button>
                            </Link>
                          </Grid>
                          <Grid item>
                            <Link href={{ pathname: ROUTES.persons.edit, query: { id: person.id }}}>
                              <Button variant='contained' color='warning' size='small'>
                                <Edit fontSize='small' style={{ color: 'white' }} />
                              </Button>
                            </Link>
                          </Grid>
                          <Grid item>
                            <Button variant='contained' color='error' size='small' onClick={() => deletePerson(person)}>
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
    </>
  );
}

export default PersonList;
