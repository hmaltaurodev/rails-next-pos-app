import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FullMoonAppBar from "../../../src/components/FullMoonAppBar";
import PersonService from "../../../src/services/PersonService";
import StyledPaper from "../../../src/components/StyledPaper";

//MUI
import { Grid, Card, CardContent, LinearProgress, Typography, Divider } from '@mui/material';
import { Container } from '@mui/system';
import formatDate from "../../../src/utils/formatDate";

function ShowPerson() {
  const router = useRouter();
  const { id } = router.query;
  const [person, setPerson] = useState(Object);
  const [isLoading, setIsLoading] = useState(true);

  const getPersons = async (id: number) => {
    const data = await PersonService.getById(id);
    setPerson(data);
  }

  useEffect(() => {
    if (id) {
      document.title = `Showing Person ${id}`;
      getPersons(Number(id)).then(() => {
        setIsLoading(false);
      });
    }
  }, [id]);

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
        <Grid container direction="column" mt={2} spacing={2}>
          <Grid item>
            <StyledPaper>
              <Typography variant="h5">
                {person.id} - {person.name}
              </Typography>
            </StyledPaper>
          </Grid>
          <Grid item>
            <StyledPaper>
              <Typography component="div" variant="body2" color="text.secondary">
                Created At: {formatDate(person.created_at)}
              </Typography>
              <Typography component="div" variant="body2" color="text.secondary">
                Updated At: {formatDate(person.updated_at)}
              </Typography>
            </StyledPaper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ShowPerson;
