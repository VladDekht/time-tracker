import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { CardActions, withStyles } from '@material-ui/core';

const styles = () => ({
    displayTableCell: {
        display: 'tableCell',
    },
    card: {
        margin: 'auto',
        maxWidth: '30em',
    },
    bodyContainer: {
        margin: 'auto',
        maxWidth: '50%',
        padding: '10px 10px 10px 10px',
    },
});

const PostCard = ({ title, body, footer, actions, classes }) => (
    <div className = {classes.displayTableCell}>
        <Card className = {classes.card}>
            <div className = {classes.bodyContainer}>
                {title && <CardHeader title={title} />}
                {body && <CardContent children={body} />}
                {footer && footer}
                {actions && <CardActions children={actions} />}
            </div>
        </Card>
    </div>
)

export default withStyles(styles)(PostCard);
