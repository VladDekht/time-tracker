import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class TimeTrackModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hourstoadd: 0
        }
    }

    handleChange = event => {
        this.setState({hourstoadd : event.target.value})
    }

    render() {
        return (
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.props.open}
                onClose={this.props.onClose}
            >
                <Card style = {{
                    maxWidth: '20%',
                    marginLeft: '40%',
                    marginTop: '10%'
                }}>
                <Typography>
                    Add hours
                </Typography>
                    <div style = {{margin : '3% 3% 3% 3% '}}>
                        <form noValidate>
                            <FormControl>
                                <InputLabel htmlFor="hours-simple">Add Hours</InputLabel>
                                <Select
                                    value={this.state.hourstoadd}
                                    onChange={this.handleChange}
                                    input={<Input id="hours-simple" />}
                                >
                                    <MenuItem value={0}>
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={1}>One</MenuItem>
                                    <MenuItem value={2}>Two</MenuItem>
                                    <MenuItem value={3}>Three</MenuItem>
                                    <MenuItem value={4}>Four</MenuItem>
                                    <MenuItem value={5}>Five</MenuItem>
                                    <MenuItem value={6}>Six</MenuItem>
                                    <MenuItem value={7}>Seven</MenuItem>
                                    <MenuItem value={8}>Eight</MenuItem>
                                    <MenuItem value={9}>Nine</MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                </Select>
                            <Button onClick = {(e) => {
                                this.props.onSubmit(e)
                            }}>Submit</Button>

                            </FormControl>

                        </form>
                        <Button onClick = {this.props.onClose}>Close</Button>
                    </div>
                </Card>
            </Modal>
        );
    }
}

export default TimeTrackModal;