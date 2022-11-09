import React from "react";
import styled from "styled-components";
import SubTitle from "../common/SubTitle";
import palette from "../../assets/palette";
import { instance } from "../../utils/Axios";
import useForm from "../../hooks/useForm";
import Button from "../common/Button";

const ChatbotItemArea = styled.form`
  background: #ffffff;
  border-top-left-radius: 5px;
  border-radius: 7px;
  border: solid 1px ${palette.gray[4]};
  padding: 1rem;
  box-sizing: border-box;

  * {
    margin-bottom: 0.5rem;
  }
  button {
    margin-left: 0.5rem;
    float: right;
  }
`;

const ChatbotItemFormTextNm = styled.div`
  color: ${palette.gray[7]};
  font-size: 1rem;
`;

const ChatbotItemInput = styled.input`
  height: 2rem;
  width: 100%;
  border: 1px solid ${palette.gray[3]};
  border-radius: 3px;
  padding: 0.2rem 0 0.2rem 0.8rem;
  box-sizing: border-box;
`;

const ChatbotItemTextArea = styled.textarea`
  height: 15rem;
  width: 100%;
  border: 1px solid ${palette.gray[3]};
  border-radius: 3px;
  resize: none;
  box-sizing: border-box;
  padding: 0.5rem;
`;

function ChatbotItem({ selectedNode, setSelectedNode }) {
  const { id, optnNm, message, parentId } = selectedNode;

  const onSaveData = () => {
    instance
      .patch("/mng/botMessage", {
        id: id,
        optnNm: values.optnNm || optnNm,
        message: values.message || message,
      })
      .then(function (response) {
        // const { body, status, message } = response.data;
        setSelectedNode(response.data.body);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const validate = ({ id }) => {
    const errors = {};
    return errors;
  };

  const { values, errors, submitting, handleChange, handleSubmit } = useForm({
    initialValues: selectedNode,
    onSubmit: (values) => {
      onSaveData(values);
    },
    validate,
  });

  return (
    <>
      <SubTitle>선택된 NODE 정보</SubTitle>
      <ChatbotItemArea onSubmit={handleSubmit}>
        <ChatbotItemFormTextNm>parentId</ChatbotItemFormTextNm>
        <ChatbotItemInput
          type="text"
          name="parentId"
          value={values.parentId || parentId || ""}
          onChange={handleChange}
          className={errors.parentId && "errorInput"}
          placeholder="parentId"
        />
        <ChatbotItemFormTextNm>id</ChatbotItemFormTextNm>
        <ChatbotItemInput
          type="text"
          name="id"
          value={values.id || id || ""}
          onChange={handleChange}
          className={errors.id && "errorInput"}
          placeholder="id"
        />
        <ChatbotItemFormTextNm>optnNm</ChatbotItemFormTextNm>
        <ChatbotItemInput
          type="text"
          name="optnNm"
          value={values.optnNm || optnNm || ""}
          onChange={handleChange}
          className={errors.optnNm && "errorInput"}
          placeholder="optnNm"
        />
        <ChatbotItemFormTextNm>message</ChatbotItemFormTextNm>
        <ChatbotItemTextArea
          type="text"
          name="message"
          value={values.message || message || ""}
          onChange={handleChange}
          className={errors.message && "errorInput"}
          placeholder="message"
        />
        <Button buttonWidth="20%" disabled={submitting}>
          저장
        </Button>
        <Button
          buttonWidth="20%"
          type="button"
          buttonHoverBackground={palette.red[3]}
          buttonBackground={palette.red[5]}
        >
          삭제
        </Button>
      </ChatbotItemArea>
      <br />
    </>
  );
}

export default ChatbotItem;
