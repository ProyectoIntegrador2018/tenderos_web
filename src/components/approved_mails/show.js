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
        Request.getApprovedMail(id)
            .then(approved_mail_obj => {
                var approved_mail = approved_mail_obj.data()
                var data = {}
                data.mail = approved_mail.mail
                data.id = approved_mail_obj.id
                this.setState({data: data})
            })
            .catch(err => {
                console.log(err)
            })
    }

    deleteItem(e) {
        Request.deleteApprovedMail(this.state.data)
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
        if (this.state.success === true) return <Redirect to='/approved_mails' />
        return (
            <div className="container-fluid">
                <div className="d-sm-flex align-items-center justify-content-between mb-4 mt-4">
                    <h1 className="h3 mb-0 text-gray-800">Show Approved Mail</h1>
                    <button id="delete_approved_mail" className="btn btn-danger" 
                        onClick={(e) => { if (window.confirm('Are you sure you wish to delete this mail?')) this.deleteItem(e) } }>
                        Delete
                    </button>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="mail" className="font-weight-bold">Mail: </label>
                                    {this.state.data ? this.state.data.mail : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default New