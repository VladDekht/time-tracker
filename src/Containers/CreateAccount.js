import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import PostCard from './../Components/PostCard';
import { Button, Input, InputLabel } from '@material-ui/core';
import { register, getUser } from '../Actions/UserActions';
import { connect } from "react-redux";

class CreateAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            inputErrors: []
        }
    }

    componentWillMount(){
        if(sessionStorage.getItem('userEmail')){
            this.props.history.push('/');
        }
    }

    handleChange = (event) => {
        let value = event.target.value;
        switch(event.target.id){
            case 'register-email-input':
                this.setState({email: value, inputErrors : []});
                break;
            case 'register-password-input':
                this.setState({password: value, inputErrors : []});
                break;
            case 'register-confirm-password-input':
                this.setState({confirmPassword: value, inputErrors : []});
                break;    
        }
    }

    validateEmail = (email) => {
        let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(String(email).toLowerCase());
    }

    validatePassword = (password) => {
        let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        return regex.test(String(password).toLowerCase());
    }

    validatePwdConfirm = (pwd,confPwd) => {
        if(String(pwd).localeCompare(String(confPwd)) !== 0){
            return false;
        }
        return true;
    }

    validateForm = () => {
        let emailError = '';
        let passwordError = '';
        let confirmPwdError = '';
        let isValid = true;
        if(!this.validateEmail(this.state.email)){
            emailError = 'Please, enter a valid email';
            isValid = false;
        }
        if(!this.validatePassword(this.state.password)){
            passwordError = 'Password must contain atleast 8 characters, 1 letter and 1 digit ';
            isValid = false;
        }
        if(!this.validatePwdConfirm(this.state.password,this.state.confirmPassword)){
            confirmPwdError = "Password and confirm password don't match";
            isValid = false;
        }
        this.setState({inputErrors: [...this.state.inputErrors, emailError, passwordError, confirmPwdError]});
        return isValid;
    }

    handleRegister = () => {
        if(this.validateForm()){
            this.register();
        }
    }

    register = () => {
        this.props.register(this.state.email, this.state.password).then((response) => {
            localStorage.setItem('userEmail', response.user.email)
            this.props.history.replace('/');
        }).catch(err => {this.setState({inputErrors: [...this.state.inputErrors, err.message]})});
    }

    render() {
        return (
            <PostCard
                title='CreateAccount'
                body={
                    <div>
                        <div  style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                        <InputLabel htmlFor="register-email-input">Email:</InputLabel>
                            <Input
                                id="register-email-input"
                                type='email'
                                value={this.state.email}
                                error = {this.state.inputErrors.length !== 0}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div  style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                        <InputLabel htmlFor="register-password-input">Password:</InputLabel>

                            <Input
                                id="register-password-input"

                                type='password'
                                value={this.state.password}
                                error = {this.state.inputErrors.length !== 0}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div  style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                        <InputLabel htmlFor="register-confirm-password-input">Confirm Password:</InputLabel>
                            <Input
                                id="register-confirm-password-input"

                                type='password'
                                value={this.state.confirmPassword}
                                error = {this.state.inputErrors.length !== 0}
                                onChange={this.handleChange}
                            />
                        </div>
                        {this.state.inputError === '' ? null : <span style = {{color: 'red'}}>{this.state.inputErrors.map((error, index) => (
                    <p key = {index}> {error}</p>
                ))}</span>}
                    </div>

                }
                actions={
                <div>
                    <Button onClick = {this.handleRegister}>Create Account</Button>
                    <Button onClick={() => { this.props.history.push('/Login') }}>Sign In</Button>
                </div>}
            />
        );
    }
}

export default connect(null, { register, getUser })(CreateAccount);
