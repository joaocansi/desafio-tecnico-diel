import {
  DatePicker as MuiDatePicker,
  type DatePickerProps as MuiDatePickerProps,
} from '@mui/x-date-pickers';
import { type Dayjs } from 'dayjs';
import { type FormikProps } from 'formik';

type DatePickerProps = {
  formik: FormikProps<any>;
  name: string;
  label: string;
  fullWidth?: boolean;
} & MuiDatePickerProps<Dayjs>;

export default function DatePicker({
  formik,
  name,
  label,
  fullWidth,
  sx,
  ...props
}: DatePickerProps) {
  const handleChange = async (date: Dayjs | null) => {
    formik.setFieldValue('date', date);
  };

  return (
    <MuiDatePicker
      {...props}
      name={name}
      label={label}
      onChange={handleChange}
      value={formik.values[name]}
      format="DD/MM/YYYY"
      sx={{
        ...sx,
        ...(fullWidth && { width: '100%' }),
      }}
    />
  );
}
