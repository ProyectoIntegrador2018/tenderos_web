//Utils
import React from 'react'
import { Switch } from "react-router-dom"
import history from './helpers/history'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { withAuthentication } from './components/Session';
import * as ROUTES from './constants/routes';
import { AuthUserContext } from './components/Session';
import { Sidebar, SidebarItem } from 'react-responsive-sidebar';
import { FaHome, FaRegCheckCircle } from 'react-icons/fa';

//Components
import Sidebars from './components/Sidebar'
import SignOutButton from './components/SignOut'

//Pages
import SignInPage from './components/SignIn';
import PageNotFound from './components/PageNotFound';
import HomePage from './components/Home'

//General issues
import ApprovedMailsIndex from './components/approved_mails'
import ApprovedMailsNew from './components/approved_mails/new'
import ApprovedMailsEdit from './components/approved_mails/edit'
import ApprovedMailsShow from './components/approved_mails/show'


//Style
import './App.css'

const items = [
  <SidebarItem href={ROUTES.HOME} leftIcon={<FaHome/>}> Inicio</SidebarItem>,
  <SidebarItem href={ROUTES.APPROVED_MAILS} leftIcon={<FaRegCheckCircle/> }>Correos Aprovados</SidebarItem>,
    <div className="text-center d-none d-md-inline mb-3" style={{margin:"1em"}}> <SignOutButton /></div>,
];



const App = () => (

    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>

);

const NavigationAuth = () => (
 <Sidebar content={items} background="#0082C3" width="250px">
      <Router>
        <Switch>
              <Route exact path="/" component={HomePage} />
                <Route exact path={ROUTES.HOME} component={HomePage} />
               <Route exact path={ROUTES.APPROVED_MAILS} component={ApprovedMailsIndex} />
               <Route exact path={ROUTES.APPROVED_MAILS_NEW} component={ApprovedMailsNew} />
               <Route exact path={ROUTES.APPROVED_MAILS_EDIT} component={ApprovedMailsEdit} />
               <Route exact path={ROUTES.APPROVED_MAILS_SHOW} component={ApprovedMailsShow} />
                <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
                <Route path="*" component={PageNotFound} />
        </Switch> 
    </Router>
  </Sidebar>

);

const NavigationNonAuth = () => (
      <Router>
        <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path={ROUTES.HOME} component={HomePage} />
               <Route exact path={ROUTES.APPROVED_MAILS} component={ApprovedMailsIndex} />
               <Route exact path={ROUTES.APPROVED_MAILS_NEW} component={ApprovedMailsNew} />
               <Route exact path={ROUTES.APPROVED_MAILS_EDIT} component={ApprovedMailsEdit} />
               <Route exact path={ROUTES.APPROVED_MAILS_SHOW} component={ApprovedMailsShow} />
                <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
                <Route path="*" component={PageNotFound} />
        </Switch> 
    </Router>

);


export default withAuthentication(App);

