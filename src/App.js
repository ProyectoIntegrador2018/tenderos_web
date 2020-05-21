//Utils
import React from 'react'
import { Router, Route, Switch } from "react-router-dom"
import history from './helpers/history'

//Components
import Sidebar from './components/Sidebar'

//General issues
import ApprovedMailsIndex from './components/approved_mails'
import ApprovedMailsNew from './components/approved_mails/new'
import ApprovedMailsEdit from './components/approved_mails/edit'
import ApprovedMailsShow from './components/approved_mails/show'

//Style
import './App.css'

function App() {
  return (
    <Router history={history}>
      <Switch>
          <div className="App">
            <div id="wrapper">
              <Sidebar path={history.location.pathname}/>
              <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                  <Route exact path={`/approved_mails`} component={ApprovedMailsIndex} />
                  <Route exact path={`/approved_mails/new`} component={ApprovedMailsNew} />
                  <Route exact path={`/approved_mails/edit/:id`} component={ApprovedMailsEdit} />
                  <Route exact path={`/approved_mails/show/:id`} component={ApprovedMailsShow} />
                </div>
              </div>
            </div>
          </div>
      </Switch>
    </Router>
  )
}

export default App
