import React, { Component } from 'react'
import Request from '../../services/api'
import { Redirect } from 'react-router-dom'
const Converter = require('../../helpers/convertersHelper')

export class New extends Component {
    constructor() {
        super()
        this.state = {
                data: {
                }
            }
    }

    componentDidMount() {
        const id = this.props.match.params.id
        Request.getGeneralIssue(id)
            .then(res => {
                const data = res.data
                data.status = data.status === 'Open'? 'open' : 'closed'
                data.visibility = data.visibility === 'Public'? 'public' : 'private'
                data.start_date = Converter.formatDateForInput(data.start_date)
                this.setState({data: data})
                console.log(this.state)
            })
            .catch(err => {
                console.log(err)
            })
    }

    deleteItem(e) {
        Request.deleteGeneralIssue(this.state.data)
            .then(res => {
                this.setState({
                    success: true
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        if (this.state.success === true) return <Redirect to='/general_issues' />
        return (
            <div className="container-fluid">
                <div className="d-sm-flex align-items-center justify-content-between mb-4 mt-4">
                    <h1 className="h3 mb-0 text-gray-800">Show General Incident</h1>
                    <button id="delete_general_issue" className="btn btn-danger" 
                        onClick={(e) => { if (window.confirm('Are you sure you wish to delete this general issue?')) this.deleteItem(e) } }>
                        Delete
                    </button>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="id" className="font-weight-bold">Id:</label>
                                    {this.state.data ? this.state.data.id : ''}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="title" className="font-weight-bold">Title:</label>
                                    {this.state.data ? this.state.data.title : ''}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="description" className="font-weight-bold">Description:</label>
                                    {this.state.data ? this.state.data.description : ''}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="me_too" className="font-weight-bold">Me too:</label>
                                    {this.state.data ? this.state.data.me_too : ''}
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="startDate" className="font-weight-bold">Start date:</label>
                                    {this.state.data ? this.state.data.start_date : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="service" className="font-weight-bold">Service:</label>
                            {this.state.data ? this.state.data.service : ''}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="team" className="font-weight-bold">Team:</label>
                            {this.state.data ? this.state.data.team : ''}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="opened_by" className="font-weight-bold">Opened by:</label>
                            {this.state.data ? this.state.data.opened_by : ''}
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="status" className="font-weight-bold">Status: </label>
                    {this.state.data ? this.state.data.status : ''}
                </div>
                <div className="form-group">
                    <label htmlFor="visibility" className="font-weight-bold">Visibility: </label>
                    {this.state.data ? this.state.data.visibility : ''}
                </div>
            </div>
        )
    }
}

export default New