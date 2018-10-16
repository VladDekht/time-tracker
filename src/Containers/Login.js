import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import PostCard from './../Components/PostCard';
import { Button, Input, InputLabel } from '@material-ui/core';
import { login, getUser } from '../Actions/UserActions';
import { connect } from "react-redux";


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }
    componentWillMount() {
        this.props.getUser();
    }

    login = () => {
        this.props.login(this.state.email, this.state.password).then(response => {
            sessionStorage.setItem('userEmail', response.user.email);
            this.props.history.replace('/');
        }).catch(err => { console.log(err) })
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
                                //placeholder={'Enter email'}
                                onChange={(event) => {
                                    this.setState({ email: event.target.value })
                                }}
                            />
                        </div>
                        <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                            <InputLabel htmlFor="login-password-input">Password:</InputLabel>

                            <Input
                                id="login-password-input"
                                type='password'
                                value={this.state.password}
                                //placeholder={'Enter password'}
                                onChange={(event) => {
                                    this.setState({ password: event.target.value })
                                }}
                            />
                        </div>
                    </div>

                }
                actions={
                    <div>
                        <Button onClick={this.login}>Login</Button>
                        <Button onClick={() => { this.props.history.push('/CreateAccount') }}>Create Account</Button>
                    </div>}
            />
        );
    }
}

export default connect(null, { login, getUser })(Login);