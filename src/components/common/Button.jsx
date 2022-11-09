import React from "react";
import styled from "styled-components";
import palette from "../../assets/palette";

const StyledButton = styled.button.attrs((props) => props)`
  border: none;
  border-radius: 4px;
  font-size:1rem;
  font-weight:bold;
  padding 0.5rem;
  color:${palette.white};
  outline:none;
  cursor:pointer;
  background : ${(props) => props.buttonBackground || palette.blue[5]};
  &:hover {
    background :  ${(props) => props.buttonHoverBackground || palette.blue[4]};
  }
  width: ${(props) => props.buttonWidth || "100%"};
  text-align: center;
`;

const Button = (props) => <StyledButton {...props} />;

export default Button;
