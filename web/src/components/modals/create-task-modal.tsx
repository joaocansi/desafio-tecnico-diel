import {
  DialogTitle,
  type DialogProps,
  DialogContent,
  Box,
  Grid,
  DialogContentText,
} from '@mui/material';
import { useFormik } from 'formik';
import dayjs, { type Dayjs } from 'dayjs';
import { useAuth } from '@/hooks/use-auth';
import Modal from '../modal';
import Input from '../input';
import DateCalendar from '../calendars/date-calendar';
import Button from '../button';
import ChipSelect from '../chip-select';
import toast from 'react-hot-toast';
import createTaskUsecase from '@/server/usecases/create-task.usecase';

import * as Yup from 'yup';
import messages from '@/utils/default-messages';

import d from 'dayjs/plugin/duration';
dayjs.extend(d);

type CreateTaskModalProps = {
  onClose: () => void;
} & Omit<DialogProps, 'children'>;

interface FormValues {
  title: string;
  description: string;
  date: Dayjs;
  tags: string[];
}

const CreateTaskValidation = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string().required(),
  tags: Yup.array().of(Yup.string().uuid()).required(),
  date: Yup.string().required(),
});

export default function CreateTaskModal(props: CreateTaskModalProps) {
  const { tags, createTask } = useAuth();
  const tagsOptions = tags.reduce(
    (acc, tag) => ({ ...acc, [tag.id]: tag.name }),
    {},
  );

  const handleSubmit = (values: FormValues) => {
    toast.promise(createTaskUsecase(values), {
      loading: messages.loading,
      success: (task) => {
        props.onClose();
        createTask(task);
        return messages.objectCreated.replace('{0}', 'Tarefa');
      },
      error: (error) => error.message,
    });
  };

  const formik = useFormik<FormValues>({
    initialValues: {
      title: '',
      description: '',
      date: dayjs(),
      tags: [],
    },
    onSubmit: handleSubmit,
    validationSchema: CreateTaskValidation,
  });

  return (
    <Modal {...props} maxWidth="sm" fullWidth>
      <DialogTitle variant="h5">Criar tarefa</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Preencha os campos abaixo para criar uma nova tarefa.
        </DialogContentText>
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
            disablePast
          />
          <Input
            name="title"
            label="Digite o título da terefa"
            formik={formik}
            fullWidth
          />
          <Input
            multiline
            name="description"
            label="Digite a descrição da tarefa"
            formik={formik}
            fullWidth
          />
          <ChipSelect
            name="tags"
            formik={formik}
            label="Selecione as tags"
            options={tagsOptions}
          />

          <Grid container spacing={2}>
            <Grid item sm={6}>
              <Button onClick={props.onClose} color="error">
                Cancelar
              </Button>
            </Grid>
            <Grid item sm={6}>
              <Button type="submit" color="success">
                Criar
              </Button>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Modal>
  );
}
