//Utils
import React from 'react'
import { Router, Route, Switch } from "react-router-dom"
import history from './helpers/history'

//Components
import Sidebar from './components/Sidebar'

//General issues
import GeneralIssuesIndex from './components/GenaralIssues/Index'
import GeneralIssuesNew from './components/GenaralIssues/New'
import GeneralIssuesEdit from './components/GenaralIssues/Edit'
import GeneralIssuesShow from './components/GenaralIssues/Show'

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
                  <Route exact path={`/general_issues`} component={GeneralIssuesIndex} />
                  <Route exact path={`/general_issues/new`} component={GeneralIssuesNew} />
                  <Route exact path={`/general_issues/edit/:id`} component={GeneralIssuesEdit} />
                  <Route exact path={`/general_issues/show/:id`} component={GeneralIssuesShow} />
                </div>
              </div>
            </div>
          </div>
      </Switch>
    </Router>
  )
}

export default App
