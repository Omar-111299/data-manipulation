import React, { useState } from "react";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TextField, Paper } from "@mui/material";
import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import AddUserModel from "./AddUserModel";
import { Routes, Route} from "react-router-dom";


interface IProps {
  onFetchUsersHandler: () => void;
}

const Search: React.FC<IProps> = (props) => {
  const [addUserModel, setAddUserModal] = useState(false);
  const closeAddUserModal = () => {
    setAddUserModal(false);
  };

  //Search API
  async function searchUsers(username: string) {
    try {
      const response = await fetch(
        `http://localhost:5000/api/test/filter?UserNameSearch=${username}/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        props.onFetchUsersHandler();
        console.log(data, "data from search handler in Search.tsx");
      }
      if (!response.ok) {
        console.log("Response is not okay!");
      }
    } catch (error: any) {
      console.log(error.message);
      console.log("Error got Catched!!");
    }
  }

  const changeHandler = (event: any) => {
    searchUsers(event.target.value);
    console.log('hello change handler')
  };

  return (
    <>
      {addUserModel && (
        <AddUserModel
          onCloseAddUserModal={closeAddUserModal}
          onFetchUsersHandler={props.onFetchUsersHandler}
        />
      )}
      
      <Container maxWidth="xl" style={{marginTop: '10%', marginBottom: '25px'}}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <TextField
                    onChange={changeHandler}
                    id="input-with-icon-textfield"
                    label="Search By User Name"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonSearchOutlinedIcon />
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                    focused
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    style={{ marginLeft: "1000px" }}
                    onClick={() => {
                      setAddUserModal(true);
                    }}
                  >
                    Add User
                  </Button>
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Search;
