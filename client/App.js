import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal } from "reactstrap";
import {
  BrowserRouter as Router,
  Route,
  withRouter
} from "react-router-dom";



import { loadUser, logoutUser } from "./redux/actions/authActions";

import AppNavBar from "./components/class/AppNavBar";
import AuthModal from "./components/class/AuthModal";
import PrivateUserArea from "./components/functional/PrivateUserArea"
import ProtectedRoute from "./components/functional/ProtectedRoute"

class App extends Component {
  constructor(props) {
    super(props);
    this.props.loadUser();
    this.state = {
      authModalOpen: false
    };
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.auth.userAuthenticated !== prevProps.auth.userAuthenticated &&
      this.props.auth.userAuthenticated &&
      this.state.authModalOpen
    ) {
      this.toggleAuthModal();
    }
  }

  toggleAuthModal = () => {
    this.setState({
      authModalOpen: !this.state.authModalOpen
    });
  };

  render() {
    return (
      <div>
        <AppNavBar
          loadAuthModal={this.toggleAuthModal}
          userAuthenticated={this.props.auth.userAuthenticated}
          username={this.props.auth.user ? this.props.auth.user.name : ""}
          logoutUser={this.props.logoutUser}
        />
        <Modal isOpen={this.state.authModalOpen} toggle={this.toggleAuthModal}>
          <AuthModal />
        </Modal>

        <Route path="/" component={Home} />
        <ProtectedRoute path="/protected" component={PrivateUserArea} isAuthenticated={this.props.auth.userAuthenticated} name={this.props.auth.user.name} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {
  loadUser: loadUser,
  logoutUser: logoutUser
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));
