import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import palette from "../../assets/palette";

const SidebarWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  font-weight: 500;
  align-items: center;
`;
const Title = styled.div`
  color: #042b5c;
  display: flex;
  flex-direction: column;
  padding-top: 0.5rem;
  margin-bottom: 1rem;
  height: 3vh;
  p {
    margin: auto 0;
  }
`;
const RouterWrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;

  .link-active {
    border-radius: 5px;
    background: #fefefe;
    color: ${palette.navy};
    font-weight: 900;
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
  font-size: 0.9rem;
`;
function Sidebar() {
  return (
    <>
      <SidebarWrapper>
        <Title>
          <p>
            HELPER LOGO - {"  "}
            <span role="img" aria-label="writing hand">
              ✋
            </span>
          </p>
        </Title>
        <RouterWrapper>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? "link-active" : "link")}
          >
            <DashboardIcon />
            <LinkNm>Dashboard</LinkNm>
          </NavLink>
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
            <LinkNm>자동응답</LinkNm>
          </NavLink>
        </RouterWrapper>
      </SidebarWrapper>
    </>
  );
}

export default Sidebar;
