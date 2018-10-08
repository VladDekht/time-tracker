import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import TimeTrackModal from './TimeTrackModal';
import moment, { monthsShort } from 'moment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CalendarDay from './CalendarDay';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';



const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
        width: 100,
    },
    control: {
        padding: theme.spacing.unit * 2,
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
    }
});

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dateContext: moment(),
            today: moment(),
            showMonthPopus: false,
            showYearPopup: false
        }
    }

    weekdays = moment.weekdays();
    weekdaysShort = moment.weekdaysShort();
    months = moment.months();
    monthsShort = moment.monthsShort();

    getYear = () => {
        return this.state.dateContext.format('YYYY');
    }
    getMonth = () => {
        return this.state.dateContext.month();
    }
    getDaysInMonth = () => {
        console.log(this.state.dateContext.daysInMonth())
        return this.state.dateContext.daysInMonth();
    }
    getCurrentDate = () => {
        return this.state.dateContext.get('date');
    }
    getCurrentDay = () => {
        return this.state.dateContext.format('DD');
    }

    getFirstDayOfMonth = () => {
        let dateContext = this.state.dateContext;
        let firstDay = moment(dateContext).startOf('month').format('d');
        return firstDay;
    }
    setMonth = (event) => {
        let newMonth = event.target.value;
        this.setState({ dateContext: moment(this.state.dateContext).set('month', newMonth) })
    }
    setYear = (event) => {
        let newYear = event.target.value;
        this.setState({ dateContext: moment(this.state.dateContext).set('year', newYear) })
    }


    render() {
        let weekdays = this.weekdaysShort.map((weekday) => (
            <TableCell>
                {weekday}
            </TableCell>))

        let blanks = [];
        for (let i = 0; i < this.getFirstDayOfMonth(); i++) {
            blanks.push('');
        }
        let daysInMonth = [];
        for (let i = 0; i < this.getDaysInMonth(); i++) {
            daysInMonth.push(
                i + 1
            );
        }

        let displayElems = [].concat(...blanks, ...daysInMonth);
        console.log(displayElems)
        let rows = [];
        let cells = [];
        displayElems.map((day, index) => {
            if (index % 7 !== 0) {
                cells.push(day);
            }
            else {
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
        })
        const { classes } = this.props;
        return (
            <Card>
                <div>
                    <form autoComplete="off" noValidate>
                        <FormControl className={classes.formControl} >
                            <InputLabel htmlFor="month-select">Month</InputLabel>
                            <Select
                                value={this.getMonth()}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'month',
                                    id: 'month-select',
                                }}
                                disableUnderline

                                onChange={(e) => this.setMonth(e)}
                            >
                                {this.monthsShort.map((month, index) =>
                                    <MenuItem value={index}>{month}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </form>
                    <Input
                        defaultValue={this.getYear()}
                        //className={classes.input}
                        inputType='number'
                        disableUnderline
                        onChange={e => this.setYear(e)}
                    />
                    <Table>
                        <TableHead>
                            <TableRow>
                                {weekdays}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) =>
                                (<TableRow>
                                    {row.map((day) =>
                                        (<TableCell>
                                            {day !== '' ? <CalendarDay
                                                day={day}
                                                loggedHours={0}
                                            /> : null}

                                        </TableCell>)
                                    )}
                                </TableRow>))}
                        </TableBody>
                    </Table>
                </div>

            </Card>
        );
    }
}

export default withStyles(styles)(Calendar);