import React, { Component } from 'react'
import Request from '../../services/api'
import { Redirect } from 'react-router-dom'
import { Multiselect } from 'multiselect-react-dropdown'
import { Input, Row, UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap'
const Converter = require('../../helpers/convertersHelper')
const moment = require('moment')

export class Edit extends Component {
    constructor() {
        super()
        this.onSelect = this.onSelect.bind(this)
        this.onRemove = this.onRemove.bind(this)
        this.goBack = this.goBack.bind(this)

        this.state = {
                data: {
                    notify: false
                }
            }
    }

    _onFocus(el) {
        el.popover();

        console.log(el)
    }

    onSelect(optionsList, selectedItem) {
        if(selectedItem.name === 'Everyone') {
            console.log(selectedItem)
            this.setState(
                {
                    data: this.state.data,
                    options: this.state.options,
                    selectedValues: [selectedItem]
                })
        } else {
            this.setState(
                {
                    data: this.state.data,
                    options: this.state.options,
                    selectedValues: optionsList
                })
        }
    }
    
    onRemove(optionList, removedItem) {
        this.setState(
            {
                data: this.state.data,
                options: this.state.options,
                selectedValues: optionList
            })
    }

    goBack(e) {
        window.location = '/approved_mails'
    }

    handleChange(key) {
        return event => {
            var data = this.state.data
            data[key] = event.target.value
            this.setState({ data: data })
            console.log(this.state)
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id
        Request.getApprovedMail(id)
            .then(approved_mail_obj => {
                var approved_mail = approved_mail_obj.data()
                var data = {}
                data.mail = approved_mail.mail
                this.setState(
                    {
                        data: data,
                        selectedValues: []
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleSubmit = event => {
        event.preventDefault()
        const id = this.props.match.params.id
        const data = {
            id: id,
            mail: this.state.data.mail,
        }
        console.log(data)
        Request.putApprovedMail(data)
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
                    <h1 className="h3 mb-0 text-gray-800">Edit Approved Mail</h1>
                </div>

                <div className="row">
                    <div className="col-sm-12">
                        <form id="edit-approved-mails-form" onSubmit={this.handleSubmit}>
                            <div className="form-group col-md-9">
                                <label htmlFor="mailInput">Mail</label>
                                <Input id="mailInput" type="input" onChange={this.handleChange("mail")} autoComplete="off" required
                                    defaultValue={ this.state.data? this.state.data.mail : '' } >
                                </Input>
                                <UncontrolledPopover trigger="focus" placement="bottom" target="mailInput">
                                    <PopoverHeader>Mail</PopoverHeader>
                                    <PopoverBody>Insert the new mail</PopoverBody>
                                </UncontrolledPopover>
                            </div>
                            <div className="row">
                                <div className="col" style={{ marginBottom: "20px" }}>
                                    <input type="hidden" id="id_approved_mails" name="id_approved_mail" value="valor"></input>
                                    <button type="submit" style={{ float: "right" }} className="btn btn-primary">Submit</button>
                                    <button type="button" className="btn btn-danger" style={{ float: "right", marginRight:"20px" }} 
                                        onClick={(el) => {if (window.confirm('Are you sure you wish to go back without saving?')) this.goBack(el)} } >Cancel</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Edit