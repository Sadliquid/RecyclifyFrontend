/* eslint-disable react/prop-types */
import dayjs from 'dayjs';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay } from '@mui/x-date-pickers';
import { styled } from '@mui/material/styles';

dayjs.extend(isBetweenPlugin);

const CustomPickersDay = styled(PickersDay, {
    shouldForwardProp: (prop) => prop !== 'isSelected',
  })(({ isSelected, isToday, isDisabled }) => ({
    ...(isSelected && {
      backgroundColor: isToday ? '#CCAC00' : '#E5D200', // Lighter shade for non-today selected days
      color: '#ffffff',                             // White text for contrast
      '&:hover, &:focus': {
        backgroundColor: isToday ? '#b89700' : '#D4C400', // Slightly darker shade for non-today hover/focus
      },
    }),
    '&.Mui-selected': {
      outline: 'none', // Remove the outline from the selected day
    },
    '&:focus': {
      outline: 'none', // Remove the outline from the focused day
    },
    '&.MuiPickersDay-today': {
      border: '2px solid #3DA287', // Remove the circle outline for the current day
    },
    pointerEvents: isDisabled ? 'none' : 'auto', // Disable pointer events (clicks) if isDisabled is true
    // Avoid using opacity, and visually indicate disabled days with a text color change
    color: isSelected ? 'white' : '#B0B0B0', // Lighter color for disabled days
}));
  
  function isInSameWeek(day) {
    return day.isSame(dayjs(), 'week');
  }
  
  function MiniCalendar({ streak }) {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DateCalendar']}>
          <DemoItem label={`Your current streak: ${streak}`}>
            <DateCalendar
              slots={{
                day: (dayProps) => (
                  <CustomPickersDay
                    {...dayProps}
                    isSelected={isInSameWeek(dayProps.day)}
                    isDisabled={true} // Adjust this based on which dates you want to disable
                  />
                ),
              }}
            />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>
    );
  }
  
  export default MiniCalendar;  