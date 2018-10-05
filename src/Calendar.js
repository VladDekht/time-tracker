import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';


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
            weekdays: [
                { id: 0, name: 'Monday' },
                { id: 1, name: 'Tueseday' },
                { id: 2, name: 'Wednesday' },
                { id: 3, name: 'Thursday' },
                { id: 4, name: 'Friday' },
                { id: 5, name: 'Saturday' },
                { id: 6, name: 'Sunday' }
            ],
            weeks: [
                {
                    number: 1, days: [
                        { number: 1 },
                        { number: 2 },
                        { number: 3 },
                        { number: 4 },
                        { number: 5 },
                        { number: 6 },
                        { number: 7 },
                    ]
                },
                {
                    number: 2, days: [
                        { number: 8 },
                        { number: 9 },
                        { number: 10 },
                        { number: 11 },
                        { number: 12 },
                        { number: 13 },
                        { number: 14 },
                    ]
                }
            ]
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <Card>
                <div className={classes.root}>
                    <Grid container className={classes.root} spacing={16}>
                        <Grid item xs={12}>
                            <Grid container className={classes.header} justify="center" spacing={16}>
                                {this.state.weekdays.map(weekday => (
                                    <Grid key={weekday.id} item>
                                        {weekday.name}
                                    </Grid>
                                ))}
                            </Grid>
                            {this.state.weeks.map(week => (
                                <Grid container className={classes.demo} justify="center" spacing={16}>
                                    {week.days.map(day => (
                                        <Grid key={day.number} item>
                                            <CalendarDay
                                                key={day.number}
                                                classes={classes}
                                                day={day.number}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            ))}

                        </Grid>
                    </Grid>
                </div>

            </Card>
        );
    }
}

class CalendarDay extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card className={this.props.classes.paper} >
                <CardContent>
                    <Typography className={this.props.classes.title} color="textSecondary">
                        {this.props.day}
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

export default withStyles(styles)(Calendar);