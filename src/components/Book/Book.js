import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { UserContext } from '../../App';

import EditCalendarRoundedIcon from '@mui/icons-material/EditCalendarRounded';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import Alert from '@mui/material/Alert';
import Bookings from '../Bookings/Bookings';

const Book = () => {
    const { bedType } = useParams();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    // for store checkIn & checkOut date
    const [selectedDate, setSelectedDate] = useState({
        checkIn: dayjs(new Date()),
        checkOut: dayjs(new Date())
    })

    // for state management
    const handleCheckInDate = (date) => {
        const newDates = { ...selectedDate };
        newDates.checkIn = date;
        setSelectedDate(newDates);
    }
    const handleCheckOutDate = (date) => {
        const newDates = { ...selectedDate };
        newDates.checkOut = date;
        setSelectedDate(newDates);
    }

    // for passing data to backend
    const handleBooking = () => {
        const newBooking = {...loggedInUser, ...selectedDate};
        fetch('http://localhost:4000/addBooking', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newBooking)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })

    }

    // For clear date field
    const [cleared, setCleared] = useState(false);

    // For date picker styles
    const StyledButton = styled(IconButton)(({ theme }) => ({
        borderRadius: theme.shape.borderRadius,
    }));
    const StyledDay = styled(PickersDay)(({ theme }) => ({
        borderRadius: theme.shape.borderRadius,
        color:
            theme.palette.mode === 'light'
                ? theme.palette.secondary.dark
                : theme.palette.secondary.light,
    }));

    useEffect(() => {
        if (cleared) {
            const timeout = setTimeout(() => {
                setCleared(false);
            }, 1500);

            return () => clearTimeout(timeout);
        }
        return () => { };
    }, [cleared]);

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Hello, <span style={{ color: 'green' }}>{loggedInUser.name}</span>! Let's book a {bedType} Room.</h1>
            <p>Want a <Link to={'/'}>different room?</Link> </p>

            <div>
                <Stack direction="row" spacing={2} sx={{ display: 'inline-flex' }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker', 'DatePicker']}>

                            <DatePicker label="Check In" value={selectedDate.checkIn} onChange={handleCheckInDate} />
                            <DatePicker
                                label="Check Out"
                                value={selectedDate.checkOut}
                                format="DD/MM/YYYY" // 13-09-2022
                                onChange={handleCheckOutDate}
                                slots={{
                                    openPickerIcon: EditCalendarRoundedIcon,
                                    openPickerButton: StyledButton,
                                    day: StyledDay,
                                }}
                                slotProps={{
                                    // openPickerIcon: { fontSize: 'large' },
                                    openPickerButton: { color: 'secondary' },
                                    textField: {
                                        // variant: 'filled',
                                        focused: true,
                                        color: 'secondary',
                                        helperText: 'DD/MM/YYYY'
                                    },
                                    field: { clearable: true, onClear: () => setCleared(true) },
                                }}
                            />

                            {/* For clear date field */}
                            {cleared && (
                                <Alert
                                    sx={{ position: 'absolute', bottom: 0, right: 0 }}
                                    severity="success"
                                >
                                    Field cleared!
                                </Alert>
                            )}

                        </DemoContainer>
                    </LocalizationProvider>
                </Stack>

                <Button onClick={handleBooking} variant="contained" sx={{ display: 'block', margin: '20px auto' }}>BOOK NOW</Button>
            </div>

            <Bookings />
                            
        </div>
    );
};

export default Book;