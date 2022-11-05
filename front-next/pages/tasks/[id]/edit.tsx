import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import ROUTES from '../../../src/config/routes';
import CategoryService from '../../../src/services/CategoryService';
import PersonService from '../../../src/services/PersonService';
import TaskService from '../../../src/services/TaskService';
import styles from '../../../styles/Pages.module.css';

//MUI
import { Button, FormControl, Grid, InputLabel, LinearProgress, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';

function EditTask() {
  const router = useRouter();
  const { id } = router.query;
  const { handleSubmit, setValue, control } = useForm({
    defaultValues: {
      is_completed: false,
      description: '',
      category_id: '',
      person_in_charge_id: ''
    }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [task, setTask] = useState(Object);
  const [persons, setPersons] = useState([]);
  const [categories, setCategories] = useState([]);

  const updateTask = (task: any) => {
    TaskService.update(Number(id), task)
      .then(() => {
        router.push(ROUTES.tasks.root);
        toast.success('Task updated successfully!');
      })
      .catch((e) => {
        toast.error(`Error when update task: ${e.message}`);
      });
  }

  const getPersonsCategories = async () => {
    const dataPersons = await PersonService.getAll();
    setPersons(dataPersons);

    const dataCategories = await CategoryService.getAll();
    setCategories(dataCategories);
  }

  const resetTask = () => {
    setValue('is_completed', task.is_completed, { shouldDirty: true });
    setValue('description', task.description, { shouldDirty: true });
    setValue('category_id', task.category_id, { shouldDirty: true });
    setValue('person_in_charge_id', task.person_in_charge_id, { shouldDirty: true });
  }

  const getTask = async (id: number) => {
    const data = await TaskService.getById(id);
    setTask(data);
  }

  useEffect(() => {
    if (id) {
      document.title = `Editing Task ${id}`;
      getPersonsCategories().then(() => {
        getTask(Number(id));
      });
    }
  }, [id]);

  useEffect(() => {
    if (task) {
      setValue('is_completed', task.is_completed, { shouldDirty: true });
      setValue('description', task.description, { shouldDirty: true });
      setValue('category_id', task.category_id, { shouldDirty: true });
      setValue('person_in_charge_id', task.person_in_charge_id, { shouldDirty: true });
      setIsLoading(false);
    }
  }, [task, setValue]);

  if (isLoading) return <LinearProgress />;

  return (
    <Container>
      <Grid container mt={2} spacing={2}>
        <Grid item>
          <Typography variant='h5'>
            Editing Task {id}
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
                <Button onClick={handleSubmit(updateTask)} variant='contained' color='success' size='small'>
                  <Typography sx={{ color: 'white' }}>
                    Update
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

export default EditTask;
