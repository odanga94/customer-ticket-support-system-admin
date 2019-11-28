import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'

import './assets/fonts/fonts.css';
import './App.css';
import Layout from './hoc/Layout/Layout';
import TicketSystem from './containers/TicketSystem/TicketSystem';
import FullTicket from './containers/FullTicket/FullTicket';
import ProfileData from './containers/ProfileData/ProfileData';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import ticketActionCreators from './store/actions/tickets';
import authActionCreators from './store/actions/auth';
import profileActionCreators from './store/actions/profile';


class App extends React.Component{
  componentDidMount(){
    this.props.onTryAutoSignUp()
  }
  render(){
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth}/>
        <Redirect to="/auth"/>
      </Switch>
    )

    if (this.props.isAuthenticated){
      this.props.fetchProfile(this.props.token, this.props.userId);
      routes = (
        <Switch>
          <Route path='/my-account' component={ProfileData}/>
          <Route path ='/auth' component={Auth}/>
          <Route path="/logout" component={Logout}/>
          <Route exact path = '/:ticketId' component={FullTicket}/>
          <Route exact path = '/' component={TicketSystem}/>
          <Redirect to="/"/>
        </Switch>
      )
    }
    return(
      <BrowserRouter>
        <div className="App">
          <Layout 
            showAddTicketForm={this.props.isAuthenticated && this.props.createTicket} 
            removeTicket={this.props.removeTicketHandler}
          > 
             {this.props.posted ? <Redirect to="/"/> : null}
            {routes}
          </Layout>
        </div>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = state => {
  return {
    createTicket: state.tickets.createTicket,
    posted: state.tickets.posted,
    isAuthenticated: state.auth.token !== null,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return{
    removeTicketHandler: () => dispatch(ticketActionCreators.removeTicket()),
    onTryAutoSignUp: () => dispatch(authActionCreators.authCheckState()),
    fetchProfile: (token, userId) => dispatch(profileActionCreators.fetchProfile(token, userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
