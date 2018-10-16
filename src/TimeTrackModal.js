import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import Select from '@material-ui/core/Select';
import { setLog, getLog } from './Actions/LogsActions';

class TimeTrackModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: this.props.date,
            hours: this.props.hours
        }
    }

    handleChange = event => {
        this.setState({ hours: event.target.value })
    }

    monthNumToWord = (num) => {
        if (typeof num === 'string') {
            num = parseInt(num);
        }
        switch (num) {
            case 1:
                return "January";
            case 2:
                return "February";
            case 3:
                return "March";
            case 4:
                return "April";
            case 5:
                return "May";
            case 6:
                return "June";
            case 7:
                return "July";
            case 8:
                return "August";
            case 9:
                return "September";
            case 10:
                return "October";
            case 11:
                return "November";
            case 12:
                return "December";
        }
    }

    formatDate = (date) => {
        let dates = date.split('-');
        if(dates.length === 3){
            return `${dates[0]} of ${this.monthNumToWord(dates[1])} ${dates[2]}`
        }
        return date;
    }

    handleSubmit = () => {
        this.props.setLog({ date: this.state.date, hours: this.state.hours, user: localStorage.getItem('user') });
        this.props.onClose();
    }

    render() {
        return (
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.props.open}
                onClose={this.props.onClose}
                disableAutoFocus={true}
            >
                <Card style={{
                    maxWidth: '20%',
                    margin: 'auto',
                    marginTop: '10%',
                }}>
                    <CardHeader 
                    title={this.formatDate(this.state.date)}>
                    </CardHeader>
                    <CardContent>

                        <div >
                            <FormControl style = {{position:'relative !important'}}>
                                <InputLabel htmlFor="hours-simple">Add Hours</InputLabel>

                                <Select
                                    value={this.state.hours}
                                    onChange={this.handleChange}
                                    input={
                                        <Input id="hours-simple" />
                                    }
                                >
                                    <MenuItem value={0}>
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={1}>One</MenuItem>
                                    <MenuItem value={2}>Two</MenuItem>
                                    <MenuItem value={3}>Three</MenuItem>
                                    <MenuItem value={4}>Four</MenuItem>
                                    <MenuItem value={5}>Five</MenuItem>
                                    <MenuItem value={6}>Six</MenuItem>
                                    <MenuItem value={7}>Seven</MenuItem>
                                    <MenuItem value={8}>Eight</MenuItem>
                                    <MenuItem value={9}>Nine</MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                </Select>
                            </FormControl>
                            <div>
                                <Button onClick={this.handleSubmit}>Submit</Button>
                                <Button onClick={this.props.onClose}>Close</Button>

                            </div>

                        </div>
                    </CardContent>


                </Card>
            </Modal>
        );
    }
}

export default TimeTrackModal;