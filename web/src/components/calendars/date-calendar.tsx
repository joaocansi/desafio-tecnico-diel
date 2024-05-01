import { DateTimePicker, type DateTimePickerProps } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { type Dayjs } from 'dayjs';
import { type FormikProps } from 'formik';

type DayCalendarProps = {
  formik: FormikProps<any>;
  name: string;
  label: string;
  fullWidth?: boolean;
} & DateTimePickerProps<Dayjs>;

export default function DateCalendar({
  formik,
  name,
  label,
  fullWidth,
  sx,
  ...props
}: DayCalendarProps) {
  const handleChange = async (date: Dayjs | null) => {
    formik.setFieldValue('date', date);
  };

  return (
    <DemoContainer components={['DateTimePicker']}>
      <DateTimePicker
        {...props}
        name={name}
        label={label}
        onChange={handleChange}
        views={['year', 'month', 'day']}
        format="DD/MM/YYYY"
        value={formik.values[name]}
        sx={{
          ...sx,
          ...(fullWidth && { width: '100%' }),
        }}
        reduceAnimations={true}
      />
    </DemoContainer>
  );
}
