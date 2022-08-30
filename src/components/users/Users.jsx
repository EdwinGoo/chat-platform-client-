import React from "react";
import styled from "styled-components";
import UserList from "./UserList";
import UserDetail from "./UserDetail";

const UsersArea = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

function Users() {
  return (
    <>
      <UsersArea>
        <UserList />
        <UserDetail />
      </UsersArea>
    </>
  );
}

export default Users;
