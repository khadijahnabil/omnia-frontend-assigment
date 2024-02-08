import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useState } from "react";
import dayjs from "dayjs";

const Calendar = ({ availability }) => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const twoYearsAhead = dayjs().add(2, "year");

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={selectedDate}
        onChange={(newDate) => setSelectedDate(newDate)}
        minDate={dayjs()}
        maxDate={twoYearsAhead}
        disablePast
      />
    </LocalizationProvider>
  );
};

export default Calendar;
