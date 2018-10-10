import React, { Component } from "react";
import "./App.css";
import Calendar from "./Calendar";
import ButtonAppBar from "./AppBar";
import { connect } from "react-redux";
import { setMonth, setYear } from "./actions";
import firebase from "firebase";

var config = {
  apiKey: "AIzaSyC2ychCx-8V5Z-JrHbxayTEFt2J54XtTv8",
  authDomain: "time-tracker-b99e6.firebaseapp.com",
  databaseURL: "https://time-tracker-b99e6.firebaseio.com",
  projectId: "time-tracker-b99e6",
  storageBucket: "",
  messagingSenderId: "938595081363"
};
firebase.initializeApp(config);

class App extends Component {
  render() {
    console.log("app props", this.props);
    return (
      <div className="App">
        <ButtonAppBar />
        <Calendar
          dateContext={this.props.dateContext}
          setYear={this.props.setYear}
          setMonth={this.props.setMonth}
        />
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    dateContext: store.dateContext
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setYear: year => dispatch(setYear(year)),
    setMonth: month => dispatch(setMonth(month))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
