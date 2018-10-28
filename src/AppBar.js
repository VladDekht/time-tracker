/* eslint-disable indent */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Menu, MenuItem, Fade } from '@material-ui/core/';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { logout, getUser } from './actions/userActions';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class ButtonAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  logout = () => {
    this.handleClose();
    this.props.logout();
    this.props.history.push('/login');
  };

  render() {
    const { classes, history, userInfo } = this.props;
    const { anchorEl } = this.state;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="title"
              color="inherit"
              className={classes.grow}
            >
              Time Tracking
            </Typography>
            {!_.isEmpty(userInfo.user) ? (
              <div>
                <Button
                  aria-owns={anchorEl ? 'logout-menu' : null}
                  aria-haspopup="true"
                  onClick={this.handleClick}
                >
                  <p style={{ color: 'white' }}>{userInfo.user.email}</p>
                </Button>
                <Menu
                  id="logout-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={this.handleClose}
                  TransitionComponent={Fade}
                >
                  <MenuItem onClick={() => this.logout()}>Logout</MenuItem>
                </Menu>
              </div>
            ) : (
              <Button
                color="inherit"
                onClick={history.push('/login')}
              >
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.user,
});

const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch(getUser()),
  logout: () => dispatch(logout()),
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(ButtonAppBar);
