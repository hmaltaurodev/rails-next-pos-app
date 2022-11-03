import { format } from 'date-fns';

const formatDate = (date: any) => {
  const formattedDate = format(new Date(date), 'dd/MM/yyyy HH:mm:ss');
  return formattedDate;
}

export default formatDate;