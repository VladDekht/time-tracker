import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Menu, MenuItem, Fade } from '@material-ui/core/';
import { logout } from './Actions/UserActions';
import { connect } from "react-redux";
import { compose } from 'redux';


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

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  logout = () => {
    this.props.logout().then(() => {
      sessionStorage.removeItem('userEmail');
      this.props.history.push('/login');
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit" className={classes.grow}>
              Time Tracking
            </Typography>
            {sessionStorage.getItem('userEmail') ?
              <div>
                <Button
                  aria-owns={this.state.anchorEl ? 'logout-menu' : null}
                  aria-haspopup="true"
                  onClick={this.handleClick}
                >
                <p style = {{color: 'white'}}>{sessionStorage.getItem('userEmail')}</p>
                </Button>
                <Menu
                  id="logout-menu"
                  anchorEl={this.state.anchorEl}
                  open={Boolean(this.state.anchorEl)}
                  onClose={this.handleClose}
                  TransitionComponent={Fade}
                >
                  <MenuItem onClick={() => {
                    this.handleClose();
                    this.logout();
                  }}>Logout</MenuItem>
                </Menu>
              </div>
              : <Button color="inherit" onClick={this.props.history.push('/login')}>Login</Button>}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styles), connect(null, { logout }))(ButtonAppBar);