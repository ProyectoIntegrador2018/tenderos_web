import React, { Component } from 'react'
import Request from '../../services/api'
import { Redirect } from 'react-router-dom'
import { Multiselect } from 'multiselect-react-dropdown'
import { Input, Row, UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap'
const moment = require('moment')

export class New extends Component {
    constructor() {
        super()
        this.onSelect = this.onSelect.bind(this)
        this.onRemove = this.onRemove.bind(this)
        this.goBack = this.goBack.bind(this)

        this.state = {
            data: {
                id: '',
                title: '',
                description: '',
                start_date: '',
                service: '',
                team: '',
                opened_by: '',
                notify: false,
                status: true,
                visibility: false
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
        window.location = '/general_issues'
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
            title: this.state.data.title,
            description: this.state.data.description,
            start_date:  moment(this.state.data.start_date, 'YYYY-MM-DD').unix() * 1000,
            service: this.state.data.service,
            team: this.state.data.team,
            opened_by: this.state.data.opened_by,
            notify_to: this.state.selectedValues.map(group => group.name),
            status: this.state.data.status === 'true' || this.state.data.status === true,
            visibility: this.state.data.visibility === 'true' || this.state.data.visibility === true
        }
        console.log(data)
        Request.postGeneralIssue(data)
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
        Request.getStoreGroups()
        .then(groups => {
            this.setState(
                {
                    data: this.state.data,
                    selectedValues: [],
                    options: [{name: "Everyone", id: -1}, ...groups.data]
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
                    <h1 className="h3 mb-0 text-gray-800">New General Incident</h1>
                </div>

                <div className="row">
                    <div className="col-sm-12">
                        <form id="general-issues-form" onSubmit={this.handleSubmit}>
                            <div className="form-group col-md-6">
                                <label htmlFor="id">Id</label>
                                <Input type="id" id="id" autoComplete="off" onChange={this.handleChange("id")} required>
                                </Input>
                                <UncontrolledPopover trigger="focus" placement="bottom" target="id">
                                    <PopoverHeader>Focus Trigger</PopoverHeader>
                                    <PopoverBody>Focusing on the trigging element makes this popover appear. Blurring (clicking away) makes it disappear. You cannot select this text as the popover will disappear when you try.</PopoverBody>
                                </UncontrolledPopover>
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="titleInput">Title</label>
                                <Input type="titleInput" id="titleInput" autoComplete="off" 
                                    onChange={this.handleChange("title")} required>
                                </Input>
                                <UncontrolledPopover trigger="focus" placement="bottom" target="titleInput">
                                    <PopoverHeader>Focus Trigger</PopoverHeader>
                                    <PopoverBody>Focusing on the trigging element makes this popover appear. Blurring (clicking away) makes it disappear. You cannot select this text as the popover will disappear when you try.</PopoverBody>
                                </UncontrolledPopover>
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="description">Description</label>
                                <Input id="description" rows="3" type="textarea" onChange={this.handleChange("description")} required>
                                </Input>
                                <UncontrolledPopover trigger="focus" placement="bottom" target="description">
                                    <PopoverHeader>Focus Trigger</PopoverHeader>
                                    <PopoverBody>Focusing on the trigging element makes this popover appear. Blurring (clicking away) makes it disappear. You cannot select this text as the popover will disappear when you try.</PopoverBody>
                                </UncontrolledPopover>
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="startDate">Start date</label>
                                <Input type="date" id="startDate" onChange={this.handleChange("start_date")} required>
                                </Input>
                                <UncontrolledPopover trigger="focus" placement="top" target="startDate">
                                    <PopoverHeader>Focus Trigger</PopoverHeader>
                                    <PopoverBody>Focusing on the trigging element makes this popover appear. Blurring (clicking away) makes it disappear. You cannot select this text as the popover will disappear when you try.</PopoverBody>
                                </UncontrolledPopover>
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="service">Service</label>
                                <Input type="service" id="service"  autoComplete="off" onChange={this.handleChange("service")} required>
                                </Input>
                                <UncontrolledPopover trigger="focus" placement="top" target="service">
                                    <PopoverHeader>Focus Trigger</PopoverHeader>
                                    <PopoverBody>Focusing on the trigging element makes this popover appear. Blurring (clicking away) makes it disappear. You cannot select this text as the popover will disappear when you try.</PopoverBody>
                                </UncontrolledPopover>
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="team">Team</label>
                                <Input type="team" id="team" autoComplete="off" onChange={this.handleChange("team")} required>
                                </Input>
                                <UncontrolledPopover trigger="focus" placement="top" target="team">
                                    <PopoverHeader>Focus Trigger</PopoverHeader>
                                    <PopoverBody>Focusing on the trigging element makes this popover appear. Blurring (clicking away) makes it disappear. You cannot select this text as the popover will disappear when you try.</PopoverBody>
                                </UncontrolledPopover>
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="opened_by">Opened by</label>
                                <Input type="opened_by" autoComplete="off" id="opened_by" 
                                    onChange={this.handleChange("opened_by")} required>
                                </Input>
                                <UncontrolledPopover trigger="focus" placement="top" target="opened_by">
                                    <PopoverHeader>Focus Trigger</PopoverHeader>
                                    <PopoverBody>Focusing on the trigging element makes this popover appear. Blurring (clicking away) makes it disappear. You cannot select this text as the popover will disappear when you try.</PopoverBody>
                                </UncontrolledPopover>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Notify: </label>
                                {this.state.options?
                                    <Row id="notify" className="form-group col-md-12" >
                                        <Multiselect
                                        options={this.state.options} // Options to display in the dropbottom
                                        onSelect={this.onSelect} // Function will trigger on select event
                                        onRemove={this.onRemove} // Function will trigger on remove event
                                        displayValue="name" // Property name to display in the dropbottom options
                                        />
                                        <UncontrolledPopover trigger="focus" placement="top" target="notify">
                                            <PopoverHeader>Focus Trigger</PopoverHeader>
                                            <PopoverBody>Focusing on the trigging element makes this popover appear. Blurring (clicking away) makes it disappear. You cannot select this text as the popover will disappear when you try.</PopoverBody>
                                        </UncontrolledPopover>
                                    </Row>
                                    : ''
                                }
                            </div>
                            <div className="form-group col-md-6">
                                <label>Status: </label>
                                <br></br>
                                <Input className="select-long-term"
                                    type="select"
                                    name="Status"
                                    onChange={this.handleChange('status')}
                                    id="status">
                                    <option value={true}>Open</option>
                                    <option value={false}>Closed</option>
                                </Input>
                                <UncontrolledPopover trigger="focus" placement="top" target="status">
                                    <PopoverHeader>Focus Trigger</PopoverHeader>
                                    <PopoverBody>Focusing on the trigging element makes this popover appear. Blurring (clicking away) makes it disappear. You cannot select this text as the popover will disappear when you try.</PopoverBody>
                                </UncontrolledPopover>
                            </div>

                            <div className="form-group col-md-6">
                                <label>Visibility: </label>
                                <br></br>
                                <Input className="select-long-term"
                                    type="select"
                                    name="Visibility"
                                    onChange={this.handleChange('visibility')}
                                    id="visibility">
                                    <option value={false}>Private</option>
                                    <option value={true}>Public</option>
                                </Input>
                                <UncontrolledPopover trigger="focus" placement="top" target="visibility">
                                    <PopoverHeader>Focus Trigger</PopoverHeader>
                                    <PopoverBody>Focusing on the trigging element makes this popover appear. Blurring (clicking away) makes it disappear. You cannot select this text as the popover will disappear when you try.</PopoverBody>
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