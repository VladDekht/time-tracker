import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
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
            loggedHours: this.props.loggedHours,
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
        if (!this.state.showTrackModal) {
            this.setState({ showTrackModal: true })
        }
    }

    closeTrackModal = () => {
        if (this.state.showTrackModal) {
            this.setState({ showTrackModal: false })
        }
    }

    render() {
        return (
            <Card
                onMouseEnter={this.showAddButton}
                onMouseLeave={this.hideAddButton}
                style = {{boxShadow: 'none', backgroundColor: (this.props.loggedHours > 0 ? (this.props.loggedHours > 4 ? (this.props.loggedHours > 8 ? '#F7E4E4' : '#f5f587') : '#DCF7D7') : '#E3E3E3')}}
            >
                <CardActionArea onClick={this.openTrackModal} style ={{width: '100%', height : '100%'}}>
                    <CardHeader title={this.state.day} />
                    <CardContent>
                        <Typography>
                            Total: {this.props.loggedHours} hours
                    </Typography>

                        {this.state.showTrackModal ?
                            <TimeTrackModal
                                open={this.state.showTrackModal}
                                onClose={this.closeTrackModal}
                            />
                            : null}
                    </CardContent>
                    {/*this.state.showAddButton ? <Button onClick={this.openTrackModal}><AddIcon /></Button> : null*/}
                </CardActionArea>
            </Card>
        );
    }
}

export default CalendarDay;