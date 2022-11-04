import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import ROUTES from '../../src/config/routes';
import CategoryService from '../../src/services/CategoryService';
import styles from '../../styles/Pages.module.css';

//MUI
import { Button, Grid, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';

function NewCategory() {
  const router = useRouter();
  const { handleSubmit, setValue, control } = useForm({ defaultValues: { name: '' } });

  const insertCategory = (category: any) => {
    CategoryService.create(category)
      .then(() => {
        router.push(ROUTES.categories.root);
        toast.success('Category created successfully!');
      })
      .catch((e) => {
        toast.error(`Error when create category: ${e.message}`);
      });
  }

  const resetCategory = () => {
    setValue('name', '', { shouldDirty: false });
  }

  useEffect(() => {
    document.title = 'New Category Registration';
  }, []);

  return (
    <Container>
      <Grid container mt={2} spacing={2}>
        <Grid item>
          <Typography variant='h5'>
            New Category Registration
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Link className={styles.link} href={{ pathname: ROUTES.categories.root }}>
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
                <Button onClick={handleSubmit(insertCategory)} variant='contained' color='success' size='small'>
                  <Typography sx={{ color: 'white' }}>
                    Save
                  </Typography>
                </Button>
              </Grid>
              <Grid item>
                <Button onClick={resetCategory} variant='contained' color='warning' size='small'>
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

export default NewCategory;
