import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import palette from "../../assets/palette";

const SidebarWrapper = styled.nav`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  font-weight: 400;
  align-items: center;
`;
// const Title = styled.div`
//   color: #042b5c;
//   display: flex;
//   flex-direction: column;
//   padding-top: 0.5rem;
//   margin-bottom: 1rem;
//   height: 3vh;
//   p {
//     margin: auto 0;
//   }
// `;
const RouterWrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  .link-active {
    border-radius: 5px;
    background: #fefefe;
    color: ${palette.navy};
    font-weight: 700;
  }
  a {
    display: flex;
    text-align: left;
    width: 100%;
    padding: 0.6rem 0 0.6rem 0;
    margin-bottom: 0.3rem;
  }
  a > svg {
    font-size: 1rem;
    padding-left: 0.7rem;
  }
  a:visited {
  }
  a:hover {
    border-radius: 5px;
    background: #fefefe;
  }
`;

const LinkNm = styled.span`
  margin-left: 0.7rem;
  font-size: 1rem;
`;
function Sidebar() {
  return (
    <>
      <SidebarWrapper>
        <RouterWrapper>
          <NavLink
            to="/chat"
            className={({ isActive }) => (isActive ? "link-active" : "link")}
          >
            <QuestionAnswerIcon />
            <LinkNm>Chatting</LinkNm>
          </NavLink>
          <NavLink
            to="/autoanswer"
            className={({ isActive }) => (isActive ? "link-active" : "link")}
          >
            <MenuBookIcon />
            <LinkNm>챗봇-플로우</LinkNm>
          </NavLink>
          <NavLink
            to="/users"
            className={({ isActive }) => (isActive ? "link-active" : "link")}
          >
            <PeopleAltIcon />
            <LinkNm>사용자 관리</LinkNm>
          </NavLink>
        </RouterWrapper>
      </SidebarWrapper>
    </>
  );
}

export default Sidebar;
