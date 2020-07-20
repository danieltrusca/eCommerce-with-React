import React, { Component } from "react";

import Button from "../forms/Button/index";
import FormInput from "../forms/FormInput/index";
import "./styles.scss";

import { signInWithGoogle, auth } from "../../firebase/utils";

const initialState = {
  email: "",
  password: "",
  errors: [],
};

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };
    this.handleChange = this.handleChange.bind(this);
    // this.handleFormSubmit = this.handleFormSubmit.bind(this);
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
  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.reset();
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    const { email, password } = this.state;
    return (
      <div className="signin">
        <div className="wrap">
          <h2>Sign-In</h2>
          <div className="formWrap">
            <form onSubmit={this.handleSubmit}>
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

              <Button type="submit">LogIn</Button>
              <div className="socialSignin">
                <div className="row">
                  <Button onClick={signInWithGoogle}>
                    Sign in with Google
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
