import React from "react";
import styled from "styled-components";
import useUserInfoStore from "../../store/userInfoStore";

// message={r.message}
// senderNm={r.senderNm}
// senderId={r.senderId}
// type={r.type}

const MessageItemWrapper = styled.div.attrs((props) => props)`
  background: none;
  outline: none;
  border: none;
  ${(props) => {
    if (props.accntId === props.senderId) {
      return `
      background: #012B5C; 
      margin-left: auto;
      color:#ffffff
      
    `;
    } else {
      return `
      background: #eeeeee; 
      margin-right: auto
    `;
    }
  }}};
  margin-bottom : 0.5rem;
  padding : 0.6rem;
  border-radius: 7px;
  font-size : 0.9rem;
`;

function MessageItem(props) {
  const { accntId } = useUserInfoStore();
  const { senderId, message } = props;

  return (
    <>
      <MessageItemWrapper senderId={senderId} accntId={accntId}>
        {message}
      </MessageItemWrapper>
    </>
  );
}

export default React.memo(MessageItem);
