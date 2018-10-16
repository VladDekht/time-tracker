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
import CardActions from '@material-ui/core/CardActions';



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
    },
    tableRow: {
        padding: '0 !important',
    },
    tableCell: {
        padding: '0 !important',
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
    getLastDayOfMonth = () => {
        let dateContext = this.state.dateContext;
        let lastDay = moment(dateContext).endOf('month').format('d');
        return lastDay;
    }
    setMonth = (event) => {
        let month = event.target.value;
        this.setState({ dateContext: moment(this.state.dateContext).set('month', month) });
    }
    setYear = (event) => {
        let newYear = event.target.value;
        if (this.validateYearInput(newYear)) {
            this.setState({ dateContext: moment(this.state.dateContext).set('year', newYear) });
        }
    }

    validateYearInput = (year) => {
        var regex = /(19[0-9][0-9]|20[0-3][0-9])/;
        if (regex.test(year)) {
            return true;
        }
        return false;
    }

    getDateByNumber = number => {
        let date = moment(`${number}-${this.getMonth() + 1}-${this.getYear()}`, 'D/M/YYYY')._i;
        return date;
    }


    render() {
        console.log('logs', this.props.logs)

        let weekdays = this.weekdaysShort.map((weekday) => (
            <TableCell>
                {weekday}
            </TableCell>))

        let blanks = [];
        for (let i = 0; i < this.getFirstDayOfMonth(); i++) {
            blanks.push('');
        }
        let endBlanks = [];
        for (let i = 6; i > this.getLastDayOfMonth(); i--) {
            endBlanks.push('');
        }
        let daysInMonth = [];
        for (let i = 0; i < this.getDaysInMonth(); i++) {
            daysInMonth.push(
                i + 1
            );
        }

        let displayElems = [].concat(...blanks, ...daysInMonth, ...endBlanks);
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
                    <Table>
                        <TableHead>
                            <TableRow>
                                {weekdays}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) =>
                                (<TableRow className={classes.tableRow}>
                                    {row.map((day) =>
                                        {
                                            return (<TableCell className={classes.tableCell}>
                                            {day !== '' ? <CalendarDay
                                                key = {this.getDateByNumber(day) + this.getMonth() + this.getYear()}
                                                {...this.props}
                                                logs = {this.props.logs}
                                                day={day}
                                                date = {this.getDateByNumber(day)}
                                            /> : null}

                                        </TableCell>)}
                                    )}
                                </TableRow>))}
                        </TableBody>
                    </Table>
                </div>
                <CardActions>
                    <div>
                        <div>
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
                                        <MenuItem key = {month} value={index}>{month}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        </div>
                        <div>
                            <Input
                                defaultValue={this.getYear()}
                                //className={classes.input}
                                inputType='number'
                                disableUnderline
                                onChange={e => { this.setYear(e) }}
                            />
                        </div>

                    </div>

                </CardActions>
            </Card>
        );
    }
}

export default withStyles(styles)(Calendar);