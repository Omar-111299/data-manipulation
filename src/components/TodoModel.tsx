import React, { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import PositionedMeny from './PositionedMenu'

interface IProps {
  todos: {
    id: number;
    subject: string;
    note: string;
    status: number;
  }[];
  showTodo: boolean;
  userIdNumber: any;
  onGetUserId: (userId: number) => void;
  onHide: () => void
}

const TodoModel: React.FC<IProps> = (props) => {
  const [addTodoState, setAddTodoState] = useState(false);
  const [state, setState] = useState({
    subject: "",
    note: "",
    status: 11,
  });

  const changeHandler_3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Entered function");
    const { name, value } = event.target;
    setState((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(state);
    const object1 = {
      Subject: state.subject,
      Note: state.note,
      Status: state.status,
    };
    console.log(object1, "Object1");
    async function addTodo(object1: {}) {
      try {
        console.log("Here we entered the API");
        const response = await fetch(
          `http://localhost:5000/api/test/${props.userIdNumber}/add`,
          {
            method: "POST",
            body: JSON.stringify(object1),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          console.log("Here we go");
          console.log("Accepted");
        }
        if (!response.ok) {
          console.log("Response is not okay!");
        }
      } catch (error: any) {
        console.log(error.message);
        console.log("Error got Catched!!");
      }
    }
    addTodo(state);
    props.onGetUserId(props.userIdNumber);
    setAddTodoState(false);
  };

  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    props.onHide();
  };

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

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h4"
            component="h2"
            style={{ marginBottom: "10px" }}
          >
            Todos
          </Typography>
          {!addTodoState && (
            <div>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        colSpan={1}
                        component="th"
                        scope="row"
                        align="left"
                      >
                        Subject
                      </TableCell>
                      <TableCell colSpan={1} align="left">
                        Note
                      </TableCell>
                      <TableCell colSpan={1} align="left">
                        Status
                      </TableCell>
                      <TableCell colSpan={1} align="left">
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {props.todos.map((todo) => (
                      <TableRow key={Math.random()}>
                        <TableCell colSpan={1} align="left">
                          {todo.subject}
                        </TableCell>
                        <TableCell colSpan={1} align="left">
                          {todo.note}
                        </TableCell>
                        <TableCell colSpan={1} align="left">
                          {todo.status}
                        </TableCell>
                        <TableCell colSpan={1} align="left">
                          <PositionedMeny status={todo.status} id={todo.id} onGetUserId={props.onGetUserId} userIdNumber={props.userIdNumber}/>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  style={{ marginTop: "10px" }}
                  onClick={() => {
                    setAddTodoState(true);
                  }}
                >
                  Add Todo
                </Button>
              </div>
            </div>
          )}

          {addTodoState && (
            <form autoComplete="off" onSubmit={submitHandler}>
              <TextField
                label="Subject"
                variant="outlined"
                color="primary"
                fullWidth
                style={{ marginBottom: "10px" }}
                onChange={changeHandler_3}
                name="subject"
                required
                value={state.subject || ""}
              />

              <TextField
                label="Note"
                variant="outlined"
                color="primary"
                fullWidth
                onChange={changeHandler_3}
                name="note"
                required
                value={state.note || ""}
              />
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  style={{
                    marginTop: "10px",
                    backgroundColor: "#ff1744",
                    marginRight: "10px",
                  }}
                  onClick={() => {
                    setAddTodoState(false);
                  }}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  style={{ marginTop: "10px" }}
                >
                  Add
                </Button>
              </div>
            </form>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default TodoModel;
