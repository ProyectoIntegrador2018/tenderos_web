import React, { Component } from 'react';
import $ from 'jquery'

//Font Awesome Icons
import { faRadiation, faTachometerAlt, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SignOutButton from '../components/SignOut'
import { AuthUserContext, withAuthorization } from './Session';

export class Sidebar extends Component {
    
    render() {
        return (
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                <div className="sidebar-heading  mt-4">
                    Dashboard
                </div>

                <li className={"nav-item ${this.state.highlight_dashboard}"}>
                    <a className="nav-link" href="/">
                        <i style={{ fontSize: "1.5em" }} className="navbar-icons">
                            <FontAwesomeIcon icon={faTachometerAlt} />
                        </i>
                        <span>Dashboard tenderos</span>
                    </a>
                </li>

                <li className={"nav-item ${this.state.highlight_approved_mails}"}>
                    <a className="nav-link" href="/approved_mails">
                        <i style={{ fontSize: "1.5em" }} className="navbar-icons">
                            <FontAwesomeIcon icon={faRadiation} />
                        </i>
                        <span>Approved Mails</span>
                    </a>
                </li>
                <hr className="sidebar-divider"></hr>

                <div className="text-center d-none d-md-inline mb-3">
                    <SignOutButton />
                </div>
                <div className="text-center d-none d-md-inline">
                    <button className="rounded-circle border-0" id="sidebarToggle">
                        <FontAwesomeIcon icon={faAngleLeft} color={"#b7b9cc"} />
                    </button>
                </div>
            </ul>
        )
    }
}


const condition = authUser => !!authUser;
export default withAuthorization(condition)(Sidebar);