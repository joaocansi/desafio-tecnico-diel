import dayjs from 'dayjs';
import MonthCalendar from './month-calendar';
import DayCalendar from './day-calendar';
import { type FormikProps } from 'formik';
import { Alert, AlertTitle } from '@mui/material';

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
      <>
        <Alert color="warning" variant="filled">
          <AlertTitle>
            <strong>Atenção!</strong>
          </AlertTitle>
          A semana selecionada será a semana que contém o dia selecionado.
        </Alert>
        <DayCalendar
          name="date"
          label="Seleciona a semana da tarefa"
          fullWidth
          formik={formik}
        />
      </>
    );
};

export default Calendar;
