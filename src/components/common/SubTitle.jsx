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
  font-weight: 600;
  margin-bottom: 0.5rem;
  border-radius: 9px;
`;

const SubTitle = (props) => <StyledSubTitle {...props} />;

export default SubTitle;
