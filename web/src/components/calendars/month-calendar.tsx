import { DateCalendar, type DateCalendarProps } from '@mui/x-date-pickers';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import dayjs, { type Dayjs } from 'dayjs';
import { type FormikProps } from 'formik';

type MonthCalendarProps = {
  formik: FormikProps<any>;
  name: string;
  label: string;
  fullWidth?: boolean; // não funciona corretamente
} & DateCalendarProps<Dayjs>;

const MonthCalendar = ({
  label,
  fullWidth,
  formik,
  name,
  sx,
  ...props
}: MonthCalendarProps) => {
  const handleChange = async (date: Dayjs) => {
    formik.setFieldValue('date', date);
  };

  return (
    <DemoContainer components={['DateCalendar']}>
      <DemoItem label={label}>
        <DateCalendar
          {...props}
          value={formik.values[name]}
          onChange={handleChange}
          views={['year', 'month']}
          maxDate={dayjs(new Date())}
          sx={{
            ...sx,
            ...(fullWidth && {
              '& .MuiDateCalendar-root': {
                width: '100% !important',
              },
              '& , .MuiMonthCalendar-root': {
                width: '100% !important',
              },
              '& .MuiYearCalendar-root': {
                width: '100% !important',
              },
            }),
          }}
          reduceAnimations={true}
        />
      </DemoItem>
    </DemoContainer>
  );
};

/**
 * .MuiDateCalendar-root, .MuiMonthCalendar-root, .MuiYearCalendar-root {
  width: 100% !important;
}
 */

export default MonthCalendar;
