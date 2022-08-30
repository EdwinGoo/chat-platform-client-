import React from "react";
import styled from "styled-components";
// import palette from "../../assets/palette";

const StyledSubTitle = styled.div`
  display: flex;
  align-items: center;
  color: black;
  margin-right: auto;
  font-size: var(--sub-title-font-size);
  color: #000000;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background-color: #fefefe;
  padding: 0.9rem 0 0.9rem 0.8rem;
  width: calc(100% - 1.65rem);
  border-radius: 9px;
`;

const SubTitle = (props) => <StyledSubTitle {...props} />;

export default SubTitle;
