import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import TimeTrackModal from '../components/TimeTrackModal';
import { hexToRgb, whiteOrBlackFont } from '../helpers/helpers';
import {
    ZERO_HOURS_COLOR,
    ONE_FOUR_HOURS_COLOR,
    FIVE_EIGHT_HOURS_COLOR,
    NINE_PLUS_HOURS_COLOR,
} from '../constants/colorConstants';

class CalendarDay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            day: this.props.day,
            date: this.props.date,
            hours: 0,
            showAddButton: false,
            showTrackModal: false,
        }

    }


    static getDerivedStateFromProps(props) {
        if (props.logs.length !== {}) {
            const keys = Object.keys(props.logs);
            let hours = 0;
            for (let key of keys) {
                if (props.logs) {
                    if (props.logs[key].date.localeCompare(props.date) === 0) {
                        hours = parseInt(props.logs[key].hours);
                        break;
                    }
                }
            }
            return ({ hours });
        }
    }

    showAddButton = () => {
        this.setState({ showAddButton: true });
    }

    hideAddButton = () => {
        this.setState({ showAddButton: false });
    }

    openTrackModal = () => {
        if (!this.state.showTrackModal) {
            this.setState({ showTrackModal: true });
        }
    }

    closeTrackModal = () => {
        if (this.state.showTrackModal) {
            this.setState({ showTrackModal: false });
        }
    }

    getColorFromHours = (hours) => {
        let color = ZERO_HOURS_COLOR;
        if (hours >= 9) {
            color = NINE_PLUS_HOURS_COLOR;
        }
        else if (hours >= 5) {
            color = FIVE_EIGHT_HOURS_COLOR;
        }
        else if (hours >= 1) {
            color = ONE_FOUR_HOURS_COLOR;
        }
        return color;
    }

    render() {
        const color = this.getColorFromHours(this.state.hours);
        const colorRGB = hexToRgb(color);
        const fontColor = whiteOrBlackFont(colorRGB);
        const { classes } = this.props;
        return (
            <Card
                onMouseEnter={this.showAddButton}
                onMouseLeave={this.hideAddButton}
                className = {classes.calendarDayCard}
                style = {{backgroundColor: color}}
            >
                <CardActionArea onClick={this.openTrackModal} className = {classes.fullWidthAndHeight}>
                        <p style={{ color: fontColor}} className = {classes.dayNumber}>
                            {this.state.day}
                        </p>
                    <CardContent>
                        <Typography>
                            <p style={{ color: fontColor }}>
                                Total: {this.state.hours} hours
                        </p>
                        </Typography>

                        {this.state.showTrackModal ?
                            <TimeTrackModal
                                hours={this.state.hours}
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