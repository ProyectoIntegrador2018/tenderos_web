//Utils
import React from 'react'
import { Switch } from "react-router-dom"
import history from './helpers/history'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { withAuthentication } from './components/Session';
import * as ROUTES from './constants/routes';
import { AuthUserContext } from './components/Session';

//Components
import Sidebar from './components/Sidebar'

//Sign-in
import SignInPage from './components/SignIn';

//General issues
import ApprovedMailsIndex from './components/approved_mails'
import ApprovedMailsNew from './components/approved_mails/new'
import ApprovedMailsEdit from './components/approved_mails/edit'
import ApprovedMailsShow from './components/approved_mails/show'

//Style
import './App.css'

const App = () => (
  <Router>
    <AuthUserContext.Consumer>
      {authUser => (
         authUser ?  <Switch>
         <div className="App">
            <div id="wrapper">
               <Sidebar path={history.location.pathname}/>
               <Route exact path={ROUTES.APPROVED_MAILS} component={ApprovedMailsIndex} />
               <Route exact path={ROUTES.APPROVED_MAILS_NEW} component={ApprovedMailsNew} />
               <Route exact path={ROUTES.APPROVED_MAILS_EDIT} component={ApprovedMailsEdit} />
               <Route exact path={ROUTES.APPROVED_MAILS_SHOW} component={ApprovedMailsShow} />
           </div>
         </div>
   </Switch> : <SignInPage />
      )}
    </AuthUserContext.Consumer>
    
  </Router>
);
 
export default withAuthentication(App);
