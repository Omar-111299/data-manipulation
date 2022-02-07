import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import { makeStyles, createStyles } from "@mui/styles";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import IconButton from "@mui/material/IconButton";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import dayjs from 'dayjs'
import GenderMenu from "./GenderMenu";


interface IProps {
  key: number;
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
  onGetUserName: (data: string) => void;
  onGetUserNameForEdit: (data: string) => void;
  onGetUserId: (data: number) => void;
}

const Users: React.FC<IProps> = (props) => {
  const useStyles = makeStyles({
    modifier: {
      tableLayout: "fixed",
    },
  });

  const classes = useStyles();

  return (
    <Container maxWidth="xl">
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="simple table"
          className={classes.modifier}
        >
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                {props.id}
              </TableCell>
              <TableCell colSpan={1} align="left">
                {props.userName}
              </TableCell>
              <TableCell colSpan={1} align="left">
                {props.firstName}
              </TableCell>
              <TableCell colSpan={1} align="left">
                {props.lastName}
              </TableCell>
              <TableCell colSpan={1} align="left">
                {props.email}
              </TableCell>
              <TableCell colSpan={1} align="left">
                {props.password}
              </TableCell>
              <TableCell colSpan={1} align="left">
                {props.age}
              </TableCell>
              
              <TableCell colSpan={1} align="left">
                {props.salary}
              </TableCell><TableCell colSpan={1} align="left">
                {dayjs(props.birthday).format('DD/MM/YYYY')}
              </TableCell>
              <TableCell colSpan={1} align="left">
                <GenderMenu gender={props.gender} id={props.id}/>
              </TableCell>
              <TableCell colSpan={2} align="left" >
                <IconButton
                   onClick={() => props.onGetUserNameForEdit(props.userName)} style={{backgroundColor: '#2196f3', color: 'white', marginRight: '10px'}}>
                  <ModeEditOutlineOutlinedIcon />
                </IconButton>
                <IconButton onClick={()=>props.onGetUserId(+props.id)} style={{backgroundColor: '#00C851', color: 'white', marginRight: '10px'}}>
                  <ListAltOutlinedIcon />
                </IconButton>
                <IconButton onClick={() => props.onGetUserName(props.userName)} style={{backgroundColor: '#ff1744', color: 'white'}}>
                  <DeleteOutlinedIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Users;
