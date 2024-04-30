'use client';

import { Grid } from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import Button from '@/components/button';
import ChipSelect from '@/components/chip-select';
import MainContainer from '@/components/containers/main-container';
import Flex from '@/components/flex';
import Input from '@/components/input';
import Select from '@/components/select';
import dayjs from 'dayjs';
import getAllTasks from '@/server/usecases/get-all-tasks.usecase';
import toast from 'react-hot-toast';
import utc from 'dayjs/plugin/utc';
import CreateTaskModal from '../modals/create-task-modal';

import * as Yup from 'yup';
import TasksAccordion from '../accordions/tasks-accordions';
import messages from '@/utils/default-messages';
import CustomizeTagsModal from '../modals/customize-tags-modal';
import Calendar from '../calendars/calendar';
dayjs.extend(utc);

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
  date_type: Yup.string(),
  date: Yup.date(),
  tags: Yup.array().of(Yup.string()).required(),
});

export default function Page() {
  const [createTaskModalOpen, setCreateTaskModalOpen] = useState(false);
  const [customizeTagsModalOpen, setCustomizeTagsModalOpen] = useState(false);

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
    toast.promise(getAllTasks(values), {
      error: (err) => err.message,
      loading: messages.loading,
      success: (data) => {
        setTasks(data);
        return 'Dados filtrados com sucesso!';
      },
    });
  }

  return (
    <MainContainer>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          lg={3}
          component="form"
          onSubmit={formik.handleSubmit}
        >
          <Grid container component={Flex} alignItems="center" spacing={1}>
            <Grid item xs={12} md={6} lg={12}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Button
                    color="success"
                    onClick={() => {
                      setCreateTaskModalOpen(true);
                    }}
                  >
                    Criar tarefa
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    color="warning"
                    onClick={() => {
                      setCustomizeTagsModalOpen(true);
                    }}
                  >
                    Customizar Tags
                  </Button>
                </Grid>
              </Grid>
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
                    options={tags.reduce(
                      (acc, tag) => ({ ...acc, [tag.id]: tag.name }),
                      {},
                    )}
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
        <TasksAccordion />
      </Grid>
      <CreateTaskModal
        open={createTaskModalOpen}
        onClose={() => {
          setCreateTaskModalOpen(false);
        }}
      />
      <CustomizeTagsModal
        onClose={() => {
          setCustomizeTagsModalOpen(false);
        }}
        open={customizeTagsModalOpen}
      />
    </MainContainer>
  );
}
