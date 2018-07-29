import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Spin, Alert, Input, Button, Icon, Table } from 'antd';
import {Controlled as CodeMirror} from 'react-codemirror2';
import EditableTable from '../components/table/editable-table.component';
require('codemirror/mode/javascript/javascript');

class CreateJobContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newJob: {
                version: '1',
                name: '',
                entrypoint: '',
                duration: '',
                args: [],
                tasks: []
            }
        }
    }

    handleTableUpdate = (key, update) => {
        this.setState({
            newJob: {
                ...this.state.newJob,
                [key]: [...update]
            }
        });
    }

    render() {
        return (
            <React.Fragment>
                <h1>Create new Job</h1>
                <hr style={{marginBottom: '15px'}}/>
                <Input.Group size="large" style={{ marginBottom: 16 }}>
                    <Input addonBefore={<div style={{minWidth: "90px"}}>Name</div>}/>
                </Input.Group>
                <Input.Group size="large" style={{ marginBottom: 16 }}>
                    <Input addonBefore={<div style={{minWidth: "90px"}}>Entrypoint</div>}/>
                </Input.Group>
                <Input.Group size="large" style={{ marginBottom: 16 }}>
                    <Input addonBefore={<div style={{minWidth: "90px"}}>Duration</div>}/>
                </Input.Group>
                <h2>Arguments</h2>
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
                    onTableUpdate={(update) => this.handleTableUpdate('args', update)}
                    scroll={{x: true}}
                />
                <h2>Jobs</h2>
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
                                'END'
                            ],
                            editable: true,
                        },
                        {
                            title: 'On Failure',
                            dataIndex: 'onFailure',
                            dataType: 'select',
                            selectOptions: [
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
                    onTableUpdate={(update) => this.handleTableUpdate('tasks', update)}
                    scroll={{x: true}}
                />
                <hr style={{marginBottom: '15px', visibility: 'hidden'}}/>
                <Button.Group style={{float: "right"}}>
                    <Button type="primary" onClick={() => this.props.history.push('/')}>
                        <Icon type="left" />Back
                    </Button>
                    <Button type="primary" onClick={() => this.props.history.push('/')}>
                        <Icon type="save" />Save
                    </Button>
                </Button.Group>
                <br style={{clear: "both"}} />
            </React.Fragment>
        );
    }

}

export default CreateJobContainer;