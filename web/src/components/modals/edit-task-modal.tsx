import {
  DialogTitle,
  type DialogProps,
  DialogContent,
  Box,
  Grid,
  DialogContentText,
} from '@mui/material';
import { useFormik } from 'formik';
import { type Task, useAuth } from '@/hooks/use-auth';
import dayjs, { type Dayjs } from 'dayjs';
import Modal from '../modal';
import Input from '../input';
import DateCalendar from '../calendars/date-calendar';
import Button from '../button';
import ChipSelect from '../chip-select';
import toast from 'react-hot-toast';

import * as Yup from 'yup';
import editTaskUseCase from '@/server/usecases/edit-task.usecase';
import messages from '@/utils/default-messages';

type CreateTaskModalProps = {
  task: Task;
  onClose: () => void;
} & Omit<DialogProps, 'children'>;

interface FormValues {
  id: string;
  title: string;
  description: string;
  date: Dayjs;
  tags: string[];
}

const EditTaskValidation = Yup.object().shape({
  title: Yup.string(),
  description: Yup.string(),
  date: Yup.string(),
  tags: Yup.array().of(Yup.string()).min(1).required(),
});

export default function EditTaskModal(props: CreateTaskModalProps) {
  const { tags, updateTask } = useAuth();
  const tagsOptions = tags.reduce(
    (acc, tag) => ({ ...acc, [tag.id]: tag.name }),
    {},
  );

  const handleSubmit = (values: FormValues) => {
    toast.promise(editTaskUseCase(values), {
      loading: messages.loading,
      success: (task) => {
        props.onClose();
        updateTask(task);
        return messages.objectUpdated.replace('{0}', 'Tarefa');
      },
      error: (error) => error.message,
    });
  };

  const formik = useFormik<FormValues>({
    initialValues: {
      id: props.task.id,
      title: props.task.title,
      description: props.task.description,
      date: dayjs(props.task.date).utc(),
      tags: props.task.tags.map((tag) => tag.id),
    },
    onSubmit: handleSubmit,
    validationSchema: EditTaskValidation,
  });

  return (
    <Modal {...props} maxWidth="sm" fullWidth>
      <DialogTitle variant="h5">Editar Tarefa</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Preencha os campos abaixo para inserir novos dados.
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
                Editar
              </Button>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Modal>
  );
}
