import { useEffect, useState } from "react";
import { Button, Modal, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import dayjs from "dayjs";
import Calendar from "./components/Calendar";
import "./App.css";
import TimeTable from "./components/TimeTable";
import Confirmation from "./components/Confirmation";
import TextField from "@mui/material/TextField";
import validator from "validator";

const availabilityModalStyle = {
  bgcolor: "background.paper",
  borderRadius: 5,
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  marginTop: "50px",
  marginBottom: "50px",
  width: 1000,
};

function App() {
  const [openAvailabilityModal, setOpenAvailabilityModal] = useState(false);
  const [availability, setAvailability] = useState([]);
  const [roomId, setRoomId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedTime, setSelectedTime] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(null);

  const getDateTimeAvailability = async () => {
    try {
      const response = await fetch(
        "https://rzssj8nj3c.execute-api.eu-central-1.amazonaws.com"
      );
      const { availability, room_id: id } = await response.json();
      setAvailability(availability);
      setRoomId(id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDateTimeAvailability();
  }, []);

  const validateUserEmail = (value) => {
    setUserEmail(value);
    if (value === "") {
      setIsEmailValid(null);
      return;
    }
    validator.isEmail(value) && value.endsWith("@vu.nl")
      ? setIsEmailValid(true)
      : setIsEmailValid(false);
  };

  return (
    <div className='flex flex-col h-screen'>
      <header className='flex flex-row items-center justify-between sm:px-16 px-8 pt-8'>
        <h1 className='sm:text-2xl text-sm font-bold'>
          Omnia Room Booking System
        </h1>
        <img className='object-scale-down' src='./omnia-vu-logo.png' />
      </header>
      <main className='flex items-center justify-center flex-1'>
        <Button
          variant='outlined'
          onClick={() => setOpenAvailabilityModal(!openAvailabilityModal)}>
          Book room {roomId}
        </Button>
        <Modal
          open={openAvailabilityModal}
          onClose={() => setOpenAvailabilityModal(false)}
          sx={{ overflow: "scroll" }}>
          <div className='flex justify-center'>
            <Box sx={{ ...availabilityModalStyle }}>
              <div className='flex justify-end '>
                <img
                  className='object-scale-down shadow-2xl rounded-xl'
                  src='./omnia-vu-logo.png'
                />
              </div>
              <div className='flex gap-3'>
                <button onClick={() => setOpenAvailabilityModal(false)}>
                  <ArrowBackIcon />
                </button>
                <h2 className='sm:text-2xl text-sm font-bold'>Availability</h2>
              </div>
              <form
                onSubmit={(e) => e.preventDefault()}
                className='flex flex-col items-center my-5'>
                <ul className='text-center text-xl font-bold '>
                  <li>
                    <label htmlFor='date'>Date</label>
                    <Calendar
                      availability={availability}
                      selectedDate={selectedDate}
                      getSelectedDate={(newDate) => setSelectedDate(newDate)}
                    />
                  </li>
                  <li>
                    <label htmlFor='time'>Time</label>
                    <TimeTable
                      availability={availability}
                      selectedDate={selectedDate}
                      selectedTime={selectedTime}
                      getSelectedTime={(newTime) => setSelectedTime(newTime)}
                    />
                  </li>
                  <li className='flex flex-col'>
                    <label htmlFor='email' className='mt-12'>
                      Email
                    </label>
                    <TextField
                      error={isEmailValid === false}
                      required
                      id='email'
                      type='email'
                      variant='standard'
                      InputProps={{ disableUnderline: true }}
                      onBlur={() => validateUserEmail(userEmail)}
                      helperText={
                        isEmailValid === false ? "Enter a @vu.nl account" : " "
                      }
                      value={userEmail}
                      onChange={(e) => validateUserEmail(e.target.value)}
                      placeholder='student@vu.nl'
                    />
                  </li>
                  <li className='mt-2.5'>
                    <Confirmation
                      setOpenAvailabilityModal={setOpenAvailabilityModal}
                      isEmailValid={isEmailValid}
                      selectedDate={selectedDate}
                      selectedTime={selectedTime}
                      userEmail={userEmail}
                    />
                  </li>
                </ul>
              </form>
            </Box>
          </div>
        </Modal>
      </main>
    </div>
  );
}

export default App;
