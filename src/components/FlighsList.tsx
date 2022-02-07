import React, { useState } from "react";
import FlightModal from "./FlightModal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import { makeStyles, createStyles } from "@mui/styles";
import { Button } from "@mui/material";

interface IProps {
  flights: {
    id: string;
    firstSeen: string;
    departureAirport: string;
    lastSeen: string;
    arrivalAirport: string;
  }[];
  users: {
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
  }[];
}

const FlightsList: React.FC<IProps> = (props) => {
  const [showFlightModal, setShowFlightModal] = useState(false);
  const [flightData,setFlightData] = useState({})
  const useStyles = makeStyles({
    modifier: {
      tableLayout: "fixed",
    },
  });

  
  const hideFlightModal = () => {
    setShowFlightModal(false);
  };

  const classes = useStyles();


  // const firstSeenDate = new Date(+flight.firstSeen * 1000).toString();
  // const lastSeenDate = new Date(+flight.lastSeen * 1000).toString();

  return (
    <Container maxWidth="xl">
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="simple table"
          className={classes.modifier}
        >
          <TableBody>
            {props.flights.map((flight) => (
              <TableRow key={Math.random()}>
                <TableCell component="th" scope="row">
                  {flight.id}
                </TableCell>
                <TableCell colSpan={1} align="left">
                  {new Date(+flight.firstSeen * 1000).toString()}
                  {/* {flight.firstSeen} */}
                </TableCell>
                <TableCell colSpan={1} align="left">
                  {flight.arrivalAirport}
                </TableCell>
                <TableCell colSpan={1} align="left">
                  {new Date(+flight.lastSeen * 1000).toString()}
                  {/* {flight.lastSeen} */}
                </TableCell>
                <TableCell colSpan={1} align="left">
                  {flight.departureAirport}
                </TableCell>
                <TableCell colSpan={2} align="left">
                  <Button
                    variant="contained"
                    onClick={() => {
                      setFlightData(flight)
                      setShowFlightModal(true)
                      console.log("Hello");
                    }}
                  >
                    Show
                  </Button>
               
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {showFlightModal && (
                    <FlightModal
                      flightData={flightData}
                      users={props.users}
                      onHide={hideFlightModal}
                      showModal={showFlightModal}
                    />
                  )}
    </Container>

    // <div>
    //   {props.flights.map((flight) => (
    //     <Flight
    //       key={Math.random()}
    //       id={flight.id}
    //       firstSeen={flight.firstSeen}
    //       departureAirport={flight.departureAirport}
    //       lastSeen={flight.lastSeen}
    //       arrivalAirport={flight.arrivalAirport}
    //     />
    //   ))}
    // </div>
  );
};

export default FlightsList;
