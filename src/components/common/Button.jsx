import React from "react";
import styled from "styled-components";
import palette from "../../assets/palette";

const StyledButton = styled.button`
  border: none;
  border-radius: 4px;
  font-size:1rem;
  font-weight:bold;
  padding 0.5rem;
  color:${palette.white};
  outline:none;
  cursor:pointer;
  background : ${palette.blue[5]};
  &:hover {
    background : ${palette.blue[4]};
  }
  width:100%;

`;

const Button = (props) => <StyledButton {...props} />;

export default Button;
