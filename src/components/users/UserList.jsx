import React, { useState } from "react";
import styled from "styled-components";
import SubTitle from "../common/SubTitle";
import SelectBox from "../common/SelectBox";

const UserListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  flex-basis: 30%;
`;

const UserSearchArea = styled.div`
  display: flex;
  align-items: center;
  color: black;
  margin-right: auto;
  font-size: var(--sub-title-font-size);
  color: #000000;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background-color: #fefefe;
  padding: 0.7rem;
  width: calc(100%);
  border-radius: 9px;
`;

function UserList({ legacyMap, selecteOption, setSelecteOption }) {
  // const [selecteOption, setSelecteOption] = useState(data[0]);

  return (
    <>
      <UserListWrapper>
        <SubTitle>사용자 리스트 검색</SubTitle>
        <UserSearchArea>
          <SelectBox
            options={legacyMap}
            selectedOption={selecteOption}
            setSelectedOption={setSelecteOption}
            width={"100%"}
          />
        </UserSearchArea>
      </UserListWrapper>
    </>
  );
}

export default UserList;
