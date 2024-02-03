import { Button } from "@mui/material";
import "./App.css";

function App() {
  return (
    <div className='flex flex-col h-screen'>
      <header className='flex flex-row items-center justify-between sm:px-16 px-8 pt-8'>
        <h1 className='sm:text-2xl text-sm font-bold'>
          Omnia Room Booking System
        </h1>
        <img className='object-scale-down' src='./omnia-vu-logo.png' />
      </header>
      <main className='flex items-center justify-center flex-1'>
        <Button variant='outlined'>Book a room</Button>
      </main>
    </div>
  );
}

export default App;
