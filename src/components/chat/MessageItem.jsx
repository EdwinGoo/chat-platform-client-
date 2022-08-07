import React from "react";
import styled from "styled-components";
import palette from "../../assets/palette";
import { useUserStore } from "../../store/useUserStore";

const MessageItemWrapper = styled.div.attrs((props) => props)`
  background: none;
  outline: none;
  border: none;
  text-align : left;
  max-width:50%;
  font-size : 0.9rem;

  ${(props) => {
    if (props.type === "MESSAGE") {
      if (props.accntId === props.senderId) {
        return `
        background:${palette.navy};
        margin-left: auto;
        color:#ffffff
        `;
      } else {
        return `
        background: ${palette.gray[2]};
        margin-right: auto
        `;
      }
    } else {
      return `
      max-width:99%;
      font-size : 0.8rem;
      margin : 0 auto;
      color : gray;
      `;
    }
  }}};
  margin-bottom : 0.5rem;
  padding : 0.6rem;
  border-radius: 7px;
`;

function MessageItem(props) {
  const { userInfo } = useUserStore();
  const { senderId, message, type } = props;

  return (
    <>
      <MessageItemWrapper
        senderId={senderId}
        accntId={userInfo.accntId}
        type={type}
      >
        {message}
      </MessageItemWrapper>
    </>
  );
}

export default React.memo(MessageItem);
