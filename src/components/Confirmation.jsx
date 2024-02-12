import { Button, Modal, Box } from "@mui/material";
import { useState } from "react";
import { confirmationModalStyle } from "./utils/styling";

const Confirmation = ({
  setOpenAvailabilityModal,
  isEmailValid,
  selectedDate,
  selectedTime,
  userEmail,
}) => {
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

  const formattedDate = selectedDate.format("dddd, MMMM	D");

  const findMinMaxTimes = (selectedTime) => {
    const startTimes = selectedTime.map((range) => parseInt(range.start_time));
    const endTimes = selectedTime.map((range) => parseInt(range.end_time));

    let minTime = Math.min(...startTimes).toString();
    let maxTime = Math.max(...endTimes).toString();

    if (minTime.length === 1) {
      minTime = `0${minTime}`;
    }
    if (maxTime.length === 1) {
      maxTime = `0${maxTime}`;
    }
    return `${minTime}:00 - ${maxTime}:00`;
  };

  return (
    <>
      <Button
        disabled={!isEmailValid || selectedTime.length <= 0 ? true : false}
        type='submit'
        value='submit'
        variant='contained'
        onClick={() => setOpenConfirmationModal(true)}>
        Confirm
      </Button>
      <Modal
        open={openConfirmationModal}
        onClose={() => setOpenAvailabilityModal(false)}>
        <Box
          sx={{ ...confirmationModalStyle }}
          className='flex flex-col items-center my-5'>
          <h2 className='sm:text-2xl text-sm font-bold'>
            Your Booking Details
          </h2>
          <div className='flex flex-row items-center gap-8 my-6'>
            <ul>
              <li>
                <strong>Email:</strong> {userEmail}
              </li>
              <li>
                <strong>Date:</strong> {formattedDate}
              </li>
              <li>
                <strong>Time:</strong> {findMinMaxTimes(selectedTime)}
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
            <Button onClick={() => setOpenAvailabilityModal(false)}>
              Homepage
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Confirmation;
