import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser, registerUser } from "../../redux/actions/authActions";
import { clearErrors } from "../../redux/actions/errorActions";

import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Alert,
  Spinner
} from "reactstrap";
import classnames from "classnames";
import AuthForm from "../functional/AuthForm";

class AuthModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: "1"
    };
  }

  toggle = tab => {
    this.props.clearErrors();
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  login = data => {
    this.props.clearErrors();
    this.props.login(data);
  };

  register = data => {
    this.props.clearErrors();
    this.props.register(data);
  };

  render() {
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "1" })}
              onClick={() => {
                this.toggle("1");
              }}>
              Login
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.toggle("2");
              }}>
              Register
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            {this.props.userLoading ? (
              <Spinner color="primary" />
            ) : (
              <AuthForm
                inputFields={[
                  {
                    name: "Email",
                    type: "email"
                  },
                  {
                    name: "Password",
                    type: "password"
                  }
                ]}
                inputType="Login"
                buttonCb={this.login}
                initialState={{
                  email: "",
                  password: ""
                }}
              />
            )}
            {this.props.error && (
              <Alert color="danger">{this.props.error.message}</Alert>
            )}
          </TabPane>
          <TabPane tabId="2">
            {this.props.userLoading ? (
              <Spinner color="primary" />
            ) : (
              <AuthForm
                inputFields={[
                  {
                    name: "Name",
                    type: "text"
                  },
                  {
                    name: "Email",
                    type: "email"
                  },
                  {
                    name: "Password",
                    type: "password"
                  }
                ]}
                inputType="Register"
                buttonCb={this.register}
                initialState={{
                  name: "",
                  email: "",
                  password: ""
                }}
              />
            )}
            {this.props.error && (
              <Alert color="danger">{this.props.error.message}</Alert>
            )}
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  userLoading: state.auth.userLoading,
  error: state.error.error
});

const mapDispatchToProps = {
  login: loginUser,
  register: registerUser,
  clearErrors: clearErrors
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthModal);
