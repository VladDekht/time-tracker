import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import PostCard from './../Components/PostCard';
import { Button, Input } from '@material-ui/core';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    render() {
        return (
            <PostCard
                title='Login'
                body={
                    <div>
                        <div>
                            <Input
                                type='email'
                                value={this.state.email}
                                placeholder={'Enter email'}
                                onChange={(event) => {
                                    this.setState({ email: event.target.value })
                                }}
                            />
                        </div>
                        <div>
                            <Input
                                type='password'
                                value={this.state.password}
                                placeholder={'Enter password'}
                                onChange={(event) => {
                                    this.setState({ password: event.target.value })
                                }}
                            />
                        </div>
                    </div>

                }
                footer={'Footer'}
                actions={
                    <div>
                        <Button onClick = {() => {this.props.history.push('/CreateAccount')}}>Create Account</Button>
                        <Button>Login</Button>

                    </div>}
            />
        );
    }
}