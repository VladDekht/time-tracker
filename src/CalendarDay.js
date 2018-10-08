import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import TimeTrackModal from './TimeTrackModal';

class CalendarDay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            day: this.props.day,
            showAddButton: false,
            loggedHours : this.props.loggedHours,
            showTrackModal: false
        }
    }

    showAddButton = () => {
        this.setState({ showAddButton: true })
    }
    
    hideAddButton = () => {
        this.setState({ showAddButton: false })
    }

    openTrackModal = () => {
        if(!this.state.showTrackModal){
            this.setState({showTrackModal : true})
        }
    }

    closeTrackModal = () => {
        if(this.state.showTrackModal){
            this.setState({showTrackModal : false})
        }
    }

    render() {
        return (
            <Card
                onMouseEnter={this.showAddButton}
                onMouseLeave={this.hideAddButton}>
                <CardContent>
                    <Typography>{this.state.day}</Typography>
                    <Typography>
                        Logged {this.state.loggedHours} hours
                    </Typography>
                    {/*this.state.showAddButton ? <Button onClick = {this.openTrackModal}><AddIcon /></Button> : null*/}
                    {this.state.showTrackModal ? 
                        <TimeTrackModal
                            open = {this.state.showTrackModal}
                            onClose = {this.closeTrackModal}
                        /> 
                        : null}
                </CardContent>

            </Card>
        );
    }
}

export default CalendarDay;