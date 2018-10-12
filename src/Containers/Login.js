import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import PostCard from './../Components/PostCard';
import { Button, Input } from '@material-ui/core';
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
            localStorage.setItem('userEmail', response.user.email);
            this.props.history.replace('/');
        }).catch(err => { console.log(err) })
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
                        <Button onClick={() => { this.props.history.push('/CreateAccount') }}>Create Account</Button>
                        <Button onClick={this.login}>Login</Button>

                    </div>}
            />
        );
    }
}

export default connect(null, { login, getUser })(Login);