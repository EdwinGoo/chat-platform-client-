import React from "react";
import styled from "styled-components";
import SubTitle from "../common/SubTitle";
import palette from "../../assets/palette";
import { instance } from "../../utils/Axios";
import useForm from "../../hooks/useForm";
import Button from "../common/Button";

const ChatbotItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 50%;
  margin-left: 0.4rem;
`;

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

function ChatbotItemNew({ selectedNode, setSelectedNode }) {
  const { optnNm, message, id } = selectedNode;

  const onSaveData = () => {
    instance
      .post("/mng/botMessage", {
        parentId: id,
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
    initialValues: {},
    onSubmit: (values) => {
      onSaveData(values);
    },
    validate,
  });

  return (
    <>
      <ChatbotItemWrapper>
        <SubTitle>추가할 NODE 정보</SubTitle>
        <ChatbotItemArea onSubmit={handleSubmit}>
          <ChatbotItemFormTextNm>parent - Id</ChatbotItemFormTextNm>
          <ChatbotItemInput type="text" value={id || ""} disabled />
          <ChatbotItemFormTextNm>parent - Label</ChatbotItemFormTextNm>
          <ChatbotItemInput type="text" value={optnNm || ""} disabled />
          <ChatbotItemFormTextNm>Label</ChatbotItemFormTextNm>
          <ChatbotItemInput
            type="text"
            name="optnNm"
            value={values.optnNm || ""}
            onChange={handleChange}
            className={errors.optnNm && "errorInput"}
            placeholder="optnNm"
          />
          <ChatbotItemFormTextNm>message</ChatbotItemFormTextNm>
          <ChatbotItemTextArea
            type="text"
            name="message"
            value={values.message || ""}
            onChange={handleChange}
            className={errors.message && "errorInput"}
            placeholder="message"
          />
          <Button
            buttonWidth="20%"
            disabled={submitting}
            buttonHoverBackground={palette.green[3]}
            buttonBackground={palette.green[5]}
          >
            추가
          </Button>
        </ChatbotItemArea>
        <br />
      </ChatbotItemWrapper>
    </>
  );
}

export default ChatbotItemNew;
