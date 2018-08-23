import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Input, Button, Icon } from 'antd';
import EditableTable from '../components/table/editable-table.component';
import SelectComponent from '../components/form/select.component';
import JobActivationForm from '../components/job-activation-form.component';

const CREATE_JOB = gql`
    mutation jobMutation($job: CreateJobType!) {
        createJob(input: $job) {
            name
        }
    }
`;

class CreateJobContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newJob: {
                version: '1',
                name: '',
                entrypoint: '',
                params: [],
                activation: {
                    type: '',
                    duration: ''
                },
                tasks: []
            }
        }
    }

    handleJobUpdate = (key, update) => {
        this.setState({
            newJob: {
                ...this.state.newJob,
                [key]: Array.isArray(update) ? [...update] : update
            }
        });
    }

    handleActivationUpdate = (key, update) => {
        this.setState({
            newJob: {
                ...this.state.newJob,
                activation: {
                    ...this.state.newJob.activation,
                    [key]: Array.isArray(update) ? [...update] : update
                }
            }
        });
    }

    onSubmit = (createJob) => {
        const newJob = Object.assign({}, this.state.newJob, {
            params: this.state.newJob.params.map(arg => {
                return {
                    name: arg.name,
                    value: arg.value
                };
            }),
            tasks: this.state.newJob.tasks.map(task => {
                return {
                    name: task.name,
                    onSuccess: task.onSuccess === 'END' ? '' : task.onSuccess,
                    onFailure: task.onFailure === 'END' ? '' : task.onFailure,
                    script: task.script
                };
            })
        });
        createJob({ variables: { job: newJob }});
    }

    render() {
        return (
            <Mutation mutation={CREATE_JOB}>
                {(createJob, { data }) => (
                    <React.Fragment>
                        <h2>Job Details</h2>
                        <hr style={{marginBottom: '15px'}}/>
                        <Input.Group size="large" style={{ marginBottom: 16 }}>
                            <Input name='name' onChange={(e) => this.handleJobUpdate(e.target.name, e.target.value)} addonBefore={<div style={{minWidth: "90px"}} >Name</div>}/>
                        </Input.Group>
                        <Input.Group size="large" style={{ marginBottom: 16 }}>
                            <SelectComponent label="Entrypoint" dataIndex="name" data={this.state.newJob.tasks.filter(task => task.name !== '')} onChange={(value) => this.handleJobUpdate('entrypoint', value)} />
                        </Input.Group>
                        <h2 style={{marginTop: "15px"}}>Activation</h2>
                        <hr style={{marginBottom: '15px'}}/>
                        <JobActivationForm activation={this.state.newJob.activation} onChange={this.handleActivationUpdate}/>
                        <h2 style={{marginTop: "15px"}}>Parameters</h2>
                        <hr style={{marginBottom: '15px'}}/>
                        <EditableTable
                            rowKey="name" 
                            columns={[
                                {
                                    title: 'Name',
                                    dataIndex: 'name',
                                    dataType: 'text',
                                    editable: true,
                                },
                                {
                                    title: 'Default value',
                                    dataIndex: 'value',
                                    dataType: 'text',
                                    editable: true,
                                }
                            ]} 
                            dataSource={this.state.newJob.params}
                            onTableUpdate={(update) => this.handleJobUpdate('params', update)}
                            scroll={{x: true}}
                        />
                        <h2 style={{marginTop: "15px"}}>Tasks</h2>
                        <hr style={{marginBottom: '15px'}}/>
                        <EditableTable
                            rowKey="name" 
                            columns={[
                                {
                                    title: 'Name',
                                    dataIndex: 'name',
                                    dataType: 'text',
                                    editable: true,
                                },
                                {
                                    title: 'On Success',
                                    dataIndex: 'onSuccess',
                                    dataType: 'select',
                                    selectOptions: [
                                        ...this.state.newJob.tasks.map(task => task.name),
                                        'END'
                                    ],
                                    editable: true,
                                },
                                {
                                    title: 'On Failure',
                                    dataIndex: 'onFailure',
                                    dataType: 'select',
                                    selectOptions: [
                                        ...this.state.newJob.tasks.map(task => task.name),
                                        'END'
                                    ],
                                    editable: true,
                                },
                                {
                                    title: 'Script',
                                    dataIndex: 'script',
                                    dataType: 'script',
                                    editable: true
                                }
                            ]} 
                            dataSource={this.state.newJob.tasks}
                            onTableUpdate={(update) => this.handleJobUpdate('tasks', update)}
                            scroll={{x: true}}
                        />
                        <hr style={{marginBottom: '15px', visibility: 'hidden'}}/>
                        <Button.Group style={{float: "right"}}>
                            <Button type="primary" onClick={() => this.props.history.push('/')}>
                                <Icon type="left" />Back
                            </Button>
                            <Button type="primary" onClick={() => this.onSubmit(createJob)}>
                                <Icon type="save" />Save
                            </Button>
                        </Button.Group>
                        <br style={{clear: "both"}} />
                    </React.Fragment>
                )}
            </Mutation>
        );
    }

}

export default CreateJobContainer;