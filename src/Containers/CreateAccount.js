import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import PostCard from './../Components/PostCard';
import { Button, Input } from '@material-ui/core';
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
                        <div>
                            <Input
                                type='password'
                                value={this.state.confirmPassword}
                                placeholder={'Repeat password'}
                                onChange={(event) => {
                                    this.setState({ confirmPassword: event.target.value })
                                }}
                            />
                        </div>
                    </div>

                }
                footer={'Footer'}

                actions={<div>

                    <Button onClick={() => { this.props.history.push('/Login') }}>Sign In</Button>
                    <Button onClick = {this.register}>Register</Button>
                </div>}
            />
        );
    }
}

export default connect(null, { register, getUser })(CreateAccount);
