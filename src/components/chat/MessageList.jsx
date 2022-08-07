import React, { useEffect } from "react";
import fetcher from "../../utils/fetcher";
import MessageItem from "./MessageItem";
import Loading from "../common/Loading";
import styled from "styled-components";
import useSWR from "swr";

const MessageListWrapper = styled.div`
  padding: 1rem 0.5rem 0.3rem 1rem;
  display: flex;
  flex-direction: column;
`;

function MessageList(props) {
  const { changeMessageList, messageList, roomId } = props;
  const { data, isLoading, isError } = useSWR(
    "/chat/messages/" + roomId,
    fetcher
  );
  useEffect(() => {
    if (data) {
      changeMessageList(data);
    }
    console.log("messagaList Effect");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (isLoading) return <Loading />;
  if (isError) return <div>failed to load</div>;

  return (
    <>
      <MessageListWrapper>
        {messageList.map((r, index) => (
          <MessageItem
            key={r.id}
            id={r.id}
            message={r.message}
            senderNm={r.senderNm}
            senderId={r.senderId}
            type={r.type}
          ></MessageItem>
        ))}
      </MessageListWrapper>
    </>
  );
}

export default React.memo(MessageList);
