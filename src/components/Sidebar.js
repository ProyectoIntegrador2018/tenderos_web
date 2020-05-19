import React, { Component } from 'react';
import $ from 'jquery'

//Font Awesome Icons
import { faRadiation, faTachometerAlt, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class Sidebar extends Component {
    constructor() {
        super()
        this.updateHighlight = this.updateHighlight.bind(this)

        this.state = {
            highlight_dashboard: "",
            highlight_general_issue: "",
            highlight_alert: "",
            highlight_feedback: "",
            highlight_store_group: ""
        }
    }

    updateHighlight() {
        const path = this.props.path.split('/')
        const highlights = {
            highlight_dashboard: "",
            highlight_general_issue: "",
            highlight_alert: "",
            highlight_feedback: "",
            highlight_store_group: ""
        }
        switch (path[1]) {
            case 'general_issues':
                highlights.highlight_general_issue = "active"
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
                <hr className="sidebar-divider my-0"></hr>

                <li className={`nav-item ${this.state.highlight_dashboard}`}>
                    <a className="nav-link" href="/">
                        <i style={{ fontSize: "1.5em" }} className="navbar-icons">
                            <FontAwesomeIcon icon={faTachometerAlt} />
                        </i>
                        <span>Dashboard tenderos</span>
                    </a>
                </li>

                <hr className="sidebar-divider"></hr>

                <div className="sidebar-heading">
                    Interface
                </div>

                <li className={`nav-item ${this.state.highlight_general_issue}`}>
                    <a className="nav-link" href="/general_issues">
                        <i style={{ fontSize: "1.5em" }} className="navbar-icons">
                            <FontAwesomeIcon icon={faRadiation} />
                        </i>
                        <span>General Incidents</span>
                    </a>
                </li>
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