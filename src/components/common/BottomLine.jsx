import React from "react";
import styled from "styled-components";
import palette from "../../assets/palette";

const StyledBottomLine = styled.div`
  width: 100%;
  border-bottom: 1px solid ${palette.gray[3]}; ;
`;

const BottomLine = (props) => <StyledBottomLine {...props} />;

export default BottomLine;
