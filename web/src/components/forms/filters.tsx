import getAllTasks from '@/server/usecases/get-all-tasks.usecase';
import messages from '@/utils/default-messages';
import { Grid } from '@mui/material';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import Button from '../button';
import ChipSelect from '../chip-select';
import { useAuth } from '@/hooks/use-auth';

import * as Yup from 'yup';
import Select from '../select';
import Input from '../input';
import Calendar from '../calendars/calendar';

interface FormValues {
  title: string;
  date_type: string;
  date: dayjs.Dayjs;
  tags: string[];
}

const timeOptions = {
  '*': 'Sem filtro',
  day: 'Por dia',
  week: 'Por semana',
  month: 'Por mês',
};

const FilterValidation = Yup.object().shape({
  title: Yup.string(),
  tags: Yup.array().of(Yup.string()),
  date_type: Yup.string().equals(['month', 'week', 'day']),
  date: Yup.string(),
});

export default function Filters() {
  const { tags, setTasks } = useAuth();
  const formik = useFormik<FormValues>({
    initialValues: {
      title: '',
      date_type: '',
      date: dayjs(),
      tags: [],
    },
    onSubmit: handleSubmit,
    validationSchema: FilterValidation,
    validateOnChange: false,
    validateOnBlur: false,
  });

  async function handleSubmit(values: FormValues) {
    toast.promise(
      getAllTasks({
        ...values,
        date_type: values.date_type === '*' ? undefined : values.date_type,
      }),
      {
        error: (err) => err.message,
        loading: messages.loading,
        success: (data) => {
          setTasks(data);
          return 'Dados filtrados com sucesso!';
        },
      },
    );
  }

  return (
    <Grid container spacing={1} component="form" onSubmit={formik.handleSubmit}>
      <Grid item xs={12} mt={1}>
        <Button type="submit">Filtrar</Button>
      </Grid>
      <Grid item xs={12} mt={1}>
        <ChipSelect
          name="tags"
          formik={formik}
          label="Selecione as tags"
          options={tags.reduce(
            (acc, tag) => ({ ...acc, [tag.id]: tag.name }),
            {},
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Input
          name="title"
          formik={formik}
          label="Digite o título da tarefa"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={12}>
        <Select
          name="date_type"
          formik={formik}
          label="Selecione o tipo de filtro por tempo"
          options={timeOptions}
        />
      </Grid>
      <Grid item xs={12}>
        <Calendar formik={formik} />
      </Grid>
    </Grid>
  );
}
