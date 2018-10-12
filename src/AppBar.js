import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
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
  }


  logout = () => {
    this.props.logout().then(() => {
      localStorage.removeItem('userEmail');
      this.props.history.push('/login');
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.grow}>
              Calendar
            </Typography>
            {localStorage.userEmail ?
              <div>
                <Typography color ="inherit">{localStorage.getItem('userEmail')}</Typography>
                <Button color="inherit" onClick={this.logout}>Logout</Button>
              </div>
              : <Button color="inherit" onClick = {this.props.history.push('/login')}>Login</Button>}
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