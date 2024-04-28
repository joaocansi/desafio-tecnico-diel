import {
  MenuItem,
  type SelectProps as MuiSelectProps,
  Select as MuiSelect,
  InputLabel,
  FormControl,
} from '@mui/material';
import { type FormikProps } from 'formik';

type SelectProps = MuiSelectProps & {
  name: string;
  formik: FormikProps<any>;
  options: Record<string, string>;
};

const Select = ({
  formik,
  options,
  label,
  name,
  sx,
  ...props
}: SelectProps) => {
  return (
    <FormControl fullWidth sx={sx}>
      <InputLabel id={`select-label-${name}`}>{label}</InputLabel>
      <MuiSelect
        {...props}
        labelId={`select-label-${name}`}
        name={name}
        label={label}
        size="medium"
        value={formik.values[name]}
        onBlur={formik.handleBlur}
        error={formik.touched[name] && Boolean(formik.errors[name])}
        onChange={formik.handleChange}
        sx={{ width: '100%' }}
      >
        {Object.entries(options).map(([key, value]) => (
          <MenuItem key={key} value={key}>
            {value}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
};

export default Select;
