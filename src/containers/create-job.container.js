import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Input, Button, Icon } from 'antd';
import EditableTable from '../components/table/editable-table.component';
import SelectComponent from '../components/form/select.component';

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
                activation: {
                    type: '',
                    duration: '',
                    args: []
                },
                args: [],
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
            args: this.state.newJob.args.map(arg => {
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
                        <h1>New Job</h1>
                        <hr style={{marginBottom: '15px'}}/>
                        <Input.Group size="large" style={{ marginBottom: 16 }}>
                            <Input name='name' onChange={(e) => this.handleJobUpdate(e.target.name, e.target.value)} addonBefore={<div style={{minWidth: "90px"}} >Name</div>}/>
                        </Input.Group>
                        <Input.Group size="large" style={{ marginBottom: 16 }}>
                            <SelectComponent label="Entrypoint" dataIndex="name" data={this.state.newJob.tasks.filter(task => task.name !== '')} onChange={(value) => this.handleJobUpdate('entrypoint', value)} />
                        </Input.Group>
                        <h1>Activation</h1>
                        <hr style={{marginBottom: '15px'}}/>
                        <Input.Group size="large" style={{ marginBottom: 16 }}>
                            <SelectComponent label="Type" data={['local', 'remote']} onChange={(value) => this.handleActivationUpdate('type', value)} />
                        </Input.Group>
                        <Input.Group size="large" style={{ marginBottom: 16 }}>
                            <Input name='duration' onChange={(e) => this.handleActivationUpdate(e.target.name, e.target.value)} addonBefore={<div style={{minWidth: "90px"}}>Duration</div>}/>
                        </Input.Group>
                        <h2>Remote Arguments</h2>
                        <hr style={{marginBottom: '15px'}}/>
                        <EditableTable
                            rowKey="name" 
                            columns={[
                                {
                                    title: 'Name',
                                    dataIndex: 'name',
                                    dataType: 'text',
                                    editable: true,
                                }
                            ]} 
                            dataSource={this.state.newJob.activation.args}
                            onTableUpdate={(update) => this.handleActivationUpdate('args', update)}
                            scroll={{x: true}}
                        />
                        <h2>Constants</h2>
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
                                    title: 'Value',
                                    dataIndex: 'value',
                                    dataType: 'text',
                                    editable: true,
                                }
                            ]} 
                            dataSource={this.state.newJob.args}
                            onTableUpdate={(update) => this.handleJobUpdate('args', update)}
                            scroll={{x: true}}
                        />
                        <h1>Tasks</h1>
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