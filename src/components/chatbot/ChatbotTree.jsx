import React from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import styled from "styled-components";
import SubTitle from "../common/SubTitle";
import palette from "../../assets/palette";

const ChatbotTreeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  flex-basis: 50%;
  margin-right: 0.4rem;
`;

const ChatbotTreeArea = styled.div`
  background: #ffffff;
  border-top-left-radius: 5px;
  border-radius: 7px;
  border: solid 1px ${palette.gray[4]};
  padding: 1rem 0.5rem;
`;

function ChatbotTree({ onRoomClick, data }) {
  const renderTree = (nodes) => (
    <TreeItem
      key={nodes.id}
      nodeId={String(nodes.id)}
      label={nodes.optnNm}
      onClick={() => {
        onRoomClick(nodes);
      }}
      sx={{
        fontSize: 20,
      }}
    >
      {Array.isArray(nodes.childChatBotData)
        ? nodes.childChatBotData.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  return (
    <>
      <ChatbotTreeWrapper>
        <SubTitle>챗봇 플로우 TREE</SubTitle>
        <ChatbotTreeArea>
          <TreeView
            aria-label="rich object"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpanded={["root"]}
            defaultExpandIcon={<ChevronRightIcon />}
            sx={{
              height: 1,
              flexGrow: 1,
              maxWidth: 1,
              overflow: "hidden",
            }}
          >
            {renderTree(data)}
          </TreeView>
        </ChatbotTreeArea>
      </ChatbotTreeWrapper>
    </>
  );
}

export default React.memo(ChatbotTree);
