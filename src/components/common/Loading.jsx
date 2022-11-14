import React from "react";
import BarLoader from "react-spinners/BarLoader";
import styled from "styled-components";
import palette from "../../assets/palette";

const LoadingWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

function Loading() {
  return (
    <LoadingWrapper>
      <BarLoader width={100} color={palette.navy}></BarLoader>
    </LoadingWrapper>
  );
}

export default Loading;
