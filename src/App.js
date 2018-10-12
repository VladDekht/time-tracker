import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import "./App.css";
import Calendar from "./Calendar";
import ButtonAppBar from "./AppBar";
import { connect } from "react-redux";
import { getLogs, getLog, setLog } from './Actions/LogsActions';
import {getUser} from './Actions/UserActions';
import { Field, reduxForm, reset } from 'redux-form';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logs : this.props.logs
    }
  }

  componentWillMount() {
    this.props.getLogs();
  }

  render() {
    return (
      <div >
        <ButtonAppBar {...this.props} />
        <Calendar
          {...this.props}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  logs: state.logs,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  getLogs: () => dispatch(getLogs()),
  setLog: log => dispatch(setLog(log)),
  getUser: () => dispatch(getUser()),
  //login: (email,password) => dispatch(login(email,password))
})

export default connect(mapStateToProps,mapDispatchToProps)(App);

