import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useState } from 'react';

function MiniCalendar() {
    const [value, setValue] = useState(dayjs());

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateCalendar', 'DateCalendar']}>
                <DemoItem>
                    <DateCalendar value={value} onChange={(newValue) => setValue(newValue)} />
                </DemoItem>
            </DemoContainer>
        </LocalizationProvider>
    );
}

export default MiniCalendar;