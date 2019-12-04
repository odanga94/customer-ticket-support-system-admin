import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'

import './assets/fonts/fonts.css';
import './App.css';
import Layout from './hoc/Layout/Layout';
import TicketSystem from './containers/TicketSystem/TicketSystem';
import FullTicket from './containers/FullTicket/FullTicket';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import authActionCreators from './store/actions/auth';


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
      routes = (
        <Switch>
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
          <Layout>
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
    isAuthenticated: state.auth.token !== null,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return{
    onTryAutoSignUp: () => dispatch(authActionCreators.authCheckState()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
