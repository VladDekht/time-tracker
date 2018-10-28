/* eslint-disable indent */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
    Button,
    Input,
    InputLabel,
    withStyles,
} from '@material-ui/core';
import PostCard from '../components/PostCard';
import { login, getUser } from '../actions/userActions';
import { validateEmail } from '../validators/validators';

const styles = theme => ({
  inputContainer: {
    paddingTop: '10px',
    paddingBottom: '10px',
  },
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      inputErrors: [],
    };
  }

  componentWillMount() {
    this.props.getUser();
  }

  validateForm = () => {
    let inputError = '';
    let isValid = true;
    if (!validateEmail(this.state.email)) {
      inputError = 'Please, enter a valid email';
      isValid = false;
    }
    if (!isValid) {
      this.setState({ inputErrors: [...this.state.inputErrors, inputError] });
    }
    return isValid;
  };

  handleLogin = () => {
    if (this.validateForm()) {
        const { login, history } = this.props;
        const { email, password, inputErrors } = this.state;
        login(email, password)
        .then((response) => {
          if (response.user) {
            history.replace('/');
          }
        })
        .catch((err) => {
          this.setState({
            inputErrors: [...inputErrors, err.message],
          });
        });
    }
  };

  render() {
    const { classes, history } = this.props;
    const { email, password, inputErrors } = this.state;
    return (
      <PostCard
        title="Login"
        body={(
          <div>
            <div className={classes.inputContainer}>
              <InputLabel htmlFor="login-email-input">Email:</InputLabel>
              <Input
                id="login-email-input"
                type="email"
                value={email}
                error={inputErrors.length !== 0}
                onChange={(event) => {
                  this.setState({ email: event.target.value, inputErrors: [] });
                }}
              />
            </div>
            <div className={classes.inputContainer}>
              <InputLabel htmlFor="login-password-input">Password:</InputLabel>

              <Input
                id="login-password-input"
                type="password"
                value={password}
                error={inputErrors.length !== 0}
                onChange={(event) => {
                  this.setState({
                    password: event.target.value,
                    inputErrors: [],
                  });
                }}
              />
            </div>
            {inputErrors.length === 0 ? null : (
              <span style={{ color: 'red' }}>
                {inputErrors.map((error, index) => (
                  <p key={index}> {error}</p>
                ))}
              </span>
            )}
          </div>
)}
        actions={(
          <div>
            <Button onClick={this.handleLogin}>Login</Button>
            <Button
              onClick={() => {
                history.push('/register');
              }}
            >
              Create Account
            </Button>
          </div>
)}
      />
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch(getUser()),
  login: (email, password) => dispatch(login(email, password))
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Login);
