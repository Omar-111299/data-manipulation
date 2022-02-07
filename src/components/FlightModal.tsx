import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import { makeStyles, createStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TableHead } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface IUser {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age: string;
  salary: string;
  birthday: Date;
  gender: number;
}
interface IProps {
  users: IUser[];
  flightData: any;
  onHide: () => void;
  showModal: boolean;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const FlightModal: React.FC<IProps> = (props) => {
  const useStyles = makeStyles({
    modifier: {
      tableLayout: "fixed",
    },
  });
  const classes = useStyles();
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const [state, setState] = useState<any>();
  const handleClose = () => {
    console.log(props.flightData, "data");
    props.onHide();
  };

  const firstSeenDate = new Date(+props.flightData.firstSeen * 1000);
  const lastSeenDate = new Date(+props.flightData.lastSeen * 1000);
  console.log(firstSeenDate, "first", lastSeenDate, "last");

  const handleChange = (event: SelectChangeEvent) => {
    setState(event.target.value);
    setShowSubmitButton(true)
    // const apiId = event.target.value;

    // addFlight(props.flightData, state);
  };
  async function addFlight(data: {}, data2: string) {
    try {
      const response = await fetch(
        `http://localhost:5000/api/flights/${data2}/addflight`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        //   fetchUsersHandler();
        console.log("The update worked!");
      }
      if (!response.ok) {
        console.log("Response is not okay!");
      }
    } catch (error: any) {
      console.log(error.message);
      console.log("Error got Catched!!");
    }
  }


  const submitHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(props.flightData, "flightData")
    addFlight(props.flightData, state);
    setShowSubmitButton(false);
  }

  return (
    <Modal
      open={props.showModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Text in a modal
        </Typography>
        <Container maxWidth="xl">
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              aria-label="simple table"
              className={classes.modifier}
            >
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>First Seen</TableCell>
                  <TableCell>Arrival Airport</TableCell>
                  <TableCell>Last Seen</TableCell>
                  <TableCell>Departure Airport</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                    {props.flightData.id}
                  </TableCell>
                  <TableCell colSpan={1} align="left">
                    {firstSeenDate.toString()}
                    {/* {props.flightData.firstSeen} */}
                  </TableCell>
                  <TableCell colSpan={1} align="left">
                    {props.flightData.arrivalAirport}
                  </TableCell>
                  <TableCell colSpan={1} align="left">
                    {lastSeenDate.toString()}
                    {/* {props.flightData.lastSeen} */}
                  </TableCell>
                  <TableCell colSpan={1} align="left">
                    {props.flightData.departureAirport}
                  </TableCell>
                  <TableCell colSpan={2} align="left">
                    <form onSubmit={submitHandler}>
                    <FormControl>
                      <InputLabel>User Name</InputLabel>
                      <Select
                        style={{ width: "200px" }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="User Name"
                        onChange={handleChange}
                        // value={}
                      >
                        {props.users.map((user) => (
                          <MenuItem key={Math.random()} value={user.id}>
                            {user.userName}
                          </MenuItem>
                        ))}
                      </Select>
                      {showSubmitButton && <Button style={{marginTop: '10px'}} type='submit' variant="contained">Submit</Button>}
                    </FormControl>
                    </form>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
    </Modal>
  );
};

export default FlightModal;
