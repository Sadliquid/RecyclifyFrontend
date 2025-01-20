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
		backgroundColor: isToday ? '#CCAC00' : '#E5D200',
		color: '#ffffff',
		'&:hover, &:focus': {
			backgroundColor: isToday ? '#b89700' : '#D4C400',
		},
	}),
	'&.Mui-selected': {
		outline: 'none',
	},
	'&:focus': {
		outline: 'none',
	},
	'&.MuiPickersDay-today': {
		border: '2px solid #3DA287',
	},
	pointerEvents: isDisabled ? 'none' : 'auto',
	color: isSelected ? 'white' : '#B0B0B0',
}));

function isHighlighted(day, streak) {
    const today = dayjs();
    const streakStart = today.subtract(streak - 1, 'day');
    return day.isBetween(streakStart, today, 'day', '[]');
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
                                    isSelected={isHighlighted(dayProps.day, streak)}
                                    isDisabled={false}
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