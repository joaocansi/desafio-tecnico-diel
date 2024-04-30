import { DateCalendar, type DateCalendarProps } from '@mui/x-date-pickers';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { type Dayjs } from 'dayjs';
import { type FormikProps } from 'formik';

type DayCalendarProps = {
  formik: FormikProps<any>;
  name: string;
  label: string;
  fullWidth?: boolean;
} & DateCalendarProps<Dayjs>;

const DayCalendar = ({
  label,
  formik,
  name,
  fullWidth,
  sx,
  ...props
}: DayCalendarProps) => {
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
          sx={{ ...(fullWidth && { width: '100%' }), ...sx }}
          reduceAnimations={true}
        />
      </DemoItem>
    </DemoContainer>
  );
};

export default DayCalendar;
