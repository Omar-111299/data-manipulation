import React from "react";
import User from "./User";

interface IProps {
    users: {
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
      }[];
      onDeleteUser: (data: string) => void;
      onEditUser: (data: string) => void;
      onGetUserId: (userId: number) => void;
}

const UsersList: React.FC<IProps> = (props) => {
  //Get the username for the deletion api
  const getUserName = (username: string) => {
    const data = { username };
    props.onDeleteUser(username);
  };

  //Get the username for edit
  const getUserNameForEdit = (username: string) => {
    console.log(username, "This is the username");
    props.onEditUser(username);
  }

  const getUserId = (userId: number) => {
    props.onGetUserId(userId);
  }
  return (
    
    <div>
      {props.users.map((user) => (
        <User
          key={Math.random()}
          id={user.id}
          userName={user.userName}
          firstName={user.firstName}
          lastName={user.lastName}
          email={user.email}
          password={user.password}
          age={user.age}
          salary={user.salary}
          birthday={user.birthday}
          gender={user.gender}

          onGetUserName={getUserName}
          onGetUserNameForEdit={getUserNameForEdit}
          onGetUserId={getUserId}
        />
      ))}
    </div>
  );
};

export default UsersList;
