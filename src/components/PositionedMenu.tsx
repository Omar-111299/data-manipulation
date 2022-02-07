import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface IProps {
  status: any;
  id: number;
  onGetUserId: (userId: number) => void;
  userIdNumber: any;
}

const PositionedMenu: React.FC<IProps> = (props) => {
  const [todoStatus, setTodoStatus] = useState({
      Status: props.status
  });
  const handleChange = (event: SelectChangeEvent) => {
    setTodoStatus({Status: event.target.value as string});
    const object1 = {
        Status: event.target.value as string
    }
    updateTodoStatus(object1);
    // props.onGetUserId(props.userIdNumber)
  };    
  async function updateTodoStatus(data: {}) {
      console.log(todoStatus.Status, "This is the status")
  
    try {
      const response = await fetch(
        `http://localhost:5000/api/test/${props.id}/updatetodostatus/`,
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
  return (
    <FormControl>
      <InputLabel>Todo Status</InputLabel>
      <Select
        style={{ width: "150px" }}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={todoStatus.Status}
        label="Todo Status"
        onChange={handleChange}
      >
        <MenuItem value={11}>New</MenuItem>
        <MenuItem value={21}>In-progress</MenuItem>
        <MenuItem value={31}>Done</MenuItem>
      </Select>
    </FormControl>
  );
};

export default PositionedMenu;
