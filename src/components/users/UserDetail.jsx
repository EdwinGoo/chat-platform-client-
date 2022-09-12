import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SubTitle from "../common/SubTitle";
import palette from "../../assets/palette";
import fetcher from "../../utils/fetcher";

const UserDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  flex-basis: 70%;
`;
const UserDetailArea = styled.div`
  background: #ffffff;
  border-top-left-radius: 5px;
  height: 75%;
  margin: 0 0 0 0.5rem;
  border-radius: 7px;
  border: solid 1px ${palette.gray[4]};
`;

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: row;
  margin: 2rem;
`;
const ProfileImgDemo = styled.div`
  background-color: #63d364;
  border-radius: 100px;
  width: 7.5rem;
  height: 7.5rem;
  margin-right: 2rem;
`;

const ProfileDataArea = styled.div`
  font-size: 2rem;
  padding: 0.3rem;
`;

const ProfileColumn = styled.p`
  font-size: 2rem;
  padding: 0.2rem 0 0.2rem 0;
`;

const ProfileData = styled.p`
  font-size: 1.5rem;
  padding: 0.2rem 0 0.2rem 0;
  color: ${palette.gray[5]};
`;

// const ProfileData = styled.div`
//   display: flex;
//   align-items: center;
//   color: black;
//   margin-right: auto;
//   font-size: var(--sub-title-font-size);
//   color: #000000;
//   font-weight: 700;
//   margin-bottom: 0.5rem;
//   padding: 0.9rem 0 0.9rem 0.8rem;
//   border-radius: 9px;
// `;

function UserDetail({ userId }) {
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    if (userId !== undefined) {
      fetcher("/mng/user/" + userId).then((data) => {
        setUserInfo(data);
        console.log(data);
      });
    }

    return () => {
      // console.log("");
    };
  }, [userId]);
  return (
    <>
      <UserDetailWrapper>
        <SubTitle>사용자 정보</SubTitle>
        <UserDetailArea>
          <ProfileHeader>
            <ProfileImgDemo></ProfileImgDemo>
            <ProfileDataArea>
              <h3>{userInfo?.accntId}</h3>
              <ProfileData>{userInfo?.legacyNm}</ProfileData>
              <ProfileData>{userInfo?.userNm}</ProfileData>
            </ProfileDataArea>
          </ProfileHeader>
          <ProfileHeader>wte</ProfileHeader>
        </UserDetailArea>
      </UserDetailWrapper>
    </>
  );
}

export default UserDetail;
