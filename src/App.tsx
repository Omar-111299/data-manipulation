import React, { Fragment, useState, useEffect, useCallback } from "react";
import "./App.css";
import UsersList from "./components/UsersList";
import "bootstrap/dist/css/bootstrap.min.css";
import EditUserModel from "./components/EditUserModel";
import TodoModel from "./components/TodoModel";
import MainNavigation from "./UI/MainNavigations";
import Search from "./components/Search";
import Footer from "./UI/Footer";
import "./UI/Footer.css";
import FlightsList from "./components/FlighsList";
import FlightTableMainNavigation from "./UI/FlightTableMainNavigation";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from 'redux';
import { State } from './state/reducers';





const axios = require("axios").default;
const App = () => {
  const [users, setUsers] = useState([]);
  const [showEditModel, setShowEditModel] = useState(false);
  const [editedUser, setEditedUser] = useState<any>();
  const [todos, setTodos] = useState<any>([]);
  const [showTodosModel, setShowTodosModel] = useState(false);
  const [flights, setFlights] = useState([]);

  //Material UI tabs
  const [value, setValue] = useState(false);
  const handleChange = (event: React.SyntheticEvent, newValue: boolean) => {
    setValue(newValue);
  };

  //React Router
  let navigate = useNavigate();
  //This state is here to save the userId and send it as props to todos
  const [userIdNumber, setUserIdNumber] = useState<number | undefined>();

  const fetchUsersHandler = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5000/api/test/search/");
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      console.log("we are in the parent fetch handler");
      // console.log(data);
      const dbUsers = data.map((dbUser: any) => {
        return {
          id: dbUser.Id,
          userName: dbUser.UserName,
          firstName: dbUser.FirstName,
          lastName: dbUser.LastName,
          email: dbUser.Email,
          password: dbUser.Password,
          age: dbUser.Age,
          salary: dbUser.Salary,
          birthday: dbUser.Birthday,
          gender: dbUser.Gender,
        };
      });
      setUsers(dbUsers);
    } catch (error: any) {
      console.log(error.message, "Error got catched!!");
    }
  }, []);

  const fetchFlightsHandler = useCallback(async () => {
    try {
      console.log("We are here");
      const response = await axios.get(
        "https://asynce:p@5yTd3SML3iKaW@opensky-network.org/api/flights/arrival?airport=KTEB&begin=1611365147&end=1611451547"
      );

      const data = await response.data;

      const dbFlights = data.map((dbFlight: any) => {
        return {
          id: dbFlight.icao24,
          firstSeen: dbFlight.firstSeen,
          departureAirport: dbFlight.estDepartureAirport,
          lastSeen: dbFlight.lastSeen,
          arrivalAirport: dbFlight.estArrivalAirport,
        };
      });
      setFlights(dbFlights);
    } catch (error: any) {
      console.log(error.message, "Error got catched!!");
    }
  }, []);

  // Fetch all the users from the api using fetchUsersHandlers API
  useEffect(() => {
    fetchUsersHandler();
    fetchFlightsHandler();
  }, [fetchUsersHandler, fetchFlightsHandler]);

  //Delete API
  async function deleteUser(data: string) {
    try {
      const response = await fetch(`http://localhost:5000/api/test/${data}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        fetchUsersHandler();
        console.log("It worked!");
      }
      if (!response.ok) {
        console.log("Response is not okay!");
      }
    } catch (error: any) {
      console.log(error.message);
      console.log("Error got Catched!!");
    }
  }
  //Get User API for edit
  async function editUser(username: string) {
    try {
      console.log("Here we entered the GET API");
      //console.log(users)
      const response = await fetch(
        `http://localhost:5000/api/test/${username}/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data, "data from get");
        setEditedUser(data);
        setShowEditModel(true);
      }
      if (!response.ok) {
        console.log("Response is not okay!");
      }
    } catch (error: any) {
      console.log(error.message);
      console.log("Error got Catched!!");
    }
  }

  const hideEditUserModael = () => {
    setShowEditModel(false);
  };

  const hideAddTodoModal = () => {
    setShowTodosModel(false);
  };
  // Get todos to a specfic user
  async function getUserId(userId: number) {
    try {
      setUserIdNumber(userId);
      console.log("Here we entered the API");
      const response = await fetch(
        `http://localhost:5000/api/test/${userId}/add/`,
        {
          method: "Get",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();

        const dbTodos = data.map((dbTodo: any) => {
          return {
            id: dbTodo.Id,
            subject: dbTodo.Subject,
            note: dbTodo.Note,
            status: dbTodo.Status,
          };
        });

        setTodos(dbTodos);
        setShowTodosModel(true);
        console.log(todos, "The todos");
        console.log("The GET TODOS worked!");
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
    <>
      <Box
        sx={{ width: "100%" }}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab
            value= {false}
            label="Users Table"
            onClick={() => navigate("/users")}
          />
          <Tab
            value= {true}
            label="Flights Table"
            onClick={() => navigate("/flights")}
          />
        </Tabs>
      </Box>

      <div className="content">
        {showEditModel && (
          <EditUserModel
            editedUser={editedUser}
            onFetchUsersHandler={fetchUsersHandler}
            onHide={hideEditUserModael}
          />
        )}
        {showTodosModel && (
          <TodoModel
            todos={todos}
            showTodo={showTodosModel}
            userIdNumber={userIdNumber}
            onGetUserId={getUserId}
            onHide={hideAddTodoModal}
          />
        )}

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Search onFetchUsersHandler={fetchUsersHandler} />
                <MainNavigation />
                <UsersList
                  users={users}
                  onDeleteUser={deleteUser}
                  onEditUser={editUser}
                  onGetUserId={getUserId}
                />
              </>
            }
          />
        </Routes>

        {value === false && (
          <Routes>
            <Route
              path="/users"
              element={
                <>
                  <Search onFetchUsersHandler={fetchUsersHandler} />
                  <MainNavigation />
                  <UsersList
                    users={users}
                    onDeleteUser={deleteUser}
                    onEditUser={editUser}
                    onGetUserId={getUserId}
                  />
                </>
              }
            />
          </Routes>
        )}
        {/* {value === "one" && (
          <>
            <Search onFetchUsersHandler={fetchUsersHandler} />
            <MainNavigation />
            <UsersList
              users={users}
              onDeleteUser={deleteUser}
              onEditUser={editUser}
              onGetUserId={getUserId}
            />
          </>
        )} */}

        {value === true && (
          <Routes>
            <Route
              path="flights"
              element={
                <>
                  <FlightTableMainNavigation />
                  <FlightsList flights={flights} users={users} />
                </>
              }
            />
          </Routes>
        )}
      </div>
    </>
  );
};

export default App;
