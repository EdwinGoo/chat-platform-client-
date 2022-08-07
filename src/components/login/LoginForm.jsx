import React from "react";
import useForm from "../../hooks/useForm";
import { useUserStore } from "../../store/useUserStore";
import Button from "../common/Button";
import { instance } from "../../utils/Axios";

function LoginForm() {
  const { setUserInfo } = useUserStore();

  const LoginRequest = () => {
    instance
      .post("/user/login", {
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
      errors.accntId = "이메일이 입력되지 않앗습니다.";
    } else if (!/^[a-zA-Z0-9]*$/.test(accntId)) {
      errors.accntId = "입력된 이메일이 유효하지 않습니다.";
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
    <form onSubmit={handleSubmit} noValidate>
      <label>
        AccntID:
        <input
          type="accntId"
          name="accntId"
          value={values.accntId}
          onChange={handleChange}
          className={errors.accntId && "errorInput"}
        />
        {errors.accntId && (
          <span className="errorMessage">{errors.accntId}</span>
        )}
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          className={errors.password && "errorInput"}
        />
        {errors.password && (
          <span className="errorMessage">{errors.password}</span>
        )}
      </label>
      <br />
      <Button type="submit" disabled={submitting}>
        로그인
      </Button>
    </form>
  );
}
export default LoginForm;
