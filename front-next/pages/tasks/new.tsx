import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import ROUTES from '../../src/config/routes';
import CategoryService from '../../src/services/CategoryService';
import PersonService from '../../src/services/PersonService';
import TaskService from '../../src/services/TaskService';
import styles from '../../styles/Pages.module.css';

//MUI
import { Button, FormControl, Grid, InputLabel, LinearProgress, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';

function NewTask() {
  const router = useRouter();
  const { handleSubmit, setValue, control } = useForm({
    defaultValues: {
      completed: false,
      description: '',
      category_id: '',
      person_in_charge_id: ''
    }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [persons, setPersons] = useState([]);
  const [categories, setCategories] = useState([]);

  const insertTask = (task: any) => {
    TaskService.create(task)
      .then(() => {
        router.push(ROUTES.tasks.root);
        toast.success('Task created successfully!');
      })
      .catch((e) => {
        toast.error(`Error when create task: ${e.message}`);
      });
  }

  const getPersonsCategories = async () => {
    const dataPersons = await PersonService.getAll();
    setPersons(dataPersons);

    const dataCategories = await CategoryService.getAll();
    setCategories(dataCategories);
  }

  const resetTask = () => {
    setValue('description', '', { shouldDirty: false });
    setValue('category_id', '', { shouldDirty: false });
    setValue('person_in_charge_id', '', { shouldDirty: false });
  }

  useEffect(() => {
    document.title = 'New Task Registration';
    getPersonsCategories().then(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <LinearProgress />;

  if (!persons.length || !categories.length)
    return (
      <Container>
        <Grid container direction='column' mt={2} spacing={2}>
          <Grid item>
            <Typography variant='h5'>
              Categories List and/or Persons List is Empty
            </Typography>
            <Typography variant='h5'>
              You will not be able to register a New Task
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Link className={styles.link} href={{ pathname: ROUTES.tasks.root }}>
              <Button variant='contained' color='error' size='small'>
                <Typography sx={{ color: 'white' }}>
                  Return
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
            New Task Registration
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Link className={styles.link} href={{ pathname: ROUTES.tasks.root }}>
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
              <Controller name={'description'} control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    fullWidth
                    color='secondary'
                    onChange={onChange}
                    value={value}
                    label={'Description'}/>
                )}/>
            </Grid>
            <Grid item>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Controller name={'category_id'} control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      color='secondary'
                      onChange={onChange}
                      value={value}
                      label={'Category'}>
                      <MenuItem value="">Pick a category</MenuItem>
                      {categories.map((category: any) => (
                        <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                      ))}
                    </Select>
                  )}/>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl fullWidth>
                <InputLabel>Person in Charge</InputLabel>
                <Controller name={'person_in_charge_id'} control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      color='secondary'
                      onChange={onChange}
                      value={value}
                      label={'Person in Charge'}>
                      <MenuItem value="">Pick a person</MenuItem>
                      {persons.map((person: any) => (
                        <MenuItem key={person.id} value={person.id}>{person.name}</MenuItem>
                      ))}
                    </Select>
                  )}/>
              </FormControl>
            </Grid>
            <Grid container item spacing={2}>
              <Grid item>
                <Button onClick={handleSubmit(insertTask)} variant='contained' color='success' size='small'>
                  <Typography sx={{ color: 'white' }}>
                    Save
                  </Typography>
                </Button>
              </Grid>
              <Grid item>
                <Button onClick={resetTask} variant='contained' color='warning' size='small'>
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

export default NewTask;
