import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { CardActions } from '@material-ui/core';

const PostCard = ({ title, body, footer, actions }) => (
    <div style= {{display:'tableCell'}}>
<Card style={{ margin: 'auto', maxWidth: '30em' }}>
        <div style = {{margin: 'auto', maxWidth: '50%', padding: '10px 10px 10px 10px'}}>
            {title && <CardHeader title={title} />}
            {body && <CardContent children={body} />}
            {footer && footer}
            {actions && <CardActions children={actions} />}
        </div>
    </Card>
    </div>
    
)

export default PostCard;