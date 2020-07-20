import React, { Component } from "react";

import { auth, handleUserProfile } from "../../firebase/utils";

import Button from "../forms/Button/index";
import FormInput from "../forms/FormInput/index";
import "./styles.scss";

const initialState = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
  errors: [],
};

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.reset = this.reset.bind(this);
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }
  reset() {
    this.setState({
      ...initialState,
    });
  }
  handleFormSubmit = async (event) => {
    event.preventDefault();
    const {
      displayName,
      email,
      password,
      confirmPassword,
      errors,
    } = this.state;
    if (password !== confirmPassword) {
      const err = ["passwords does not match"];
      this.setState({
        errors: err,
      });
      return;
    }
    if (!displayName || !email || !password || !confirmPassword) {
      const err = ["all fields are required"];
      this.setState({
        errors: err,
      });
      return;
    }

    try {
      //console.log("here");
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await handleUserProfile(user, { displayName });
    } catch (err) {
      console.log(err);
    }
    this.reset();
  };
  render() {
    const {
      displayName,
      email,
      password,
      confirmPassword,
      errors,
    } = this.state;
    return (
      <div className="signup">
        <div className="wrap">
          <h2>Sign-up</h2>
          <div className="formWrap">
            {errors.length > 0 && (
              <ul className="list_errors">
                {errors.map((err, index) => {
                  return <li key={index}>{err}</li>;
                })}
              </ul>
            )}
            <form onSubmit={this.handleFormSubmit}>
              <FormInput
                type="text"
                name="displayName"
                value={displayName}
                placeholder="Full name"
                onChange={this.handleChange}
              />

              <FormInput
                type="email"
                name="email"
                value={email}
                placeholder="Email"
                onChange={this.handleChange}
              />

              <FormInput
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={this.handleChange}
              />

              <FormInput
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={this.handleChange}
              />

              <Button type="submit">Register</Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
