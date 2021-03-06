import React, { useState, useEffect } from "react";

import { Link, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Button from "../forms/Button/index";
import FormInput from "../forms/FormInput/index";
import AuthWrapper from "../AuthWrapper/index";
import "./styles.scss";

import {
  signInUser,
  signInWithGoogle,
  resetAllAuthForm,
} from "../../redux/User/user.actions";

const mapState = ({ user }) => ({
  signInSuccess: user.signInSuccess,
  currentUser: user.currentUser,
});

const SignIn = (props) => {
  const dispatch = useDispatch();
  const { signInSuccess, currentUser } = useSelector(mapState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (signInSuccess) {
      resetForm();
      dispatch(resetAllAuthForm());
      props.history.push("/");
    }
  }, [signInSuccess]);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setErrors([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signInUser({ email, password }));
  };

  const handleGoogleSignIn = () => {
    dispatch(signInWithGoogle());
  };

  const configAuthWrapper = {
    headline: "LogIn",
  };
  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">
        {errors.length > 0 && (
          <ul className="list_errors">
            {errors.map((err, index) => {
              return <li key={index}>{err}</li>;
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
          <FormInput
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            handleChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">LogIn</Button>
          <div className="socialSignin">
            <div className="row">
              <Button onClick={handleGoogleSignIn}>Sign in with Google</Button>
            </div>
          </div>
          <div className="links">
            <Link to="/recovery">Reset Password</Link>
          </div>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default withRouter(SignIn);
