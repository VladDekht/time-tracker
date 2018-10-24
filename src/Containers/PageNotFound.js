import React, { Component } from "react";
import ButtonAppBar from "../AppBar";
import { connect } from "react-redux";
import {getUser} from '../Actions/userActions';
import {Card, CardHeader, CardContent, Button} from '@material-ui/core';


export class PageNotFound extends Component {

  render() {
    return (
      <div >
        <ButtonAppBar {...this.props} />
        {<div style = {{margin: 'auto', width: '20%', paddingTop: '300px'}}>
        <Card>
            <CardHeader title = "Specified page is not found"></CardHeader>
            <CardContent>
                <Button onClick = {() => this.props.history.push('/')}>Home</Button>                
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
  })
  
  const mapDispatchToProps = dispatch => ({
    getUser: () => dispatch(getUser()),
  })
  
  export default connect(mapStateToProps,mapDispatchToProps)(PageNotFound);

