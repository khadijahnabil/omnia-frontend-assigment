import { useState } from "react";
import { Button, Modal, Box } from "@mui/material";
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
            <h2 className='sm:text-2xl text-sm font-bold'>Availability</h2>
          </Box>
        </Modal>
      </main>
    </div>
  );
}

export default App;
