import React, { Component } from 'react'
import { faPlusCircle, faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Request from '../../services/api'
import { MDBDataTable } from 'mdbreact'
const Converter = require('../../helpers/convertersHelper')

export class Index extends Component {
    constructor() {
        super()
        this.state = {
            data: {
                rows: []
            }
        }
    }

    componentDidMount() {
        let data = {
            columns: [
                {
                    label: 'Id',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Title',
                    field: 'title',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Visibility',
                    field: 'visibility',
                    sort: 'asc'
                },
                {
                    label: 'Opened by',
                    field: 'opened_by',
                    sort: 'asc'
                },
                {
                    label: 'Start Date',
                    field: 'start_date',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                }],
            rows: []
        }
        Request.getGeneralIssues()
            .then(res => {
                const generalIssues = res.data
                data.rows = generalIssues.map(e => {
                    return {
                        id: e.id,
                        title: e.title,
                        status: e.status,
                        visibility: e.visibility,
                        opened_by: e.opened_by,
                        start_date: Converter.formatDateForInput(e.start_date),
                        actions: (
                            <div style={{ textAlign: "center" }}>
                                <a href={`/general_issues/edit/${e.id}`}>
                                    <button type="submit" className="btn btn-primary" style={{ marginLeft: "10px", marginTop: "10px", borderRadius: "20px" }}>
                                        <FontAwesomeIcon icon={faEdit} color={"white"} />
                                    </button>
                                </a>
                                <a href={`/general_issues/show/${e.id}`}>
                                    <button type="submit" style={{ marginLeft: "10px", marginTop: "10px", borderRadius: "20px" }} className="btn btn-primary">
                                        <FontAwesomeIcon icon={faEye} color={"white"} />
                                    </button>
                                </a>
                                <button id={e.id} className="btn btn-danger"   style={{ marginLeft: "10px", marginTop: "10px", borderRadius: "20px" }}
                                    onClick={(el) => { if (window.confirm('Are you sure you wish to delete this general issue?')) this.deleteItem(e) } }>
                                    <FontAwesomeIcon icon={faTrash} color={"white"} />
                                </button>
                            </div>
                        )
                    }
                })
                this.setState({ data })
            })
            .catch(err => {
                console.log(err)
            })
    }

    deleteItem(e) {
        Request.deleteGeneralIssue(e)
            .then(res => {
                window.location.reload()
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="d-sm-flex align-items-center justify-content-between mb-4 mt-4">
                    <h1 className="h3 mb-0 text-gray-800">General Issues</h1>
                    <a href="/general_issues/new" style={{ borderRadius: "20px" }} className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                        <FontAwesomeIcon icon={faPlusCircle} color={"white"} />
                    </a>
                </div>
                <div className="row">
                    <div className="col-xl-12 col-lg-7">
                        <div className="card shadow mb-4">
                            <div className="card-body">
                                {
                                    this.state.data.rows.length > 0 
                                    ? (<MDBDataTable striped order={['id', 'desc' ]} hover noBottomColumns responsive data={this.state.data} />)
                                    : (<div> There are no general issues yet! </div>)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Index