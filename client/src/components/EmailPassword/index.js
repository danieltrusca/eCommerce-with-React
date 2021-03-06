import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  resetPassword,
  resetUserState,
  resetAllAuthForm,
} from "../../redux/User/user.actions";

import "./styles.scss";
import Button from "../forms/Button/index";
import FormInput from "../forms/FormInput/index";
import AuthWrapper from "../AuthWrapper/index";

const mapState = ({ user }) => ({
  resetPasswordSuccess: user.resetPasswordSuccess,
  resetPasswordErrors: user.resetPasswordErrors,
});

const EmailPassword = (props) => {
  const disptach = useDispatch();
  const { resetPasswordSuccess, resetPasswordErrors } = useSelector(mapState);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (resetPasswordSuccess) {
      disptach(resetAllAuthForm());
      props.history.push("/login");
      // resetForm();
    }
  }, [resetPasswordSuccess]);

  useEffect(() => {
    if (Array.isArray(resetPasswordErrors) && resetPasswordErrors.length > 0) {
      setErrors(resetPasswordErrors);
    }
  }, [resetPasswordErrors]);

  // const resetForm = () => {
  //   setEmail("");
  //   setErrors([]);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    disptach(resetPassword({ email }));
  };
  const configAuthWrapper = {
    headline: "Email Password",
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">
        {errors.length > 0 && (
          <ul>
            {errors.map((e, index) => {
              return <li key={index}>{e}</li>;
            })}
          </ul>
        )}
        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            handleChange={(e) => setEmail(e.target.value)}
          />

          <Button type="submit">Email Password</Button>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default withRouter(EmailPassword);
