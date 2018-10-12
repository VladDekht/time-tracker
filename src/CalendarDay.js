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
            date: this.props.date,
            hours: 0,
            showAddButton: false,
            showTrackModal: false
        }
        console.log(this.state.day)
    }
    static getDerivedStateFromProps(props,state) {
        let keys = Object.keys(props.logs);
        let hours = 0;
        for(let key of keys){
            if (props.logs[key].date.localeCompare(props.date) === 0) {
                hours = parseInt(props.logs[key].hours);
                break;
            }
        }
        return ({hours: hours})
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
                style = {{boxShadow: 'none', 
                backgroundColor: (this.state.hours > 0 ? (this.state.hours > 4 ? (this.state.hours > 8 ? '#F7E4E4' : '#f5f587') : '#DCF7D7') : '#E3E3E3')}}
            >
                <CardActionArea onClick={this.openTrackModal} style ={{width: '100%', height : '100%'}}>
                    <CardHeader title={this.state.day} />
                    <CardContent>
                        <Typography>
                            Total: {this.state.hours} hours
                    </Typography>

                        {this.state.showTrackModal ?
                            <TimeTrackModal
                                open={this.state.showTrackModal}
                                onClose={this.closeTrackModal}
                                {...this.props}
                            />
                            : null}
                    </CardContent>
                </CardActionArea>
            </Card>
        );
    }
}

export default CalendarDay;