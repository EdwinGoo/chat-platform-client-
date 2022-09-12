import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SubTitle from "../common/SubTitle";
import SelectBox from "../common/SelectBox";
import Button from "../common/Button";
import Input from "../common/Input";

import palette from "../../assets/palette";
import fetcher from "../../utils/fetcher";
import UserItem from "./UserItem";
const UserListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  flex-basis: 30%;
`;

// const UserSearchArea = styled.div`
//   display: flex;
//   margin-bottom: 0.5rem;
//   background-color: ${palette.white};
//   width: 100%;
//   border-radius: 9px;
// `;

const UserItemArea = styled.div`
  margin-top: 0.5rem;
  background-color: ${palette.white};
  border-radius: 7px;
  border: solid 1px ${palette.gray[4]};
`;

function UserList({ legacyMap, selectedOption, setSelectedOption, setUserId }) {
  // const [selecteOption, setSelecteOption] = useState(data[0]);
  const [users, setUsers] = useState();
  const [legacyId, setLegacyID] = useState();
  useEffect(() => {
    if (selectedOption !== "") {
      // fetcher("/mng/users?legacyId=" + selectedOption.id).then((data) => {
      //   setUsers(data);
      // });
      setLegacyID(selectedOption.id);
    }
    return () => {
      // console.log("");
    };
  }, [selectedOption]);

  return (
    <>
      <UserListWrapper>
        <SubTitle>사용자 조회</SubTitle>
        <SelectBox
          options={legacyMap}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          width={"100%"}
        />
        <Input style={{ margin: "0.5rem 0 0 0" }}></Input>
        <Button style={{ margin: "0.5rem 0 0 0" }}>검색</Button>
        {users ? (
          <UserItemArea>
            {users.map((u) => (
              <UserItem
                key={u.accntId}
                accntId={u.accntId}
                userNm={u.userNm}
                userId={u.id}
                setUserId={setUserId}
              />
            ))}
          </UserItemArea>
        ) : (
          <br />
        )}
      </UserListWrapper>
    </>
  );
}

export default UserList;
