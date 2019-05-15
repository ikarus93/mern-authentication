import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import {
  Link
} from "react-router-dom";


export default class AppNavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  createRandomGreeting() {
    const list = [
      "How has your day been so far?",
      "What did you do today that makes you feel great about yourself?",
      "What is your goal for today?",
      "Success usually comes to those who are too busy to be looking for it.",
      "Opportunities don't happen. You create them!",
      "If you are not willing to risk the usual, you will have to settle for the ordinary.",
      "All progress takes place outside the comfort zone."
    ];

    return list[Math.floor(Math.random() * Math.floor(list.length - 1))];
  }

  render() {
    return (
      <div className="app__navbar">
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Logo</NavbarBrand>
          {this.props.userAuthenticated && (
            <NavItem className="appnavbar__greeting">{`Hi, ${
              this.props.username
              }! ${this.createRandomGreeting()}`}</NavItem>
          )}
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                {!this.props.userAuthenticated ? (
                  <NavLink href="#" onClick={this.props.loadAuthModal}>
                    Login/Register
                  </NavLink>
                ) : (<React.Fragment>
                  <NavLink href="#" onClick={this.props.logoutUser}>
                    Logout
                  </NavLink>
                  <Link to="/protected">User area</Link>
                </React.Fragment>
                  )}
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
