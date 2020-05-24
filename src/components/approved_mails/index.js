import React, { Component } from 'react'
import { faPlusCircle, faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Request from '../../services/api'
import { MDBDataTable } from 'mdbreact'
import { AuthUserContext, withAuthorization } from '../Session';

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
                    label: 'Mail',
                    field: 'mail',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                }],
            rows: []
        }
        Request.getApprovedMails()
            .then(approvedMails => {
                var rows = []
                approvedMails.forEach(mail_obj => {
                    var mail = mail_obj.data()
                    console.log(mail.mail)
                    rows.push(
                        {
                            mail: mail.mail,
                            actions: (
                                <div style={{ textAlign: "center" }}>
                                    <a href={`/approved_mails/edit/${mail_obj.id}`}>
                                        <button type="submit" className="btn btn-primary" style={{ marginLeft: "10px", marginTop: "10px", borderRadius: "20px" }}>
                                            <FontAwesomeIcon icon={faEdit} color={"white"} />
                                        </button>
                                    </a>
                                    <a href={`/approved_mails/show/${mail_obj.id}`}>
                                        <button type="submit" style={{ marginLeft: "10px", marginTop: "10px", borderRadius: "20px" }} className="btn btn-primary">
                                            <FontAwesomeIcon icon={faEye} color={"white"} />
                                        </button>
                                    </a>
                                    <button id={mail_obj.id} className="btn btn-danger"   style={{ marginLeft: "10px", marginTop: "10px", borderRadius: "20px" }}
                                        onClick={(el) => { if (window.confirm('Are you sure you wish to delete this mail?')) this.deleteItem(mail_obj.id) } }>
                                        <FontAwesomeIcon icon={faTrash} color={"white"} />
                                    </button>
                                </div>
                            )
                        }
                    )
                })
                data.rows = rows
                this.setState({ data })
            })
            .catch(err => {
                console.log(err)
            })
    }

    deleteItem(e) {
        var data = {}
        data.id = e
        Request.deleteApprovedMail(data)
            .then(res => {
                window.location.reload()
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <AuthUserContext.Consumer>
                {authUser => (
                  <div className="container-fluid">
                    <div className="d-sm-flex align-items-center justify-content-between mb-4 mt-4">
                      <h1 className="h3 mb-0 text-gray-800">Approved mails</h1>
                      <a href="/approved_mails/new" style={{ borderRadius: "20px" }} className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
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
                )}
            </AuthUserContext.Consumer>
            
        )
    }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Index);
