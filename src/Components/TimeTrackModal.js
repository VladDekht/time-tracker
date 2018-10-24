/* eslint-disable indent */
import React, { Component } from 'react';
import { Card, CardContent, CardHeader, Button, Modal, InputLabel, Input } from '@material-ui/core';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    card:{
        maxWidth: '20%',
        margin: 'auto',
        marginTop: '10%',
    },
    red: {
        color: 'red'
    }
})

class TimeTrackModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: this.props.date,
            hours: this.props.hours,
            inputHours: 1,
            inputError: '',
            isValid: true
        }
    }

    monthNumToWord = (num) => {
        return moment(num, 'MM').format('MMMM');
    }

    validateInputHours = (inputHours) => {
        let inputError = '';
        let hours = this.state.hours;
        let isValid = true;
        if (hours + inputHours > 24 || hours + inputHours < 0) {
            inputError = 'Total hours amount must be from 0 to 24';
            isValid = false;
        }
        if (inputHours === 0) {
            inputError = `Can't log 0 hours`;
        }
        this.setState({ inputError, isValid });
        return isValid;
    }

    handleInputChange = e => {
        let newValue = parseInt(e.target.value);
        if (this.validateInputHours(newValue)) {
            this.setState({ inputHours: newValue });
        }
    }

    formatDate = (date) => {
        let dates = date.split('-');
        if (dates.length === 3) {
            return `${dates[0]} of ${this.monthNumToWord(dates[1])} ${dates[2]}`
        }
        return date;
    }

    handleSubmit = () => {
        this.props.setLog({ 
            date: this.state.date, 
            hours: this.state.inputHours + this.state.hours, 
            user: localStorage.getItem('user') 
        });
        this.props.onClose();
    }

    render() {
        const {inputError} = this.state; 
        const {classes} = this.props;
        return (
            <Modal
                aria-labelledby='simple-modal-title'
                aria-describedby='simple-modal-description'
                open={this.props.open}
                onClose={this.props.onClose}
                disableAutoFocus={true}
            >
                <Card className = {classes.card}>
                    <CardHeader
                        title={this.formatDate(this.state.date)}>
                    </CardHeader>
                    <CardContent>
                        <p>Logged hours: {this.state.hours}</p>
                        <div >
                            <InputLabel htmlFor={`time-track-modal-${this.state.date}`}>
                                {this.state.inputHours >= 0 ?
                                    <div>Add hours</div>
                                    :
                                    <div>Remove hours</div>}
                            </InputLabel>
                            <Input
                                id={`time-track-modal-${this.state.date}`}
                                value={this.state.inputHours}
                                onChange={this.handleInputChange}
                                type='number'
                                error={inputError && {inputError}}
                            >
                            </Input>
                            <div>
                                {inputError &&
                                    <span className = {classes.red}>
                                        {inputError}
                                    </span>}
                            </div>
                            <div>
                                <Button disabled={this.state.inputHours === 0} onClick={this.handleSubmit}>Submit</Button>
                                <Button onClick={this.props.onClose}>Close</Button>
                            </div>
                        </div>
                    </CardContent>


                </Card>
            </Modal>
        );
    }
}

export default withStyles(styles)(TimeTrackModal);