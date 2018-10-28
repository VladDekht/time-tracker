import React, { Component } from 'react';
import { connect } from 'react-redux';
import Calendar from './Calendar';
import ButtonAppBar from '../AppBar';
import { getLogsList, setLog } from '../actions/logsActions';
import { getUser } from '../actions/userActions';

export class App extends Component {
  componentWillMount() {
    this.props.getLogsList();
    this.props.getUser();
  }

  render() {
    return (
      <div>
        <ButtonAppBar {...this.props} />
        <Calendar
          {...this.props}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
    logs: state.logs.logsList,
    user: state.user,
  });

const mapDispatchToProps = dispatch => ({
  getLogsList: () => dispatch(getLogsList()),
  setLog: log => dispatch(setLog(log)),
  getUser: () => dispatch(getUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
