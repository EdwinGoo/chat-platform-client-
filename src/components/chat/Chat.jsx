import React from "react";
import styled from "styled-components";
import RoomList from "./RoomList";
import MessageBox from "./MessageBox";

const ChatArea = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

function Chat() {
  return (
    <>
      <ChatArea>
        <RoomList />
        <MessageBox />
      </ChatArea>
    </>
  );
}

export default Chat;
