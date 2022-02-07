import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";


interface IProps {
    gender: any
    id: number | string
}

const GenderMenu: React.FC<IProps>  = (props) => {
  const [userGender, setUserGender] = useState({
      Gender: props.gender
  });
  const handleChange = (event: SelectChangeEvent) => {
    setUserGender({Gender: event.target.value});
    const object1 = {
        Gender: event.target.value 
    }
    console.log(object1, "Gender")
    changeGender(object1);
    // props.onGetUserId(props.userIdNumber)
  };    
  async function changeGender(data: {}) {
      console.log(userGender.Gender, "This is the status")
  
    try {
      const response = await fetch(
        `http://localhost:5000/api/test/${props.id}/changegender/`,
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
      <InputLabel>Gender</InputLabel>
      <Select
        style={{ width: "100px" }}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Gender"
        value={userGender.Gender}
        onChange={handleChange} 
      >
        <MenuItem value={71}>Male</MenuItem>
        <MenuItem value={72}>Female</MenuItem>
      </Select>
    </FormControl>
  );
};

export default GenderMenu;