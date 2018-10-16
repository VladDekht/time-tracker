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
            confirmPassword: ''
        }
    }

    register = () => {
        this.props.register(this.state.email, this.state.password).then((response) => {
            localStorage.setItem('userEmail', response.user.email)
            this.props.history.replace('/');
        }).catch(err => {console.log(err)});
        
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
                                //placeholder={'Enter email'}
                                onChange={(event) => {
                                    this.setState({ email: event.target.value })
                                }}
                            />
                        </div>
                        <div  style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                        <InputLabel htmlFor="register-password-input">Password:</InputLabel>

                            <Input
                                id="register-password-input"

                                type='password'
                                value={this.state.password}
                                //placeholder={'Enter password'}
                                onChange={(event) => {
                                    this.setState({ password: event.target.value })
                                }}
                            />
                        </div>
                        <div  style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                        <InputLabel htmlFor="register-confirm-password-input">Confirm Password:</InputLabel>
                            <Input
                                id="register-confirm-password-input"

                                type='password'
                                value={this.state.confirmPassword}
                                //placeholder={'Repeat password'}
                                onChange={(event) => {
                                    this.setState({ confirmPassword: event.target.value })
                                }}
                            />
                        </div>
                    </div>

                }
                actions={
                <div>
                    <Button onClick = {this.register}>Register</Button>
                    <Button onClick={() => { this.props.history.push('/Login') }}>Sign In</Button>
                </div>}
            />
        );
    }
}

export default connect(null, { register, getUser })(CreateAccount);
