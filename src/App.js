import React, { Component } from 'react';
import './App.css';
import Calendar from './Calendar';
import ButtonAppBar from './AppBar';
import {connect} from 'react-redux';
import {setMonth, setYear} from './actions';

class App extends Component {
  render() {
    console.log('app props',this.props);
    return (
        <div className="App">
        <ButtonAppBar></ButtonAppBar>
        <Calendar dateContext = {this.props.dateContext} 
        setYear ={this.props.setYear} 
        setMonth ={this.props.setMonth}
        ></Calendar>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    dateContext: store.dateContext,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setYear: year => dispatch(setYear(year)),
    setMonth : month => dispatch(setMonth(month))
}}

export default connect(mapStateToProps, mapDispatchToProps)(App);
