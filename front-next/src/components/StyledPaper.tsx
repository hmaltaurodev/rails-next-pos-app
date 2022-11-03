import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  width: 400,
  color: theme.palette.text.primary,
}));

export default StyledPaper;
