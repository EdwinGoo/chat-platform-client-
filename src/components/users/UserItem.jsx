import React from "react";
import styled from "styled-components";
import palette from "../../assets/palette";

const UserItemWrapper = styled.div.attrs((props) => props)`
  cursor: pointer;
  background: transparent;
  display: flex;
  align-items: center;
  border-bottom: solid 1px ${palette.gray[2]};
  min-height: 3rem;
  padding: 0 0 0 0.5rem;
`;
function UserItem({ accntId, userNm, userId, setUserId }) {
  const onClickUser = (id) => {
    setUserId(id);
  };

  return (
    <>
      <UserItemWrapper onClick={() => onClickUser(userId)}>
        {accntId},{userNm}
      </UserItemWrapper>
    </>
  );
}

export default UserItem;
