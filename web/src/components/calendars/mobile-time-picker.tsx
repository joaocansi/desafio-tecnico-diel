import {
  MobileTimePicker as MuiMobileTimePicker,
  type MobileTimePickerProps as MuiMobileTimePickerProps,
} from '@mui/x-date-pickers';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import dayjs, { type Dayjs } from 'dayjs';
import { type FormikProps } from 'formik';

type MobileTimePickerProps = {
  formik: FormikProps<any>;
  name: string;
  label: string;
  fullWidth?: boolean;
} & MuiMobileTimePickerProps<Dayjs>;

const MobileTimePicker = ({
  label,
  formik,
  name,
  fullWidth,
  sx,
  ...props
}: MobileTimePickerProps) => {
  const handleChange = (value: Dayjs | null) => {
    const time = value ?? dayjs(0);
    formik.setFieldValue('date', time);
  };

  return (
    <DemoContainer components={['MobileTimePicker']}>
      <DemoItem>
        <MuiMobileTimePicker
          {...props}
          label={label}
          value={formik.values[name]}
          onChange={handleChange}
          sx={{ ...(fullWidth && { width: '100%' }), ...sx }}
          reduceAnimations={true}
        />
      </DemoItem>
    </DemoContainer>
  );
};

export default MobileTimePicker;
