import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import moment, { monthsShort } from 'moment';
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  Input,
  Select,
  MenuItem,
  CardActions,
  CircularProgress
} from '@material-ui/core';
import CalendarDay from './CalendarDay';
import { validateYear } from './../validators/validators';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: 140,
    width: 100
  },
  control: {
    padding: theme.spacing.unit * 2
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  tableRow: {
    padding: '0'
  },
  tableCell: {
    padding: '0.5%'
  },

  circularProgressContainer: {
    margin: 'auto',
    width: '10%',
    paddingTop: '20%'
  },
  hiddenOverflow: {
    overflow: 'hidden'
  },
  formControlContainer: {
    float: 'left',
    paddingRight: '1%'
  }
});

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: this.props.logs,
      dateContext: moment(),
      showMonthPopus: false,
      showYearPopup: false
    };
  }

  weekdays = moment.weekdays();
  weekdaysShort = moment.weekdaysShort();
  months = moment.months();
  monthsShort = moment.monthsShort();

  getYear = () => {
    return this.state.dateContext.format('YYYY');
  };
  getMonth = () => {
    return this.state.dateContext.month();
  };
  getDaysInMonth = () => {
    return this.state.dateContext.daysInMonth();
  };
  getCurrentDate = () => {
    return this.state.dateContext.get('date');
  };
  getCurrentDay = () => {
    return this.state.dateContext.format('DD');
  };

  getFirstDayOfMonth = () => {
    let dateContext = this.state.dateContext;
    let firstDay = moment(dateContext)
      .startOf('month')
      .format('d');
    return firstDay;
  };
  getLastDayOfMonth = () => {
    let dateContext = this.state.dateContext;
    let lastDay = moment(dateContext)
      .endOf('month')
      .format('d');
    return lastDay;
  };
  setMonth = event => {
    let month = event.target.value;
    this.setState({
      dateContext: moment(this.state.dateContext).set('month', month)
    });
  };
  setYear = event => {
    let newYear = event.target.value;
    if (validateYear(newYear)) {
      this.setState({
        dateContext: moment(this.state.dateContext).set('year', newYear)
      });
    }
  };

  

  mapCalendarRow = (row, classes) => {
    return row.map(day => (
      <TableCell className={classes.tableCell}>
        {day !== '' ? (
          <CalendarDay
            key={
              this.getDateByNumber(day) +
              this.getMonth() +
              this.getYear()
            }
            {...this.props}
            logs={this.props.logs}
            day={day}
            date={this.getDateByNumber(day)}
          />
        ) : null}
      </TableCell>
    ))
  }

  mapCalendarRows = (rows, classes) => {
    return rows.map((row, index) => (
      <TableRow className={classes.tableRow} key = {`calendar-row-${index}`}>
        {this.mapCalendarRow(row, classes)}
      </TableRow>
    ))
  }

  mapMenuItems = (items) => {
    return items.map((item, index) => (
        <MenuItem key={item} value={index}>
          {item}
        </MenuItem>
        ))
  }

  mapDisplayElemsIntoRows = (displayElems) => {
    let rows = [];
    let cells = [];
    displayElems.forEach((day, index) => {
      if (index % 7 !== 0) {
        cells.push(day);
      } else {
        let insertRow = cells.slice();
        if (insertRow.length > 0) {
          rows.push(insertRow);
        }
        cells = [];
        cells.push(day);
      }
      if (index === displayElems.length - 1) {
        let insertRow = cells.slice();
        if (insertRow.length > 0) {
          rows.push(insertRow);
        }
        cells = [];
      }
    });

    return rows
  }

  mapStringArrayIntoTableCells = (stringArray) => {
    return stringArray.map((string, index) => (
      <TableCell key = {`table-item-${string}-${index}`}>{string}</TableCell>
    ))
  }

  getDateByNumber = number => {
    let date = moment(
      `${number}-${this.getMonth() + 1}-${this.getYear()}`,
      'D/M/YYYY'
    )._i;
    return date;
  };

  render() {
    let lastDaysOfPrevMonth = [];
    for (let i = 0; i < this.getFirstDayOfMonth(); i++) {
      lastDaysOfPrevMonth.push('');
    }
    let firstDaysOfNextMonth = [];
    for (let i = 6; i > this.getLastDayOfMonth(); i--) {
      firstDaysOfNextMonth.push('');
    }
    let daysInMonth = [];
    for (let i = 0; i < this.getDaysInMonth(); i++) {
      daysInMonth.push(i + 1);
    }

    let displayElems = [].concat(...lastDaysOfPrevMonth, ...daysInMonth, ...firstDaysOfNextMonth);
    let rows = this.mapDisplayElemsIntoRows(displayElems);
    const { classes } = this.props;
    return this.props.logs &&
      (Object.keys(this.props.logs).length > 0 || this.props.logs === -1) ? (
        <Card>
          <div>
            <Table>
              <TableHead>
                <TableRow>{this.mapStringArrayIntoTableCells(this.weekdaysShort)}</TableRow>
              </TableHead>
              <TableBody>
                {this.mapCalendarRows(rows, classes)}
              </TableBody>
            </Table>
          </div>
          <CardActions>
            <div className={classes.hiddenOverflow}>
              <div className={classes.formControlContainer}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor='month-select'>Month</InputLabel>
                  <Select
                    onChange={this.setMonth}
                    value={this.getMonth()}
                    inputProps={{
                      name: 'month',
                      id: 'month-select'
                    }}
                    disableUnderline
                  >
                    {this.mapMenuItems(this.monthsShort)}
                  </Select>
                </FormControl>
              </div>
              <div className={classes.hiddenOverflow}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor='year-input'>Year</InputLabel>
                  <Input
                    defaultValue={this.getYear()}
                    inputType='number'
                    disableUnderline
                    onChange={this.setYear}
                    inputProps={{
                      id: 'year-input'
                    }}
                  />
                </FormControl>
              </div>
            </div>
          </CardActions>
        </Card>
      ) : (
        <div className={classes.circularProgressContainer}>
          <CircularProgress thickness={5} />
        </div>
      );
  }
}

export default withStyles(styles)(Calendar);
