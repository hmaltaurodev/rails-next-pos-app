import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import ROUTES from '../../../src/config/routes';
import CategoryService from '../../../src/services/CategoryService';
import styles from '../../../styles/Pages.module.css';

//MUI
import { Button, Grid, LinearProgress, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';

function EditCategory() {
  const router = useRouter();
  const { id } = router.query;
  const { handleSubmit, setValue, control } = useForm({ defaultValues: { name: '' } });
  const [category, setCategory] = useState(Object);
  const [isLoading, setIsLoading] = useState(true);

  const updateCategory = (category: any) => {
    CategoryService.update(Number(id), category)
      .then(() => {
        router.push(ROUTES.categories.root);
        toast.success('Category updated successfully!');
      })
      .catch((e) => {
        toast.error(`Error when update category: ${e.message}`);
      });
  }

  const resetCategory = () => {
    setValue('name', category.name, { shouldDirty: true });
  }

  const getCategory = async (id: number) => {
    const data = await CategoryService.getById(id);
    setCategory(data);
  }

  useEffect(() => {
    if (id) {
      document.title = `Editing Category ${id}`;
      getCategory(Number(id));
    }
  }, [id]);

  useEffect(() => {
    if (category) {
      setValue('name', category.name, { shouldDirty: true });
      setIsLoading(false);
    }
  }, [category, setValue]);

  if (isLoading) return <LinearProgress />;

  return (
    <Container>
      <Grid container mt={2} spacing={2}>
        <Grid item>
          <Typography variant='h5'>
            Editing Category {id}
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
                <Button onClick={handleSubmit(updateCategory)} variant='contained' color='success' size='small'>
                  <Typography sx={{ color: 'white' }}>
                    Update
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

export default EditCategory;
