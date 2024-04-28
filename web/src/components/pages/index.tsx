'use client';

import { Grid } from '@mui/material';
import { type FormikProps, useFormik } from 'formik';
import Button from '@/components/button';
import ChipSelect from '@/components/chip-select';
import MainContainer from '@/components/containers/main-container';
import Flex from '@/components/flex';
import Input from '@/components/input';
import Select from '@/components/select';
import dayjs from 'dayjs';
import DayCalendar from '@/components/calendars/day-calendar';
import MonthCalendar from '@/components/calendars/month-calendar';
import WeekCalendar from '@/components/calendars/week-calendar';
import getAllTasks from '@/server/usecases/get-all-tasks.usecase';

import * as Yup from 'yup';
import toast from 'react-hot-toast';

import utc from 'dayjs/plugin/utc';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import CreateTaskModal from '../modals/create-task-modal';
dayjs.extend(utc);

interface FormValues {
  title: string;
  date_type: string;
  date: dayjs.Dayjs;
  tags: string[];
}

const timeOptions = {
  '': '-',
  day: 'Por dia',
  week: 'Por semana',
  month: 'Por mês',
};

const FilterValidation = Yup.object().shape({
  title: Yup.string(),
  date_type: Yup.string(),
  date: Yup.date(),
  tags: Yup.array().of(Yup.string()).required(),
});

export default function Page() {
  const [createTaskModalOpen, setCreateTaskModalOpen] = useState(false);

  const { tags } = useAuth();
  const formik = useFormik<FormValues>({
    initialValues: {
      title: '',
      date_type: '',
      date: dayjs(),
      tags: [],
    },
    onSubmit: handleSubmit,
    validationSchema: FilterValidation,
  });

  useEffect(() => {
    console.log(formik.values.date.toDate());
  }, [formik.values.date]);

  async function handleSubmit(values: FormValues) {
    toast.promise(getAllTasks(values), {
      error: (err) => err.message,
      loading: 'Filtrando...',
      success: () => {
        return 'Dados filtrados com sucesso!';
      },
    });
    await getAllTasks(formik.values);
  }

  return (
    <MainContainer>
      <Grid container>
        <Grid
          item
          xs={12}
          lg={3}
          component="form"
          onSubmit={formik.handleSubmit}
        >
          <Grid container component={Flex} alignItems="center" spacing={1}>
            <Grid item xs={12} md={6} lg={12}>
              <Button
                color="success"
                onClick={() => {
                  setCreateTaskModalOpen(true);
                }}
              >
                Criar tarefa
              </Button>
            </Grid>
            <Grid item xs={12} md={6} lg={12}>
              <Button type="submit">Filtrar</Button>
            </Grid>
          </Grid>

          <Grid container spacing={2} mt={1}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <ChipSelect
                    name="tags"
                    formik={formik}
                    label="Selecione as tags"
                    options={tags}
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={12}>
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
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Calendar formik={formik} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <CreateTaskModal
        open={createTaskModalOpen}
        onClose={() => {
          setCreateTaskModalOpen(false);
        }}
      />
    </MainContainer>
  );
}

const Calendar = ({ formik }: { formik: FormikProps<any> }) => {
  if (formik.values.date_type === '') return <></>;
  if (formik.values.date_type === 'month')
    return (
      <MonthCalendar
        name="date"
        label="Selecione o mês da tarefa"
        maxDate={dayjs().year(2022).month(11)}
        minDate={dayjs().year(2000).month(0)}
        fullWidth
        formik={formik}
      />
    );
  if (formik.values.date_type === 'day')
    return (
      <DayCalendar
        name="date"
        label="Seleciona o dia da tarefa"
        fullWidth
        formik={formik}
      />
    );
  if (formik.values.date_type === 'week')
    return (
      <WeekCalendar
        name="date"
        label="Seleciona a semana da tarefa"
        fullWidth
        formik={formik}
      />
    );
};
