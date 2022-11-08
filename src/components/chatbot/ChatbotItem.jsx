import React, { useEffect } from "react";
import styled from "styled-components";
import SubTitle from "../common/SubTitle";
import palette from "../../assets/palette";
import { instance } from "../../utils/Axios";
import Input from "../common/Input";

const ChatbotItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 50%;
  margin-left: 0.4rem;
`;

const ChatbotItemArea = styled.form`
  background: #ffffff;
  border-top-left-radius: 5px;
  height: 50%;
  border-radius: 7px;
  border: solid 1px ${palette.gray[4]};
`;

const ChatbotItemFormTextNm = styled.div`
  margin: 0rem 0 0.5rem 0;
  color: ${palette.gray[7]};
  font-size: 1rem;
`;

const ChatbotItemInput = styled.input`
  height: 2rem;
  width: 23rem;
  border: 1px solid ${palette.gray[3]};
  border-radius: 3px;
  padding: 0.2rem 0 0.2rem 0.8rem;
  margin-right: auto;
`;

function ChatbotItem({ node }) {
  const { id, optnNm, message, parentId } = node;

  useEffect(() => {
    console.log(node);
    return () => {};
  }, [node]);

  const onSaveData = () => {
    instance
      .patch("/mng/room", {
        id: id,
        optnNm: optnNm,
      })
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <ChatbotItemWrapper>
        <SubTitle>선택된 NODE 정보</SubTitle>
        <ChatbotItemArea>
          <ChatbotItemInput />
          <div>{parentId}</div>
          <div>{id}</div>
          <div>{optnNm}</div>
          <div>{message}</div>
        </ChatbotItemArea>
        <SubTitle>추가할 NODE 정보</SubTitle>
      </ChatbotItemWrapper>
    </>
  );
}

export default ChatbotItem;
