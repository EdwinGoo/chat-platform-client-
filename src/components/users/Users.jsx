import React, { useState, useEffect } from "react";
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

  const legacyMap = data?.reduce(
    (acc, it) => [...acc, { id: it.id, value: it.lgcyNm }],
    []
  );

  const [selecteOption, setSelecteOption] = useState("");

  if (error) return <div>error</div>;
  if (!data) return <Loading />;
  return (
    <>
      <UsersArea>
        <UserList
          legacyMap={legacyMap}
          selecteOption={selecteOption}
          setSelecteOption={setSelecteOption}
        />
        <UserDetail />
      </UsersArea>
    </>
  );
}

export default Users;
