import React, { Component } from 'react';
import {
 Button, Input, InputLabel, withStyles,
} from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { register, getUser } from '../actions/userActions';
import PostCard from '../components/PostCard';
import {
  validateEmail,
  validatePassword,
  validatePwdConfirm,
} from '../validators/validators';

const styles = () => ({
  inputContainer: {
    paddingTop: '10px',
    paddingBottom: '10px',
  },
});

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      inputErrors: [],
    };
  }

  componentWillMount() {
	this.props.getUser();
  }

  handleEmailInput = (event) => {
    this.setState({ email: event.target.value, inputErrors: [] });
  };

  handlePasswordInput = (event) => {
    this.setState({ password: event.target.value, inputErrors: [] });
  };

  handleConfirmPasswordInput = (event) => {
    this.setState({ confirmPassword: event.target.value, inputErrors: [] });
  };

  validateForm = () => {
    let emailError = '';
    let passwordError = '';
    let confirmPwdError = '';
	let isValid = true;
	const { email, password, confirmPassword, inputErrors } = this.state;
    if (!validateEmail(email)) {
      emailError = 'Please, enter a valid email';
      isValid = false;
    }
    if (!validatePassword(password)) {
      passwordError = 'Password must contain atleast 8 characters, 1 letter and 1 digit ';
      isValid = false;
    }
    if (!validatePwdConfirm(password, confirmPassword)) {
      confirmPwdError = "Password and confirm password don't match";
      isValid = false;
    }
    this.setState({
      inputErrors: [
        ...inputErrors,
        emailError,
        passwordError,
        confirmPwdError,
      ],
    });
    return isValid;
  };

  handleRegister = () => {
    if (this.validateForm()) {
      this.register();
    }
  };

  register = () => {
    this.props
      .register(this.state.email, this.state.password)
      .then((response) => {
        if (response.user) {
          this.props.history.replace('/');
        }
      })
      .catch((err) => {
        this.setState({
          inputErrors: [...this.state.inputErrors, err.message],
        });
      });
  };

  render() {
	const { classes, history } = this.props;
	const { email, password, confirmPassword, inputErrors } = this.state;
    return (
      <PostCard
        title="CreateAccount"
        body={(
		<div>
            <div className={classes.inputContainer}>
              <InputLabel htmlFor="register-email-input">Email:</InputLabel>
              <Input
                id="register-email-input"
                type="email"
                value={email}
                error={inputErrors.length !== 0}
                onChange={this.handleEmailInput}
              />
            </div>
            <div className={classes.inputContainer}>
              <InputLabel htmlFor="register-password-input">
                Password:
              </InputLabel>

              <Input
                id="register-password-input"
                type="password"
                value={password}
                error={inputErrors.length !== 0}
                onChange={this.handlePasswordInput}
              />
            </div>
            <div className={classes.inputContainer}>
              <InputLabel htmlFor="register-confirm-password-input">
                Confirm Password:
              </InputLabel>
              <Input
                id="register-confirm-password-input"
                type="password"
                value={confirmPassword}
                error={inputErrors.length !== 0}
                onChange={this.handleConfirmPasswordInput}
              />
            </div>
            {inputErrors.length === 0 ? null : (
              <span style={{ color: "red" }}>
                {inputErrors.map((error, index) => (
                  <p key={index}> {error}</p>
                ))}
              </span>
            )}
          </div>
)}
        actions={(
<div>
            <Button onClick={this.handleRegister}>Create Account</Button>
            <Button
              onClick={() => {
                history.push("/Login");
              }}
            >
              Sign In
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
	register: (email, password) => dispatch(register(email, password))
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(CreateAccount);
