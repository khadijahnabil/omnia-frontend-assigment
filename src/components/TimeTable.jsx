import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const timeFrames = [
  {
    end_time: "09:00",
    start_time: "08:00",
  },
  {
    end_time: "10:00",
    start_time: "09:00",
  },
  {
    end_time: "11:00",
    start_time: "10:00",
  },
  {
    end_time: "12:00",
    start_time: "11:00",
  },
  {
    end_time: "13:00",
    start_time: "12:00",
  },
  {
    end_time: "14:00",
    start_time: "13:00",
  },
  {
    end_time: "15:00",
    start_time: "14:00",
  },
  {
    end_time: "16:00",
    start_time: "15:00",
  },
  {
    end_time: "17:00",
    start_time: "16:00",
  },
  {
    end_time: "18:00",
    start_time: "17:00",
  },
  {
    end_time: "19:00",
    start_time: "18:00",
  },
  {
    end_time: "20:00",
    start_time: "19:00",
  },
];

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const handleTimeSelection = () => {
  console.log("picked time");
};

const TimeTable = ({ availability }) => {
  return (
    <Box className='mt-2.5'>
      <Grid container spacing={2}>
        {timeFrames.map((range, index) => {
          return (
            <Grid item xs={4} key={index}>
              <Item>
                <button onClick={handleTimeSelection}>
                  {range.start_time} - {range.end_time}
                </button>
              </Item>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default TimeTable;
