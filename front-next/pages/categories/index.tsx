import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ROUTES from '../../src/config/routes';
import CategoryService from '../../src/services/CategoryService';
import formatDate from '../../src/utils/formatDate';
import styles from '../../styles/Pages.module.css';

//MUI
import { DeleteForever, Edit, Visibility } from '@mui/icons-material';
import { Button, Grid, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Container } from '@mui/system';

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getCategories = async () => {
    const data = await CategoryService.getAll();
    setCategories(data);
  }

  const deleteCategory = (category: any) => {
    setIsLoading(true);
    CategoryService.destroy(category.id)
      .then((data) => {
        getCategories().then(() => {
          setIsLoading(false);
          toast.success('Category deleted sucessfully!');
        });
      })
      .catch((e) => {
        setIsLoading(false);
        toast.error(`Error when delete category: ${e.message}`);
      });
  }

  useEffect(() => {
    document.title = 'Categories List';
    getCategories().then(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <LinearProgress />;

  if (!categories.length)
    return (
      <Container>
        <Grid container mt={2} spacing={2}>
          <Grid item>
            <Typography variant='h5'>
              Empty Categories Lists
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Link className={styles.link} href={{ pathname: ROUTES.categories.new }}>
              <Button variant='contained' color='secondary' size='small'>
                <Typography sx={{ color: 'white' }}>
                  New Category
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
            Categories List
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Link className={styles.link} href={{ pathname: ROUTES.categories.new }}>
            <Button variant='contained' color='secondary' size='small'>
              <Typography sx={{ color: 'white' }}>
                New Category
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
                {categories.map((category: any) => (
                  <TableRow
                    key={category.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align='center' component='th' scope='row'>{category.id}</TableCell>
                    <TableCell align='left'>{category.name}</TableCell>
                    <TableCell align='left'>{formatDate(category.created_at)}</TableCell>
                    <TableCell align='left'>{formatDate(category.updated_at)}</TableCell>
                    <TableCell align='left'>
                      <Grid container spacing={1}>
                        <Grid item>
                          <Link href={{ pathname: ROUTES.categories.show, query: { id: category.id }}}>
                            <Button variant='contained' color='secondary' size='small'>
                              <Visibility fontSize='small' style={{ color: 'white' }} />
                            </Button>
                          </Link>
                        </Grid>
                        <Grid item>
                          <Link href={{ pathname: ROUTES.categories.edit, query: { id: category.id }}}>
                            <Button variant='contained' color='warning' size='small'>
                              <Edit fontSize='small' style={{ color: 'white' }} />
                            </Button>
                          </Link>
                        </Grid>
                        <Grid item>
                          <Button variant='contained' color='error' size='small' onClick={() => deleteCategory(category)}>
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

export default CategoryList;
