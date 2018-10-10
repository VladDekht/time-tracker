import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { CardActions } from '@material-ui/core';

const PostCard = ({ title, body, footer, actions }) => (
    <Card>
        {title && <CardHeader title={title} />}
        {body && <CardContent children={body} />}
        {footer && footer}
        {actions && <CardActions children = {actions}/>}
    </Card>
)

export default PostCard;