import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Card, CardHeader, CardContent, Button, withStyles } from '@material-ui/core';
import { getUser } from '../actions/userActions';
import ButtonAppBar from '../AppBar';


const styles = theme => ({
  container: {
    margin: 'auto',
    width: '20%',
    paddingTop: '300px',
  },
});

class PageNotFound extends Component {
  render() {
    console.log(this.props);
    const { classes } = this.props;
    return (
      <div>
        <ButtonAppBar {...this.props} />
        {<div className={classes.container}>
          <Card>
            <CardHeader title="Specified page is not found" />
            <CardContent>
              <Button onClick={() => this.props.history.push('/')}>Home</Button>
            </CardContent>
          </Card>
        </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch(getUser()),
});

export default compose(withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps))(PageNotFound);
