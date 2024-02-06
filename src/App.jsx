import { useState } from "react";
import { Button, Modal, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Calendar from "./components/Calendar";
import "./App.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: 5,
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
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
        <Modal open={open} onClose={() => setOpen(false)}>
          <Box sx={{ ...style, width: 1000 }}>
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
            <form method='post' className='flex flex-col items-center my-5'>
              <ul className='text-center text-xl font-bold '>
                <li>
                  <label htmlFor='date'>Date</label>
                  <Calendar />
                </li>
              </ul>
            </form>
          </Box>
        </Modal>
      </main>
    </div>
  );
}

export default App;
