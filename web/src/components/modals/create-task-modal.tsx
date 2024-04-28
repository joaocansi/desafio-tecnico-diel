import {
  DialogTitle,
  type DialogProps,
  DialogContent,
  Box,
  Grid,
} from '@mui/material';
import Modal from '../modal';
import Input from '../input';
import { useFormik } from 'formik';
import DateCalendar from '../calendars/date-calendar';
import { type Dayjs } from 'dayjs';
import Button from '../button';
import ChipSelect from '../chip-select';
import { useAuth } from '@/hooks/use-auth';

type CreateTaskModalProps = {
  onClose: () => void;
} & Omit<DialogProps, 'children'>;

interface FormValues {
  title: string;
  description: string;
  date: Dayjs | null;
  tags: string[];
}

export default function CreateTaskModal(props: CreateTaskModalProps) {
  const { tags } = useAuth();

  const handleSubmit = (values: FormValues) => {};

  const formik = useFormik<FormValues>({
    initialValues: {
      title: '',
      description: '',
      date: null,
      tags: [],
    },
    onSubmit: handleSubmit,
  });

  return (
    <Modal {...props} maxWidth="sm" fullWidth>
      <DialogTitle variant="h5">Criar tarefa</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            flexDirection: 'column',
          }}
          component="form"
          onSubmit={formik.handleSubmit}
        >
          <DateCalendar
            label="Selecione a data da tarefa"
            name="date"
            formik={formik}
          />
          <Input
            name="title"
            label="Digite o título da terefa"
            formik={formik}
            fullWidth
          />
          <Input
            name="description"
            label="Digite a descrição da tarefa"
            formik={formik}
            fullWidth
          />
          <ChipSelect
            name="tags"
            formik={formik}
            label="Selecione as tags"
            options={tags}
          />

          <Grid container spacing={2}>
            <Grid item sm={6}>
              <Button onClick={props.onClose} color="error">
                Cancelar
              </Button>
            </Grid>
            <Grid item sm={6}>
              <Button type="submit" onClick={() => {}} color="success">
                Criar
              </Button>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Modal>
  );
}
