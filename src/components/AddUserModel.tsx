import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "react-dates/lib/css/_datepicker.css";
//import DateAdapter from "@mui/lab/AdapterDayjs";

interface IProps {
  onCloseAddUserModal: () => void;
  onFetchUsersHandler: () => void;
}

const AddUserModel: React.FC<IProps> = (props) => {
  // const [state, setState] = useState<any>(new Date().toLocaleString());
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    props.onCloseAddUserModal();
  };
  const [formState, setFormState] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    age: "",
    salary: "",
    birthday: new Date(),
  });

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    //Add normal user
    // console.log(formState)
    const object1 = {
      userName: formState.userName,
      firstName: formState.firstName,
      lastName: formState.lastName,
      email: formState.email,
      password: formState.password,
      age: formState.age,
      salary: formState.salary,
      
    };
    async function addDynamicUser() {
      try {
        console.log("Here we entered the API");
        console.log(formState);
        const response = await fetch("http://localhost:5000/api/test/create/", {
          method: "POST",
          body: JSON.stringify(formState),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          props.onFetchUsersHandler();
          //   fetchUsersHandlers();
        }
        if (!response.ok) {
          console.log("Response is not okay!");
        }
      } catch (error: any) {
        console.log(error.message);
        console.log("Error got Catched!!");
      }
    }
    addDynamicUser();
    setFormState({
      userName: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      age: "",
      salary: "",
      birthday: new Date()
    });
    handleClose();
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
            Add User
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
                  value={formState.userName || ""}
                />
                <TextField
                  label="First Name"
                  variant="outlined"
                  color="primary"
                  style={{ marginBottom: "10px" }}
                  name="firstName"
                  required
                  onChange={changeHandler}
                  value={formState.firstName || ""}
                />
                <TextField
                  label="Last Name"
                  variant="outlined"
                  color="primary"
                  style={{ marginBottom: "10px" }}
                  name="lastName"
                  required
                  onChange={changeHandler}
                  value={formState.lastName || ""}
                />
                <TextField
                  label="Email"
                  variant="outlined"
                  color="primary"
                  style={{ marginBottom: "10px" }}
                  name="email"
                  required
                  onChange={changeHandler}
                  value={formState.email || ""}
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
                  value={formState.password || ""}
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
                  value={formState.age || ""}
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
                  value={formState.salary || ""}
                />
                <TextField
                  id="date"
                  label="Birthday"
                  type="date"
                  name="birthday"
                  onChange={changeHandler}
                  defaultValue="2017-05-24"
                  sx={{ width: 220 }}
                  value={formState.birthday}
                  InputLabelProps={{
                    shrink: true,
                  }}
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
                Add
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default AddUserModel;
