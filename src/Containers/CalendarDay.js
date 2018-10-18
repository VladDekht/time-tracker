import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import TimeTrackModal from '../Components/TimeTrackModal';
import {withStyles} from '@material-ui/core';

const styles = theme => ({
    title: {
        color: 'red'
    }
})

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


    static getDerivedStateFromProps(props, state) {
        if (props.logs.length !== {}) {
            let keys = Object.keys(props.logs);
            let hours = 0;
            for (let key of keys) {
                if (props.logs) {
                    if (props.logs[key].date.localeCompare(props.date) === 0) {
                        hours = parseInt(props.logs[key].hours);
                        break;
                    }
                }
            }
            return ({ hours: hours })
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

    hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    render() {
        let color = (this.state.hours > 0 ? (this.state.hours > 4 ? (this.state.hours > 8 ? '#7A89C2' : '#AFA2FF') : '#E3D7FF') : '#FDFCFF');
        let colorRGB = this.hexToRgb(color);
        let fontColor = (colorRGB.r * 0.299 + colorRGB.g * 0.587 + colorRGB.b * 0.114) > 186 ? '#000000' : '#ffffff';
        let {classes} = this.props;
        return (
            <Card
                onMouseEnter={this.showAddButton}
                onMouseLeave={this.hideAddButton}
                style={{
                    boxShadow: '1px',
                    backgroundColor: color,
                }}
            >
                <CardActionArea onClick={this.openTrackModal} style={{ width: '100%', height: '100%' }}>
                        <p style={{ color: fontColor, paddingLeft : '24px', fontSize : '1.5em' }}>
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

export default withStyles(styles)(CalendarDay);