import { TimePicker, type TimePickerProps } from '@mui/x-date-pickers';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import dayjs, { type Dayjs } from 'dayjs';
import { type FormikProps } from 'formik';

type TimeFieldProps = {
  formik: FormikProps<any>;
  name: string;
  label: string;
  fullWidth?: boolean;
} & TimePickerProps<Dayjs>;

const TimeField = ({
  label,
  formik,
  name,
  fullWidth,
  sx,
  ...props
}: TimeFieldProps) => {
  const handleChange = async (value: Dayjs | null) => {
    const time = value ?? dayjs(0);
    formik.setFieldValue(name, time);
  };

  return (
    <DemoContainer components={['TimePicker']}>
      <DemoItem>
        <TimePicker
          format="HH:mm"
          disableOpenPicker
          {...props}
          label={label}
          value={formik.values[name]}
          onChange={handleChange}
          sx={{
            ...(fullWidth && { width: '100%' }),
            ...sx,
          }}
          reduceAnimations={true}
        />
      </DemoItem>
    </DemoContainer>
  );
};

export default TimeField;
