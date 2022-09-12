import React from "react";
import styled from "styled-components";
import palette from "../../assets/palette";

const StyledInput = styled.input`
  height: 2rem;
  border: 1px solid ${palette.gray[4]};
  border-radius: 5px;
  padding: 0 0 0 0.5rem;
  font-size: 1rem;
`;

const Input = (props) => <StyledInput {...props} />;

export default Input;
