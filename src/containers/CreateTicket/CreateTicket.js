import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../components/UI/Button/Button';
import styles from './CreateTicket.module.css';
import axios from '../../axios-global';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import ticketActionCreators from '../../store/actions/tickets';

class CreateTicket extends Component {

    state = {
        ticket: {
            subject: '',
            category: '',
            priority: 'normal',
            description: '',
            dateCreated: "",
            timestamp: null,
            status: "pending"
        },
        normalRadioButtonChecked: true,
        urgentRadioButtonChecked: false,
        criticalRadioButtonChecked: false,

    }
    
    componentWillUpdate(){
        console.log('[CreateTicket] will update');
    }

    handleTextChange = (field, event) => {
        let { ticket } = this.state;
        ticket[`${field}`] = event.target.value;
        console.log(ticket);
        this.setState({ticket});
    }

    handlePriorityChange = (value) => {
        let { ticket } = this.state;
        ticket.priority = value
        this.setState({
            ticket
        });
        console.log(this.state.ticket);
    }

    formatTime = (value) => {
        if(value < 10){
          value = "0" + value
        }
        //console.log('new value', value);
        return value
      }

    getFormattedDate = () => {
        let { ticket } = this.state;
        let timestamp = new Date().getTime()
        const date = new Date();
        let amOrPm; 
        let hour = date.getHours();
        if (hour < 12){
            amOrPm = "am";
        } else if(hour === 12){
            amOrPm = "pm"
        } else {
            amOrPm = "pm";
            hour = hour - 12
        }
        const dateStr = this.formatTime(date.getDate()) + "/" + this.formatTime((date.getMonth() + 1)) + "/" + date.getFullYear() + " " + hour + ":" + this.formatTime(date.getMinutes()) + amOrPm;
        ticket.dateCreated = dateStr;
        ticket.timestamp = timestamp
        this.setState({
            ticket
        })
    }

    handleSubmit = () => {
        this.getFormattedDate()
        const ticket = {
            ...this.state.ticket,
            userId: this.props.userId
        }
        this.props.postTicket(ticket, this.props.token)
    }

    
    render(){
        return (
            this.props.loading ? <Spinner/> :
            <div className={styles.CreateTicketContainer}>
                <h3>Create Ticket</h3>
                <form>
                    <input 
                        type="text" 
                        placeholder="Subject" 
                        value={this.state.ticket.subject}
                        onChange={(event) => {this.handleTextChange('subject', event)}}
                        className={styles.Input}
                    />

                    <label><strong>Choose a category:</strong></label>
                    <select id="category-select" required onChange={(event) => {this.handleTextChange('category', event)}} >
                        <option value="">--Please choose an option--</option>
                        <option value="general">General Inquiry</option>
                        <option value="account">My Account</option>
                        <option value="payments">Payments</option>
                        <option value="letter of guarantee">Letter of Guarantee</option>
                        <option value="insurance">Insurance Claim</option>
                    </select>

                    <p style={{marginBottom: "5px"}}><strong>Priority:</strong></p>
                    <div className={styles.Priority} >
                        <div>
                            <input 
                                type="radio" 
                                id="normal" 
                                name="Normal" 
                                value={this.state.ticket.priority} 
                                onClick={() => {
                                    this.handlePriorityChange('normal');
                                    this.setState({
                                        normalRadioButtonChecked: true,
                                        urgentRadioButtonChecked: false,
                                        criticalRadioButtonChecked: false
                                    })
                                }}
                                checked={this.state.normalRadioButtonChecked} />
                            <label style={{backgroundColor: "rgb(41, 185, 85)", color: "white", padding: "2px 4px"}}>Normal</label>
                        </div>
                        <div>
                            <input 
                                type="radio" 
                                id="urgent"
                                name="Urgent" 
                                value="urgent" 
                                onClick={() => {
                                    this.handlePriorityChange('urgent');
                                    this.setState({
                                        urgentRadioButtonChecked: true,
                                        normalRadioButtonChecked: false,
                                        criticalRadioButtonChecked: false
                                    })
                                }}
                                checked={this.state.urgentRadioButtonChecked} />
                            <label style={{backgroundColor: "rgb(142, 36, 170)", color: "white", padding: "2px 4px"}}>Urgent</label>
                        </div>
                        <div>
                            <input 
                                type="radio" 
                                id="critical"
                                name="Critical" 
                                value="critical" 
                                onClick={() => {
                                    this.handlePriorityChange('critical');
                                    this.setState({
                                        criticalRadioButtonChecked: true,
                                        normalRadioButtonChecked: false,
                                        urgentRadioButtonChecked: false
                                    })
                                }}
                                checked={this.state.criticalRadioButtonChecked} />
                            <label style={{backgroundColor: "rgb(230, 81, 0)", color: "white", padding: "2px 4px"}}>Critical</label>
                        </div>
                    </div>

                    <label className={styles.Description}><strong>Description:</strong></label>
                    {/*<p style={{fontSize: "12px", marginTop: "0px", marginBottom: "2px"}}>[Please try to be as specific as possible. Include any details you think may be relevant, such as troubleshooting steps you've taken.]</p>*/}
                    <textarea 
                        id="description" 
                        name="description"
                        rows="5" 
                        maxLength="1000"
                        style={{font: "inherit"}}
                        onChange={(event) => this.handleTextChange('description', event)}
                    />
                </form>
                <Button btnType="Danger" clicked={this.props.remove}>CANCEL</Button>
                <Button btnType="Success" clicked={this.handleSubmit}>SUBMIT</Button>
            </div>
        );
    }
    
}

const mapDispatchToProps = dispatch => {
    return {
        postTicket: (ticket, token) => dispatch (ticketActionCreators.postTicket(ticket, token))
    }
}

const mapStateToProps = state => {
    return {
        loading: state.tickets.postProcessLoading,
        userId: state.auth.userId,
        token: state.auth.token
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(CreateTicket, axios));