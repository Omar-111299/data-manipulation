import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { makeStyles, createStyles } from "@mui/styles";


const FlightTableMainNavigation = () => {
  const useStyles = makeStyles({
    modifier: {
      tableLayout: "fixed",
    },
  });

  const classes = useStyles();

  return (
    <Container maxWidth="xl" style={{marginTop: '40px'}}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" className={classes.modifier} style={{backgroundColor: 'rgb(33, 150, 243)', marginTop: '10%', marginBottom: '25px'}}>
          <TableHead>
            <TableRow>
              <TableCell colSpan={1} component="th" scope="row" align="left">
                ID
              </TableCell>
              <TableCell colSpan={1} align="left" style={{fontSize: '1rem'}}>First Seen</TableCell>
              <TableCell colSpan={1} align="left" style={{fontSize: '1rem'}}>Arrival Airport</TableCell>
              <TableCell colSpan={1} align="left" style={{fontSize: '1rem'}}>Last Seen</TableCell>
              <TableCell colSpan={1} align="left" style={{fontSize: '1rem'}}>Departure Airport</TableCell>              
              <TableCell colSpan={2} align="left" style={{fontSize: '1rem'}}>Add To User</TableCell>              
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default FlightTableMainNavigation;