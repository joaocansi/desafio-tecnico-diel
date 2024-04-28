import {
  MenuItem,
  type SelectProps as MuiSelectProps,
  Select as MuiSelect,
  InputLabel,
  FormControl,
  Chip,
  Box,
  type SelectChangeEvent,
} from '@mui/material';
import { type FormikProps } from 'formik';

type ChipSelectProps = MuiSelectProps & {
  name: string;
  formik: FormikProps<any>;
  options: Record<string, string>;
};

const ITEM_HEIGHT = 50;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const ChipSelect = ({
  formik,
  options,
  label,
  name,
  sx,
  ...props
}: ChipSelectProps) => {
  const handleChange = (event: SelectChangeEvent<any>) => {
    const {
      target: { value },
    } = event;
    formik.setFieldValue(
      name,
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <FormControl fullWidth sx={sx}>
      <InputLabel id={`chip-select-label-${name}`}>{label}</InputLabel>
      <MuiSelect
        {...props}
        multiple
        labelId={`chip-select-label-${name}`}
        name={name}
        label={label}
        size="medium"
        value={formik.values[name]}
        onChange={handleChange}
        sx={{ width: '100%' }}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((key: string) => (
              <Chip key={key} label={options[key]} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {Object.entries(options).map(([key, value]) => {
          return (
            <MenuItem key={key} value={key}>
              {value}
            </MenuItem>
          );
        })}
      </MuiSelect>
    </FormControl>
  );
};

export default ChipSelect;
