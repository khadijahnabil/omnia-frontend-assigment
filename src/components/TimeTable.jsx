import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const timeFrames = [
  { id: 1, end_time: "09:00", start_time: "08:00" },
  { id: 2, end_time: "10:00", start_time: "09:00" },
  { id: 3, end_time: "11:00", start_time: "10:00" },
  { id: 4, end_time: "12:00", start_time: "11:00" },
  { id: 5, end_time: "13:00", start_time: "12:00" },
  { id: 6, end_time: "14:00", start_time: "13:00" },
  { id: 7, end_time: "15:00", start_time: "14:00" },
  { id: 8, end_time: "16:00", start_time: "15:00" },
  { id: 9, end_time: "17:00", start_time: "16:00" },
  { id: 10, end_time: "18:00", start_time: "17:00" },
  { id: 11, end_time: "19:00", start_time: "18:00" },
  { id: 12, end_time: "20:00", start_time: "19:00" },
];

const TimeTable = ({
  availability,
  selectedDate,
  selectedTime,
  getSelectedTime,
}) => {
  const formattedDate = selectedDate.format("YYYY-MM-DD");

  useEffect(() => {
    getSelectedTime([]);
  }, [selectedDate]);

  const getTimeAvailability = (availabilityData, formattedDate) => {
    return availabilityData.find(
      (availabilities) => availabilities.date === formattedDate
    )?.available_hours;
  };

  const availableHours = getTimeAvailability(availability, formattedDate);

  const toHourlyAvailabilityRanges = (availableHours) => {
    if (!availableHours) return [];
    const availableHoursInt = availableHours.map((hour) => {
      return {
        start_time: parseInt(hour.start_time),
        end_time: parseInt(hour.end_time),
      };
    });
    const hoursTimeFrame = availableHoursInt.map(
      (hour) => hour.end_time - hour.start_time
    );

    let hourRangesInt = [];

    for (let i = 0; i <= availableHoursInt.length; i++) {
      for (let j = 1; j <= hoursTimeFrame[i]; j++) {
        hourRangesInt.push({
          start_time: availableHoursInt[i].start_time + (j - 1),
          end_time: availableHoursInt[i].start_time + j,
        });
      }
    }

    return hourRangesInt
      .map((hour) => {
        return {
          start_time: `${hour.start_time}:00`,
          end_time: `${hour.end_time}:00`,
        };
      })
      .map((hour) => {
        let sTime = hour.start_time;
        let eTime = hour.end_time;
        if (sTime.length === 4) {
          sTime = `0${sTime}`;
        }
        if (eTime.length === 4) {
          eTime = `0${eTime}`;
        }
        return { start_time: sTime, end_time: eTime };
      });
  };

  const hourlyAvRanges = toHourlyAvailabilityRanges(availableHours);

  const showErrorMessage = () =>
    toast.error("Please select up to 2 adjacent time slots only.", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

  const handleTimeSelection = (range) => {
    getSelectedTime((prevState) => {
      if (prevState.map((x) => x.id).includes(range.id)) {
        return [...prevState.filter((state) => state.id !== range.id)];
      }
      if (prevState.length >= 2) {
        showErrorMessage();
        return [...prevState];
      }
      if (range.id > prevState[0]?.id + 1 || range.id < prevState[0]?.id - 1) {
        showErrorMessage();
        return [...prevState];
      }
      return [...prevState, range];
    });
  };

  return (
    <Box className='mt-2.5'>
      <Grid container spacing={2}>
        {timeFrames.map((range) => {
          return (
            <Grid item xs={4} key={range.id}>
              <Button
                variant={
                  selectedTime[0]?.id === range.id ||
                  selectedTime[1]?.id === range.id
                    ? "contained"
                    : "outlined"
                }
                onClick={() => handleTimeSelection(range)}
                disabled={
                  !hourlyAvRanges.some(
                    (r) =>
                      r.start_time === range.start_time &&
                      r.end_time === range.end_time
                  )
                }>
                {range.start_time} - {range.end_time}
              </Button>
            </Grid>
          );
        })}
        <ToastContainer
          position='top-center'
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
          transition={Bounce}
          className='Toastify__toast--error'
        />
      </Grid>
    </Box>
  );
};

export default TimeTable;
