import { useState } from "react";
import { Button, Modal, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Calendar from "./components/Calendar";
import "./App.css";
import TimeTable from "./components/TimeTable";
import Confirmation from "./components/Confirmation";

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
  const [open, setOpen] = useState(false);

  return (
    <div className='flex flex-col h-screen'>
      <header className='flex flex-row items-center justify-between sm:px-16 px-8 pt-8'>
        <h1 className='sm:text-2xl text-sm font-bold'>
          Omnia Room Booking System
        </h1>
        <img className='object-scale-down' src='./omnia-vu-logo.png' />
      </header>
      <main className='flex items-center justify-center flex-1'>
        <Button variant='outlined' onClick={() => setOpen(!open)}>
          Book a room
        </Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
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
                <button onClick={() => setOpen(false)}>
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
                    <Calendar />
                  </li>
                  <li>
                    <label htmlFor='time'>Time</label>
                    <TimeTable />
                  </li>
                  <li className='flex flex-col'>
                    <label htmlFor='email' className='mt-12'>
                      Email
                    </label>
                    <input
                      type='email'
                      id='email'
                      name='email'
                      placeholder='student@vu.nl'
                    />
                  </li>
                  <li>
                    <Confirmation />
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
