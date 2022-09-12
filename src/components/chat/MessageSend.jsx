import React, { useState, useCallback } from "react";
import styled from "styled-components";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import palette from "../../assets/palette";

// import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";

const MessageSendForm = styled.form`
  display: flex;
  background: #ffffff;
  border: none;
  border-radius: 5px;
  height: 2.4rem;
  input {
    background: none;
    outline: none;
    border: none;
    padding: 0.4rem;
    padding-left: 0.7rem;
    font-size: 1rem;
    line-height: 1.5;
    color: ${palette.black};
    &::placeholder {
      color: ${palette.gray[6]};
      font-weight: 700;
    }
    flex: 1;
  }

  button {
    background: none;
    outline: none;
    border: none;
    background-color: transparent;
    color: ${palette.navy};
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: all 0.4s ease-in;
    &:hover {
      transform: rotate(-90deg);
    }
  }
`;

const MessageSendWrapper = styled.div`
  padding: 0.1rem;
  background: ${palette.navy};
  border-radius: 8px;
`;

function MessageSend(props) {
  const [ms, setMs] = useState("");
  const { sendMessage } = props;
  const messageType = "MESSAGE";

  const onSendButtonClick = useCallback(
    (e) => {
      if (ms.replace(/\s| /gi, "").length !== 0) {
        sendMessage(ms, messageType);
        setMs("");
      }
      e.preventDefault();
    },
    [sendMessage, ms]
  );

  const onSendMessageChange = useCallback((e) => {
    setMs(e.target.value);
  }, []);

  return (
    <>
      <MessageSendWrapper>
        <MessageSendForm onSubmit={onSendButtonClick}>
          <input
            placeholder="메시지를 입력하세요."
            value={ms}
            onChange={onSendMessageChange}
            name={"ms"}
          ></input>
          <button type="submit">{/* <SendRoundedIcon /> */}</button>
        </MessageSendForm>
      </MessageSendWrapper>
    </>
  );
}

export default MessageSend;
