import React, { Component } from 'react';
import ButtonAppBar from '../AppBar';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getUser } from '../Actions/userActions';
import { Card, CardHeader, CardContent, Button, withStyles } from '@material-ui/core';


const styles = theme => ({
  container: {
    margin: 'auto',
    width: '20%',
    paddingTop: '300px',
  },
});

class PageNotFound extends Component {
  render() {
    console.log(this.props)
    const { classes } = this.props;
    return (
      <div >
        <ButtonAppBar {...this.props} />
        {<div className = {classes.container}>
          <Card>
            <CardHeader title='Specified page is not found'></CardHeader>
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
