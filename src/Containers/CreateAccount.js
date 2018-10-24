import React, { Component } from 'react';
import { Button, Input, InputLabel } from '@material-ui/core';
import { connect } from 'react-redux';
import { register, getUser } from '../Actions/userActions';
import PostCard from '../Components/PostCard';
import { validateEmail, validatePassword, validatePwdConfirm } from '../validators/validators';

class CreateAccount extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			confirmPassword: '',
			inputErrors: [],
		}
	}

	componentWillMount() {
		if (sessionStorage.getItem('userEmail')) {
			this.props.history.push('/');
		}
	}

	handleEmailInput = (event) => {
		this.setState({ email: event.target.value, inputErrors: [] });
	}

	handlePasswordInput = (event) => {
		this.setState({ password: event.target.value, inputErrors: [] });
	}

	handleConfirmPasswordInput = (event) => {
		this.setState({ confirmPassword: event.target.value, inputErrors: [] });
	}



	validateForm = () => {
		let emailError = '';
		let passwordError = '';
		let confirmPwdError = '';
		let isValid = true;
		if (!validateEmail(this.state.email)) {
			emailError = 'Please, enter a valid email';
			isValid = false;
		}
		if (!validatePassword(this.state.password)) {
			passwordError = 'Password must contain atleast 8 characters, 1 letter and 1 digit ';
			isValid = false;
		}
		if (!validatePwdConfirm(this.state.password, this.state.confirmPassword)) {
			confirmPwdError = "Password and confirm password don't match";
			isValid = false;
		}
		this.setState({ inputErrors: [...this.state.inputErrors, emailError, passwordError, confirmPwdError] });
		return isValid;
	}

	handleRegister = () => {
		if (this.validateForm()) {
			this.register();
		}
	}

	register = () => {
		this.props.register(this.state.email, this.state.password).then((response) => {
			if(response.user){
				this.props.history.replace('/');
			}
		}).catch(err => 
			{ this.setState({ inputErrors: [...this.state.inputErrors, err.message] }) 
		});
	}

	render() {
		return (
			<PostCard
				title='CreateAccount'
				body={
					<div>
						<div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
							<InputLabel htmlFor="register-email-input">Email:</InputLabel>
							<Input
								id="register-email-input"
								type='email'
								value={this.state.email}
								error={this.state.inputErrors.length !== 0}
								onChange={this.handleEmailInput}
							/>
						</div>
						<div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
							<InputLabel htmlFor="register-password-input">Password:</InputLabel>

							<Input
								id="register-password-input"

								type='password'
								value={this.state.password}
								error={this.state.inputErrors.length !== 0}
								onChange={this.handlePasswordInput}
							/>
						</div>
						<div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
							<InputLabel htmlFor="register-confirm-password-input">Confirm Password:</InputLabel>
							<Input
								id="register-confirm-password-input"

								type='password'
								value={this.state.confirmPassword}
								error={this.state.inputErrors.length !== 0}
								onChange={this.handleConfirmPasswordInput}
							/>
						</div>
						{this.state.inputError === '' ? null : <span style={{ color: 'red' }}>{this.state.inputErrors.map((error, index) => (
							<p key={index}> {error}</p>
						))}</span>}
					</div>

				}
				actions={
					<div>
						<Button onClick={this.handleRegister}>Create Account</Button>
						<Button onClick={() => { this.props.history.push('/Login') }}>Sign In</Button>
					</div>}
			/>
		);
	}
}

export default connect(null, { register, getUser })(CreateAccount);
