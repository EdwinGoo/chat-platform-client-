import React, { useState, useEffect } from "react";
import ChatbotTree from "./ChatbotTree";
import styled from "styled-components";
import ChatbotItem from "./ChatbotItem";
import ChatbotItemNew from "./ChatbotItemNew";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import Loading from "../common/Loading";

const ManageChatbotArea = styled.div`
  display: flex;
  height: 100%;
`;

const ChatbotItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 50%;
  margin-left: 0.4rem;
`;

function ManageChatbot() {
  const { data, error, loading, mutate } = useSWR(
    "/chat/botMessage/1",
    fetcher,
    {
      refreshInterval: 50000, // wow...
      revalidateOnFocus: true,
    }
  );

  const [selectedNode, setSelectedNode] = useState({});

  const onRoomClick = (node) => {
    setSelectedNode(node);
  };

  useEffect(() => {
    console.log(selectedNode);
    mutate();
    return () => {};
  }, [selectedNode]);

  return (
    <>
      <ManageChatbotArea>
        {!data || error ? (
          <Loading />
        ) : (
          <ChatbotTree onRoomClick={onRoomClick} data={data} />
        )}
        <ChatbotItemWrapper>
          <ChatbotItem
            selectedNode={selectedNode}
            setSelectedNode={setSelectedNode}
          />
          <ChatbotItemNew
            selectedNode={selectedNode}
            setSelectedNode={setSelectedNode}
          ></ChatbotItemNew>
        </ChatbotItemWrapper>
      </ManageChatbotArea>
    </>
  );
}

export default React.memo(ManageChatbot);
