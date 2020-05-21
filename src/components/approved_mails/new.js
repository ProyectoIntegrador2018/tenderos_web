import React, { Component } from 'react'
import Request from '../../services/api'
import { Redirect } from 'react-router-dom'
import { Input, UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap'

export class New extends Component {
    constructor() {
        super()
        this.onSelect = this.onSelect.bind(this)
        this.onRemove = this.onRemove.bind(this)
        this.goBack = this.goBack.bind(this)

        this.state = {
            data: {
                id: '',
                mail: ''
            }
        }
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

    handleSubmit = event => {
        event.preventDefault()
        const data = {
            id: this.state.data.id,
            mail: this.state.data.mail
        }
        console.log(data)
        Request.postApprovedMail(data)
            .then(res => {
                this.setState({
                    success: true
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    componentDidMount() {

    }

    render() {
        if (this.state.success === true) return <Redirect to='/approved_mails' />
        return (
            <div className="container-fluid">
                <div className="d-sm-flex align-items-center justify-content-between mb-4 mt-4">
                    <h1 className="h3 mb-0 text-gray-800">New Approved Mail</h1>
                </div>

                <div className="row">
                    <div className="col-sm-12">
                        <form id="approved-mail-form" onSubmit={this.handleSubmit}>
                            <div className="form-group col-md-6">
                                <label htmlFor="mailInput">Mail</label>
                                <Input type="mailInput" id="mailInput" autoComplete="off" 
                                    onChange={this.handleChange("mail")} required>
                                </Input>
                                <UncontrolledPopover trigger="focus" placement="bottom" target="mailInput">
                                    <PopoverHeader>Mail</PopoverHeader>
                                    <PopoverBody>Insert the new mail</PopoverBody>
                                </UncontrolledPopover>
                            </div>
                            <div className="row">
                                <div className="col" style={{marginBottom: "20px"}}>
                                    <button type="submit" style={{float: "right"}} className="btn btn-primary">Submit</button>
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

export default New