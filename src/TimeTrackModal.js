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
            hours: this.props.hours,
            inputHours: 1,
            inputError: '',
            isValid: true
        }
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

    validateInputHours = (inputHours) => {
        let inputError = '';
        let hours = this.state.hours;
        let isValid = true;
        if(inputHours !== null && !isNaN(inputHours)){
            if(hours + inputHours > 24 || hours + inputHours < 0){
                inputError = "Total hours amount must be from 0 to 24";
                isValid = false;
            }
            if(inputHours === 0){
                inputError = "Can't log 0 hours";
            }
        }
        this.setState({inputError, isValid});
        return isValid;
    }

    handleInputChange = e => {
        let newValue = parseInt(e.target.value);
        if(this.validateInputHours(newValue)){
            this.setState({inputHours: newValue});
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
        this.props.setLog({ date: this.state.date, hours: this.state.inputHours + this.state.hours, user: localStorage.getItem('user') });
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
                        <p>Logged hours: {this.state.hours}</p>
                        <div >
                            <InputLabel htmlFor ={`time-track-modal-${this.state.date}`}>{this.state.inputHours >= 0 ? <div>Add hours</div> : <div>Remove hours</div>}</InputLabel>
                            <Input
                            id = {`time-track-modal-${this.state.date}`}
                            value = {this.state.inputHours}
                            onChange = {e => {
                                this.handleInputChange(e)
                            }}
                            type = {'number'}
                            error = {this.state.inputError !== ''}
                            >
                            </Input>
                            <div>
                            {this.state.inputError === '' ? null : <span style = {{color: 'red'}}>{this.state.inputError}</span>}
                            </div>
                            <div>
                                <Button disabled = {!this.state.isValid || this.state.inputHours === 0}onClick={this.handleSubmit}>Submit</Button>
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