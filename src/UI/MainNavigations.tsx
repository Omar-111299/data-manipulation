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


const MainNavigation = () => {
  const useStyles = makeStyles({
    modifier: {
      tableLayout: "fixed",
    },
  });

  const classes = useStyles();

  return (
    <Container maxWidth="xl">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" className={classes.modifier}>
          <TableHead>
            <TableRow>
              <TableCell colSpan={1} component="th" scope="row" align="left">
                ID
              </TableCell>
              <TableCell colSpan={1} align="left" style={{fontSize: '1rem'}}>User Name</TableCell>
              <TableCell colSpan={1} align="left" style={{fontSize: '1rem'}}>FirstName</TableCell>
              <TableCell colSpan={1} align="left" style={{fontSize: '1rem'}}>Last Name</TableCell>
              <TableCell colSpan={1} align="left" style={{fontSize: '1rem'}}>Email</TableCell>
              <TableCell colSpan={1} align="left" style={{fontSize: '1rem'}}>Password</TableCell>
              <TableCell colSpan={1} align="left" style={{fontSize: '1rem'}}>Age</TableCell>
              <TableCell colSpan={1} align="left" style={{fontSize: '1rem'}}>Salary</TableCell>
              <TableCell colSpan={1} align="left" style={{fontSize: '1rem'}}>Birthday</TableCell>
              <TableCell colSpan={1} align="left" style={{fontSize: '1rem'}}>Gender</TableCell>
              <TableCell colSpan={2} align="left" style={{fontSize: '1rem'}}>Actions</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default MainNavigation;
