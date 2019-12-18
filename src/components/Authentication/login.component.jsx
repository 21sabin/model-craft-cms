import React, { Component } from "react";
import FormInput from "../form-input/form-input.component";
import { SignInContainer, Title } from "./login.component.style";
import CustomeButton from "../common/CustomeButton.component";
import { connect } from "react-redux";
import { signIn } from "../../redux/auth/auth.action";
import "../Authentication/logincomponent.css";

const buttonStyle = {
  padding: 10,

  width: "40%"
};

class Login extends Component {
  state = {
    email: "",
    password: ""
  };
  handleChange = event => {
    console.log("event", event.target.name, event.target.value);
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = () => {
    const { email, password } = this.state;
    const { signIn, history } = this.props;
    signIn(email, password, history);
  };
  render() {
    return (
      <SignInContainer>
        <Title>Login</Title>
        <FormInput
          type="text"
          label="email"
          name="Email"
          handleChange={event => this.handleChange(event)}
          placeholder="Email"
          className="form-control"
        />
        <FormInput
          type="password"
          label="password"
          placeholder="password"
          handleChange={event => this.handleChange(event)}
          className="form-control"
          name="Password"
        />
        <CustomeButton
          className="btn btn-primary block"
          style={buttonStyle}
          handleClick={this.handleSubmit}
        >
          SignIn
        </CustomeButton>
      </SignInContainer>
    );
  }
}

const mapStateToProps = state => {
  console.log("stat", state);
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: (email, password, history) =>
      dispatch(signIn(email, password, history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
