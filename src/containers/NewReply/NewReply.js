import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-global';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import ticketActionCreators from '../../store/actions/tickets';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';
import './NewReply.css';

class NewReply extends Component {
    state = {
        title: '',
        content: ''
    }

    componentDidMount(){
        console.log(this.props);
    }

    addReplyHandler = () => {
        const dateObject = this.getFormattedDate();
        const reply = {
            author: "Admin",
            body: this.state.content,
            title: this.state.title,
            isAdmin: true,
            ...dateObject
        }
        this.props.addReply(reply, this.props.token, this.props.ticketId);
        this.setState({
            title: '',
            content: ''
        });
    }

    formatTime = (value) => {
        if(value < 10){
          value = "0" + value
        }
        //console.log('new value', value);
        return value
      }

    getFormattedDate = () => {
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
        return {
            dateCreated: dateStr,
            timestamp
        }
    }


    render () {
        return (
            this.props.addReplyLoading ? <Spinner/> :
            <div className="NewReply">
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                {
                    /*<label>Author</label>
                        <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                            <option value="Max">Max</option>
                            <option value="Manu">Manu</option>
                            <option value="Odanga">Odanga</option>
                        </select>
                    */
                }
                <div className="BtnContainer">
                    <Button btnType="Save" clicked={() => { this.addReplyHandler() }} >ADD REPLY</Button>
                    <Button btnType="Edit" clicked={() => { this.props.openDialog() }} >FINALIZE TICKET</Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        addReplyLoading: state.tickets.addReplyLoading,
        token: state.auth.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addReply: (reply, token, ticketId) => dispatch(ticketActionCreators.addReply(reply, token ,ticketId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(NewReply, axios));