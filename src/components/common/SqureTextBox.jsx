import React from "react";
import styled from "styled-components";

const SquareBox = styled.div.attrs((props) => props)`
  position: relative;
  width: ${(props) => props.boxSizeWidth};
  background: #e6e6e6;
  border-radius: 5px;
  :before {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
  height: 100%;
`;

const SqureContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  color: white;
  div {
    display: table;
    width: 100%;
    height: 100%;
  }
  span {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
    color: black;
  }
`;

function SqureTextBox(props) {
  return (
    <>
      <SquareBox boxSizeWidth={props.boxSizeWidth}>
        <SqureContent>
          <div>
            <span>{props.text}</span>
          </div>
        </SqureContent>
      </SquareBox>
    </>
  );
}

export default SqureTextBox;
