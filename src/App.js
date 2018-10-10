import React, { Component} from "react";
import Button from '@material-ui/core/Button';
import "./App.css";
import Calendar from "./Calendar";
import ButtonAppBar from "./AppBar";
import { connect } from "react-redux";
import { setMonth, setYear } from "./actions";
import firebase from "firebase";
//import fire from './Fire';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }
  }


  render() {
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
