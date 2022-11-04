import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import ROUTES from '../../src/config/routes';
import TaskService from '../../src/services/TaskService';
import styles from '../../styles/Pages.module.css';

//MUI
import { Button, Grid, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';

function NewTask() {
  const router = useRouter();
  const { handleSubmit, setValue, control } = useForm({
    defaultValues: {
      completed: false,
      description: '',
      category_id: Number(),
      person_in_charge_id: Number()
    }
  });

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

  const resetTask = () => {
    setValue('description', '', { shouldDirty: false });
    setValue('category_id', Number(), { shouldDirty: false });
    setValue('person_in_charge_id', Number(), { shouldDirty: false });
  }

  useEffect(() => {
    document.title = 'New Task Registration';
  }, []);

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
              <Controller name={'category_id'} control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    fullWidth
                    color='secondary'
                    onChange={onChange}
                    value={value}
                    label={'Category'}/>
                )}/>
            </Grid>
            <Grid item>
              <Controller name={'person_in_charge_id'} control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    fullWidth
                    color='secondary'
                    onChange={onChange}
                    value={value}
                    label={'Person in Charge'}/>
                )}/>
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
