import React, { useState } from "react";
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

  const [selectedOption, setSelectedOption] = useState("");
  const [userId, setUserId] = useState();
  if (error) return <div>error</div>;
  if (!data) return <Loading />;
  return (
    <>
      <UsersArea>
        <UserList
          legacyMap={legacyMap}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          setUserId={setUserId}
        />
        <UserDetail userId={userId} />
      </UsersArea>
    </>
  );
}

export default Users;
