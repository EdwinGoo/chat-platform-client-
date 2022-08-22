import React from "react";
import useForm from "../../hooks/useForm";
import { useUserStore } from "../../store/useUserStore";
import Button from "../common/Button";
import { instance } from "../../utils/Axios";
import styled from "styled-components";
import palette from "../../assets/palette";
import BottomLine from "../common/BottomLine";

const LoginWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 4rem 0 0.75rem 0;
`;

const LoginFormArea = styled.form`
  background-color: ${palette.white};
  border: 1px solid ${palette.gray[3]};
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.2);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const LoginInput = styled.input`
  height: 2rem;
  width: 23rem;
  border: 1px solid ${palette.gray[3]};
  border-radius: 3px;
  padding: 0.2rem 0 0.2rem 0.8rem;
  margin-right: auto;
`;
const LoginFormTextNm = styled.div`
  margin: 0rem 0 0.5rem 0;
  color: ${palette.gray[7]};
  font-size: 1rem;
`;

const LoginFormTitle = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  color: ${palette.black};
  margin: 0.5rem 0 1rem 0;
`;
const LoginErrorText = styled.div`
  font-size: 1rem;
  color: ${palette.gray[5]};
  margin: 0.25rem 0 0 0;
`;

function LoginForm() {
  const { setUserInfo } = useUserStore();

  const LoginRequest = () => {
    instance
      .post("/login", {
        accntId: values.accntId,
        password: values.password,
      })
      .then(function (response) {
        const { body, status, message } = response.data;
        // console.log(body);
        if (status === 200) {
          setUserInfo(body);
        } else {
          console.log(message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const validate = ({ accntId, password }) => {
    const errors = {};

    if (!accntId) {
      errors.accntId = "계정이 입력되지 않았습니다.";
    } else if (!/^[a-zA-Z0-9]*$/.test(accntId)) {
      errors.accntId = "입력된 계정이 유효하지 않습니다.";
    }

    if (!password) {
      errors.password = "비밀번호가 입력되지 않았습니다.";
    } else if (password.length < 8) {
      errors.password = "8자 이상의 패스워드를 사용해야 합니다.";
    }

    return errors;
  };

  const { values, errors, submitting, handleChange, handleSubmit } = useForm({
    initialValues: { accntId: "", password: "" },
    onSubmit: (values) => {
      LoginRequest(values);
    },
    validate,
  });

  return (
    <>
      <LoginWrapper>
        <LoginFormArea onSubmit={handleSubmit} noValidate>
          <LoginFormTitle>로그인</LoginFormTitle>
          <BottomLine></BottomLine>
          <br></br>
          <LoginFormTextNm>계정</LoginFormTextNm>
          <LoginInput
            type="accntId"
            name="accntId"
            value={values.accntId}
            onChange={handleChange}
            className={errors.accntId && "errorInput"}
          />
          {errors.accntId && (
            <LoginErrorText className="errorMessage">
              {errors.accntId}
            </LoginErrorText>
          )}
          <br />
          <LoginFormTextNm>비밀번호</LoginFormTextNm>
          <LoginInput
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            className={errors.password && "errorInput"}
          />
          {errors.password && (
            <LoginErrorText className="errorMessage">
              {errors.password}
            </LoginErrorText>
          )}
          <br />
          <Button type="submit" disabled={submitting} width={"100%"}>
            로그인
          </Button>
        </LoginFormArea>
      </LoginWrapper>
    </>
  );
}
export default LoginForm;
