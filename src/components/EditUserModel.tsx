import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";


const EditUserModel = (props: any) => {
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    props.onHide();
  };

  const [state, setState] = useState({
    userName: props.editedUser.UserName,
    firstName: props.editedUser.FirstName,
    lastName: props.editedUser.LastName,
    email: props.editedUser.Email,
    password: props.editedUser.Password,
    age: props.editedUser.Age,
    salary: props.editedUser.Salary,
  });

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  

  const submitHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const object1 = {
      UserName: state.userName,
      FirstName: state.firstName,
      LastName: state.lastName,
      Email: state.email,
      Password: state.password,
      Age: state.age,
      Salary: state.salary,
    };
    console.log(object1, "Object1")
    //props.onUpdateUser(object1);
    async function updateUser(data: any) {
      console.log("We entered the update API");
      try {
        const response = await fetch(
          `http://localhost:5000/api/test/${object1.UserName}/update/`,
          {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          props.onFetchUsersHandler();
          //fetchUsersHandler();
          console.log("It worked!");
          //setShowEditModel(false);
          props.onHide();
        }
        if (!response.ok) {
          console.log("Response is not okay!");
        }
      } catch (error: any) {
        console.log(error.message);
        console.log("Error got Catched!!");
      }
    }
    updateUser(object1);
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 550,
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
            variant="h6"
            component="h2"
            style={{ marginBottom: "10px" }}
          >
            Update User
          </Typography>
          <form onSubmit={submitHandler}>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                }}
              >
                <TextField
                  label="Username"
                  variant="outlined"
                  color="primary"
                  style={{ marginBottom: "10px" }}
                  name="userName"
                  required
                  onChange={changeHandler}
                  value={state.userName || ""}
                />
                <TextField
                  label="First Name"
                  variant="outlined"
                  color="primary"
                  style={{ marginBottom: "10px" }}
                  name="firstName"
                  required
                  onChange={changeHandler}
                  value={state.firstName || ""}
                />
                <TextField
                  label="Last Name"
                  variant="outlined"
                  color="primary"
                  style={{ marginBottom: "10px" }}
                  name="lastName"
                  required
                  onChange={changeHandler}
                  value={state.lastName || ""}
                />
                <TextField
                  label="Email"
                  variant="outlined"
                  color="primary"
                  style={{ marginBottom: "10px" }}
                  name="email"
                  required
                  onChange={changeHandler}
                  value={state.email || ""}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "start",
                }}
              >
                <TextField
                  label="Password"
                  variant="outlined"
                  color="primary"
                  style={{ marginBottom: "10px" }}
                  name="password"
                  required
                  type="password"
                  onChange={changeHandler}
                  value={state.password || ""}
                />
                <TextField
                  label="Age"
                  variant="outlined"
                  color="primary"
                  style={{ marginBottom: "10px" }}
                  name="age"
                  required
                  type="number"
                  onChange={changeHandler}
                  value={state.age || ""}
                />
                <TextField
                  label="Salary"
                  variant="outlined"
                  color="primary"
                  style={{ marginBottom: "10px" }}
                  name="salary"
                  required
                  type="number"
                  onChange={changeHandler}
                  value={state.salary || ""}
                />
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <Button
                type="submit"
                fullWidth
                style={{ marginLeft: "20px", marginRight: "20px" }}
                variant="contained"
              >
                Update
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default EditUserModel;
