import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import ROUTES from '../../../src/config/routes';
import PersonService from '../../../src/services/PersonService';
import styles from '../../../styles/Pages.module.css';

//MUI
import { Button, Grid, LinearProgress, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';

function EditPerson() {
  const router = useRouter();
  const { id } = router.query;
  const { handleSubmit, setValue, control } = useForm({ defaultValues: { name: '' } });
  const [person, setPerson] = useState(Object);
  const [isLoading, setIsLoading] = useState(true);

  const updatePerson = (person: any) => {
    PersonService.update(Number(id), person)
      .then(() => {
        router.push(ROUTES.persons.root);
        toast.success('Person updated successfully!');
      })
      .catch((e) => {
        toast.error(`Error when update person: ${e.message}`);
      });
  }

  const resetPerson = () => {
    setValue('name', person.name, { shouldDirty: true });
  }

  const getPerson = async (id: number) => {
    const data = await PersonService.getById(id);
    setPerson(data);
  }

  useEffect(() => {
    if (id) {
      document.title = `Editing Person ${id}`;
      getPerson(Number(id));
    }
  }, [id]);

  useEffect(() => {
    if (person) {
      setValue('name', person.name, { shouldDirty: true });
      setIsLoading(false);
    }
  }, [person, setValue]);

  if (isLoading) return <LinearProgress />;

  return (
    <Container>
      <Grid container mt={2} spacing={2}>
        <Grid item>
          <Typography variant='h5'>
            Editing Person {id}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Link className={styles.link} href={{ pathname: ROUTES.persons.root }}>
            <Button variant='contained' color='error' size='small'>
              <Typography sx={{ color: 'white' }}>
                Cancel
              </Typography>
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Grid container direction='column' spacing={2} component='form'>
            <Grid item>
              <Controller name={'name'} control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    fullWidth
                    color='secondary'
                    onChange={onChange}
                    value={value}
                    label={'Name'}/>
                )}/>
            </Grid>
            <Grid container item spacing={2}>
              <Grid item>
                <Button onClick={handleSubmit(updatePerson)} variant='contained' color='success' size='small'>
                  <Typography sx={{ color: 'white' }}>
                    Update
                  </Typography>
                </Button>
              </Grid>
              <Grid item>
                <Button onClick={resetPerson} variant='contained' color='warning' size='small'>
                  <Typography sx={{ color: 'white' }}>
                    Reset
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default EditPerson;
