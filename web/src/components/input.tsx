import { TextField, type TextFieldProps } from '@mui/material';
import { type FormikProps } from 'formik';

interface Formik {
  formik?: FormikProps<any>;
}

const Input = ({ formik, name, ...props }: TextFieldProps & Formik) => {
  if (!formik || !name) return <TextField size="medium" {...props} />;
  return (
    <TextField
      name={name}
      size="medium"
      value={formik.values[name]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      helperText={formik.touched[name] && <>{formik.errors[name]}</>}
      {...props}
    />
  );
};

export default Input;
