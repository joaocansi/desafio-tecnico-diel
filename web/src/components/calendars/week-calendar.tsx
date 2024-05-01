import dayjs, { type Dayjs } from 'dayjs';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import { styled } from '@mui/material/styles';
import {
  DateCalendar,
  type DateCalendarProps,
} from '@mui/x-date-pickers/DateCalendar';
import {
  PickersDay,
  type PickersDayProps,
} from '@mui/x-date-pickers/PickersDay';
import { useState } from 'react';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { type FormikProps } from 'formik';

dayjs.extend(isBetweenPlugin);

interface CustomPickerDayProps extends PickersDayProps<Dayjs> {
  isSelected: boolean;
  isHovered: boolean;
}

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== 'isSelected' && prop !== 'isHovered',
})<CustomPickerDayProps>(({ theme, isSelected, isHovered, day }) => ({
  borderRadius: 0,
  ...(isSelected && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.main,
    },
  }),
  ...(isHovered && {
    backgroundColor: theme.palette.primary[theme.palette.mode],
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary[theme.palette.mode],
    },
  }),
  ...(day.day() === 0 && {
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%',
  }),
  ...(day.day() === 6 && {
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
  }),
})) as React.ComponentType<CustomPickerDayProps>;

const isInSameWeek = (dayA: Dayjs, dayB: Dayjs | null | undefined) => {
  if (dayB == null) {
    return false;
  }
  return dayA.isSame(dayB, 'week');
};

function Day(
  props: PickersDayProps<Dayjs> & {
    selectedDay?: Dayjs | null;
    hoveredDay?: Dayjs | null;
  },
) {
  const { day, selectedDay, hoveredDay, ...other } = props;

  return (
    <CustomPickersDay
      {...other}
      day={day}
      sx={{ px: 2.5 }}
      disableMargin
      selected={false}
      isSelected={isInSameWeek(day, selectedDay)}
      isHovered={isInSameWeek(day, hoveredDay)}
    />
  );
}

type WeekCalendarProps = {
  name: string;
  label: string;
  formik: FormikProps<any>;
  fullWidth?: boolean;
} & DateCalendarProps<Dayjs>;

export default function WeekCalendar({
  label,
  fullWidth,
  name,
  formik,
  sx,
  ...props
}: WeekCalendarProps) {
  const [hoveredDay, setHoveredDay] = useState<Dayjs | null>(null);

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
          showDaysOutsideCurrentMonth
          displayWeekNumber
          slots={{ day: Day }}
          slotProps={{
            day: (ownerState) =>
              ({
                selectedDay: formik.values[name],
                hoveredDay,
                onPointerEnter: () => {
                  setHoveredDay(ownerState.day);
                },
                onPointerLeave: () => {
                  setHoveredDay(null);
                },
              }) as any,
          }}
          sx={{
            ...(fullWidth && { width: '100%' }),
            ...sx,
          }}
        />
      </DemoItem>
    </DemoContainer>
  );
}
