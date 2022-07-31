import React from "react";
import useForm from "../../hooks/useForm";
import axios from "axios";
import { useUserStore } from "../../store/useUserStore";

function LoginForm() {
  const { setUserInfo } = useUserStore();

  const LoginRequest = () => {
    axios
      .post("/user/login", {
        accntId: values.accntId,
        password: values.password,
      })
      .then(function (response) {
        console.log(response.data.body);
        if (response.data.resCode === 200) {
          setUserInfo(response.data.body);
        } else {
          console.log(response.data.message);
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
      <button type="submit" disabled={submitting}>
        로그인
      </button>
    </form>
  );
}
export default LoginForm;
