import { Button, Modal, Box } from "@mui/material";
import { useState } from "react";

const confirmationModalStyle = {
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
  width: 500,
  padding: 5,
};

const Confirmation = ({ isEmailValid }) => {
  const [confirmed, setConfirmed] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        disabled={!isEmailValid ? true : false}
        type='submit'
        value='submit'
        variant='contained'
        onClick={() => setOpen(true)}>
        Confirm
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{ ...confirmationModalStyle }}
          className='flex flex-col items-center my-5'>
          <h2 className='sm:text-2xl text-sm font-bold'>
            Your Booking Details
          </h2>
          <div className='flex flex-row items-center gap-8 my-6'>
            <ul>
              <li>
                <strong>Date:</strong> Monday, March 2nd 2024
              </li>
              <li>
                <strong>Time:</strong> 10:00 - 11:00
              </li>
            </ul>
            <img
              src='/confirmation-icon.PNG'
              alt='confirmation-icon'
              className='w-14'
            />
          </div>
          <p className='text-center'>
            You will receive an email shortly with the booking confirmation
          </p>
          <div className='flex flex-row items-center gap-8 mt-6'>
            <Button>Share</Button>
            <Button onClick={() => setOpen(false)}>Homepage</Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Confirmation;
