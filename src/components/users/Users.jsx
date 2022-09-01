import React from "react";
import styled from "styled-components";
import UserList from "./UserList";
import UserDetail from "./UserDetail";
import fetcher from "../../utils/fetcher";
import useSWR from "swr";
import Loading from "../common/Loading";

const UsersArea = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

function Users() {
  const { data, error } = useSWR("/mng/legacies", fetcher, {
    revalidateOnFocus: false,
  });

  return (
    <>
      {!data || error ? (
        <Loading />
      ) : (
        <UsersArea>
          <UserList legacies={data} />
          <UserDetail />
        </UsersArea>
      )}
    </>
  );
}

export default Users;
