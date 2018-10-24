/* eslint-disable indent */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Input, InputLabel } from '@material-ui/core';
import _ from 'lodash';
import PostCard from '../Components/PostCard';
import { login, getUser } from '../Actions/userActions';
import { validateEmail } from '../validators/validators';


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
    }

    handleLogin = () => {
        if (this.validateForm()) {
            this.login();
        }
    }

    login = () => {
        this.props.login(this.state.email, this.state.password)
            .then(response => {
                if (response.user) {
                    this.props.history.replace('/');
                }
            }).catch(err => {
                this.setState({ inputErrors: [...this.state.inputErrors, err.message] })
            })
    }

    render() {
        return (
            <PostCard

                title='Login'
                body={
                    <div>
                        <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                            <InputLabel htmlFor='login-email-input'>Email:</InputLabel>
                            <Input
                                id='login-email-input'
                                type='email'
                                value={this.state.email}
                                error={this.state.inputErrors.length !== 0}
                                onChange={(event) => {
                                    this.setState({ email: event.target.value, inputErrors: [] })
                                }}
                            />
                        </div>
                        <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                            <InputLabel htmlFor='login-password-input'>Password:</InputLabel>

                            <Input
                                id='login-password-input'
                                type='password'
                                value={this.state.password}
                                error={this.state.inputErrors.length !== 0}
                                onChange={(event) => {
                                    this.setState({ password: event.target.value, inputErrors: [] })
                                }}
                            />
                        </div>
                        {this.state.inputError === '' ? null : <span style={{ color: 'red' }}>{this.state.inputErrors.map((error, index) => (
                            <p key={index}> {error}</p>
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

const mapStateToProps = state => ({
    user: state.user,
});

const mapDispatchToProps = dispatch => ({
    getUser: () => dispatch(getUser()),
    login: (email, password) => dispatch(login(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
