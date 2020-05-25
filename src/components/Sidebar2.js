import React, { Component } from 'react';
import $ from 'jquery'

//Font Awesome Icons
import { faRadiation, faTachometerAlt, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SignOutButton from '../components/SignOut'
export class Sidebar extends Component {
    constructor() {
        super()
        this.updateHighlight = this.updateHighlight.bind(this)

        this.state = {
            highlight_dashboard: "",
            highlight_approved_mails: "",
            highlight_alert: "",
            highlight_feedback: "",
            highlight_store_group: ""
        }
    }

    updateHighlight() {
        const path = this.props.path.split('/')
        const highlights = {
            highlight_dashboard: "",
            highlight_approved_mails: ""
        }
        switch (path[1]) {
            case 'approved_mails':
                highlights.highlight_approved_mails = "active"
                break;
            default:
                highlights.highlight_dashboard = "active"
        }
        this.setState(
            highlights
        )
    }

    componentDidMount() {
        // Toggle the side navigation
        $("#sidebarToggle, #sidebarToggleTop").on('click', function (e) {
            $("#sidebarToggle").toggleClass('flip');
            $("body").toggleClass("sidebar-toggled");
            $(".sidebar").toggleClass("toggled");
            if ($(".sidebar").hasClass("toggled")) {
                $('.sidebar .collapse').removeClass('collapse');
            };
        });
        this.updateHighlight()
    }
    render() {
        return (
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                <div className="sidebar-heading  mt-4">
                    Dashboard
                </div>

                <li className={`nav-item ${this.state.highlight_dashboard}`}>
                    <a className="nav-link" href="/">
                        <i style={{ fontSize: "1.5em" }} className="navbar-icons">
                            <FontAwesomeIcon icon={faTachometerAlt} />
                        </i>
                        <span>Dashboard tenderos</span>
                    </a>
                </li>

                <li className={`nav-item ${this.state.highlight_approved_mails}`}>
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

export default Sidebar