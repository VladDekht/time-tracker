import React, { Component } from 'react';
import PostCard from './../Components/PostCard';
import { Button, Input, InputLabel } from '@material-ui/core';
import { login, getUser } from '../Actions/UserActions';
import { connect } from "react-redux";


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            inputErrors: [],
        }
    }
    componentWillMount() {
        this.props.getUser();
        if(sessionStorage.getItem('userEmail')){
            this.props.history.push('/');
        }
    }

    validateEmail = (email) => {
        let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(String(email).toLowerCase());
    }

    /*validatePassword = (password) => {
        let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        return regex.test(String(password).toLowerCase());
    }*/

    validateForm = () => {
        let inputError = '';
        let isValid = true;
        if(!this.validateEmail(this.state.email)){
            inputError = 'Please, enter a valid email';
            isValid = false;
        }
        if(!isValid){
            this.setState({inputErrors: [...this.state.inputErrors, inputError]});
        }
        return isValid;
    }

    handleLogin = () => {
        if(this.validateForm()){
            this.login();
        }
    }

    login = () => {
        this.props.login(this.state.email, this.state.password).then(response => {
            sessionStorage.setItem('userEmail', response.user.email);
            this.props.history.replace('/');
        }).catch(err => { 

            this.setState({inputErrors:[...this.state.inputErrors, err.message] }) 
        })
    }

    render() {
        return (
            <PostCard

                title='Login'
                body={
                    <div>
                        <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                            <InputLabel htmlFor="login-email-input">Email:</InputLabel>
                            <Input
                                id="login-email-input"
                                type='email'
                                value={this.state.email}
                                error = {this.state.inputErrors.length !== 0}
                                onChange={(event) => {
                                    this.setState({ email: event.target.value, inputErrors: []})
                                }}
                            />
                        </div>
                        <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                            <InputLabel htmlFor="login-password-input">Password:</InputLabel>

                            <Input
                                id="login-password-input"
                                type='password'
                                value={this.state.password}
                                error = {this.state.inputErrors.length !== 0}
                                onChange={(event) => {
                                    this.setState({ password: event.target.value, inputErrors: [] })
                                }}
                            />
                        </div>
                {this.state.inputError === '' ? null : <span style = {{color: 'red'}}>{this.state.inputErrors.map((error, index) => (
                    <p key = {index}> {error}</p>
                ))}</span>}

                    </div>

                }
                actions={
                    <div>
                        <Button onClick={this.handleLogin}>Login</Button>
                        <Button onClick={() => { this.props.history.push('/register') }}>Create Account</Button>
                    </div>}
            />
        );
    }
}

export default connect(null, { login, getUser })(Login);