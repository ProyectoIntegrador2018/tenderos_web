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

    componentDidMount() {
        const id = this.props.match.params.id
        var general_issues = Request.getGeneralIssue(id)
        var store_groups = Request.getStoreGroups()
        Promise.all([general_issues, store_groups])
            .then(([general_issue, groups]) => {
                var data = general_issue.data
                data.status = data.status === 'Open'? true : false
                data.visibility = data.visibility === 'Public'? true : false
                data.start_date = Converter.formatDateForInput(data.start_date)
                console.log(groups.data)
                this.setState(
                    {
                        data: data,
                        selectedValues: [],
                        options: [{name: "Everyone", id: -1}, ...groups.data]
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
            title: this.state.data.title,
            description: this.state.data.description,
            start_date:  moment(this.state.data.start_date, 'YYYY-MM-DD').unix() * 1000,
            service: this.state.data.service,
            team: this.state.data.team,
            opened_by: this.state.data.opened_by,
            notify_to: this.state.selectedValues.map(group => group.name),
            notify: this.state.data.notify === 'true' || this.state.data.notify === true,
            status: this.state.data.status === 'true' || this.state.data.status === true,
            visibility: this.state.data.visibility === 'true' || this.state.data.visibility === true
        }
        console.log(data)
        Request.putGeneralIssue(data)
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
                    <h1 className="h3 mb-0 text-gray-800">Edit General Incident</h1>
                </div>

                <div className="row">
                    <div className="col-sm-12">
                        <form id="edit-general-issues-form" onSubmit={this.handleSubmit}>
                            <div className="form-group col-md-9">
                                <label htmlFor="titleInput">Title</label>
                                <Input id="titleInput" type="input" onChange={this.handleChange("title")} autoComplete="off" required
                                    defaultValue={ this.state.data? this.state.data.title : '' } >
                                </Input>
                                <UncontrolledPopover trigger="focus" placement="bottom" target="titleInput">
                                    <PopoverHeader>Focus Trigger</PopoverHeader>
                                    <PopoverBody>Focusing on the trigging element makes this popover appear. Blurring (clicking away) makes it disappear. You cannot select this text as the popover will disappear when you try.</PopoverBody>
                                </UncontrolledPopover>
                            </div>
                            <div className="form-group col-md-9">
                                <label htmlFor="description">Description</label>
                                <Input id="description" type="textarea" onChange={this.handleChange("description")} autoComplete="off" required
                                     rows="3" defaultValue={ this.state.data? this.state.data.description : '' } >
                                </Input>
                                <UncontrolledPopover trigger="focus" placement="bottom" target="description">
                                    <PopoverHeader>Focus Trigger</PopoverHeader>
                                    <PopoverBody>Focusing on the trigging element makes this popover appear. Blurring (clicking away) makes it disappear. You cannot select this text as the popover will disappear when you try.</PopoverBody>
                                </UncontrolledPopover>
                            </div>
                            <div className="form-group col-md-9">
                                <label htmlFor="startDate">Start date</label>
                                <Input id="startDate" type="date" onChange={this.handleChange("start_date")} autoComplete="off" required
                                     rows="3" defaultValue={ this.state.data? this.state.data.start_date : '' } >
                                </Input>
                                <UncontrolledPopover trigger="focus" placement="bottom" target="startDate">
                                    <PopoverHeader>Focus Trigger</PopoverHeader>
                                    <PopoverBody>Focusing on the trigging element makes this popover appear. Blurring (clicking away) makes it disappear. You cannot select this text as the popover will disappear when you try.</PopoverBody>
                                </UncontrolledPopover>
                            </div>
                            <div className="form-group col-md-9">
                                <label htmlFor="service">Service</label>
                                <Input id="service" type="input" onChange={this.handleChange("service")} autoComplete="off" required
                                     rows="3" defaultValue={ this.state.data? this.state.data.service : '' } >
                                </Input>
                                <UncontrolledPopover trigger="focus" placement="bottom" target="service">
                                    <PopoverHeader>Focus Trigger</PopoverHeader>
                                    <PopoverBody>Focusing on the trigging element makes this popover appear. Blurring (clicking away) makes it disappear. You cannot select this text as the popover will disappear when you try.</PopoverBody>
                                </UncontrolledPopover>
                            </div>
                            <div className="form-group col-md-9">
                                <label htmlFor="team">Team</label>
                                <Input id="team" type="input" onChange={this.handleChange("team")} autoComplete="off" required
                                     rows="3" defaultValue={ this.state.data? this.state.data.team : '' } >
                                </Input>
                                <UncontrolledPopover trigger="focus" placement="bottom" target="team">
                                    <PopoverHeader>Focus Trigger</PopoverHeader>
                                    <PopoverBody>Focusing on the trigging element makes this popover appear. Blurring (clicking away) makes it disappear. You cannot select this text as the popover will disappear when you try.</PopoverBody>
                                </UncontrolledPopover>
                            </div>
                            <div className="form-group col-md-9">
                                <label htmlFor="opened_by">Opened by</label>
                                <Input id="opened_by" type="input" onChange={this.handleChange("opened_by")} autoComplete="off" required
                                     rows="3" defaultValue={ this.state.data? this.state.data.opened_by : '' } >
                                </Input>
                                <UncontrolledPopover trigger="focus" placement="bottom" target="opened_by">
                                    <PopoverHeader>Focus Trigger</PopoverHeader>
                                    <PopoverBody>Focusing on the trigging element makes this popover appear. Blurring (clicking away) makes it disappear. You cannot select this text as the popover will disappear when you try.</PopoverBody>
                                </UncontrolledPopover>
                            </div>
                            <div className="form-group col-md-9">
                                {this.state.options?
                                    <Row id="notify" className="form-group col-md-12" >
                                        <label>Notify: </label>
                                        <Multiselect
                                            options={this.state.options} // Options to display in the dropdown
                                            onSelect={this.onSelect} // Function will trigger on select event
                                            onRemove={this.onRemove} // Function will trigger on remove event
                                            displayValue="name" // Property name to display in the dropdown options
                                        />
                                        <UncontrolledPopover trigger="focus" placement="top" target="notify">
                                            <PopoverHeader>Focus Trigger</PopoverHeader>
                                            <PopoverBody>Focusing on the trigging element makes this popover appear. Blurring (clicking away) makes it disappear. You cannot select this text as the popover will disappear when you try.</PopoverBody>
                                        </UncontrolledPopover>
                                    </Row>
                                    : ''
                                }
                            </div>
                            <div className="form-group col-md-9">
                                <label>Status: </label>
                                <br></br>
                                <Input className="select-long-term"
                                    type="select"
                                    name="Status"
                                    onChange={this.handleChange('status')}
                                    value={this.state.data.status}
                                    id="status">
                                    <option value={true}>Open</option>
                                    <option value={false}>Closed</option>
                                </Input>
                                <UncontrolledPopover trigger="focus" placement="top" target="status">
                                    <PopoverHeader>Focus Trigger</PopoverHeader>
                                    <PopoverBody>Focusing on the trigging element makes this popover appear. Blurring (clicking away) makes it disappear. You cannot select this text as the popover will disappear when you try.</PopoverBody>
                                </UncontrolledPopover>
                            </div>
                            <div className="form-group col-md-9">
                                <label>Visibility: </label>
                                <br></br>
                                <Input className="select-long-term"
                                    type="select"
                                    name="Visibility"
                                    onChange={this.handleChange('visibility')}
                                    value={this.state.data.visibility}
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
                                <div className="col" style={{ marginBottom: "20px" }}>
                                    <input type="hidden" id="id_general_issue" name="id_general_issue" value="valor"></input>
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