import React, { useState, useEffect } from "react";
import ChatbotTree from "./ChatbotTree";
import styled from "styled-components";
import ChatbotItem from "./ChatbotItem";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import Loading from "../common/Loading";

const ManageChatbotArea = styled.div`
  display: flex;
  height: 100%;
`;

function ManageChatbot() {
  const { data, error, loading } = useSWR("/chat/botMessage/1", fetcher, {
    refreshInterval: 50000, // wow...
    revalidateOnFocus: true,
  });

  const [selectedNode, setSelectedNode] = useState("");

  const onRoomClick = (node) => {
    console.log(node);
    setSelectedNode(node);
  };

  return (
    <>
      <ManageChatbotArea>
        {!data || error ? (
          <Loading />
        ) : (
          <ChatbotTree onRoomClick={onRoomClick} data={data} />
        )}
        <ChatbotItem node={selectedNode} />
      </ManageChatbotArea>
    </>
  );
}

export default React.memo(ManageChatbot);
