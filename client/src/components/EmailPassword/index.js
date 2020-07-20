import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import "./styles.scss";
import Button from "../forms/Button/index";
import FormInput from "../forms/FormInput/index";
import AuthWrapper from "../AuthWrapper/index";

import { auth } from "../../firebase/utils";

const initialState = {
  email: "",
  errors: [],
};

class EmailPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };
    this.handleChange = this.handleChange.bind(this);
    this.reset = this.reset.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

    try {
      const { email } = this.state;

      const config = {
        url: "http://localhost:3000/login",
      };
      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          this.props.history.push("/login");
          // console.log("Password reset");
        })
        .catch(() => {
          const err = ["Email not found! Please, try again!"];
          this.setState({
            errors: err,
          });
        });
    } catch (err) {
      // this.setState({
      //   errors: err,
      // });
      // console.log(err);
    }

    this.reset();
  };
  render() {
    const configAuthWrapper = {
      headline: "Email Password",
    };
    const { email, errors } = this.state;
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
          <form onSubmit={this.handleSubmit}>
            <FormInput
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              onChange={this.handleChange}
            />

            <Button type="submit">Email Password</Button>
          </form>
        </div>
      </AuthWrapper>
    );
  }
}

export default withRouter(EmailPassword);
