import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useState } from "react";
import dayjs from "dayjs";

const Calendar = ({ availability }) => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const availableDates = availability.map(
    (availabilities) => availabilities.date
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={selectedDate}
        onChange={(newDate) => setSelectedDate(newDate)}
        minDate={dayjs().subtract(1, "month")}
        maxDate={dayjs().add(2, "year")}
        shouldDisableDate={(dateParam) => {
          const dateInFocus = dateParam
            // TODO: figure out why dateParam is 1 day in the past
            .add(1, "day")
            .toISOString()
            .split("T")[0];
          return !availableDates.includes(dateInFocus);
        }}
      />
    </LocalizationProvider>
  );
};

export default Calendar;
