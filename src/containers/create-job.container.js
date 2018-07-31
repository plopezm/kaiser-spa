import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Input, Button, Icon, Select } from 'antd';
import EditableTable from '../components/table/editable-table.component';

const Option = Select.Option;

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

    handleJobUpdate = (key, update) => {
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
                <h1>New Job</h1>
                <hr style={{marginBottom: '15px'}}/>
                <Input.Group size="large" style={{ marginBottom: 16 }}>
                    <Input name='name' onChange={(e) => this.handleJobUpdate(e.target.name, e.target.value)} addonBefore={<div style={{minWidth: "90px"}} >Name</div>}/>
                </Input.Group>
                <Input.Group size="large" style={{ marginBottom: 16 }}>
                    <span className="ant-input-group-wrapper">
                        <span className="ant-input-wrapper ant-input-group">
                            <span className="ant-input-group-addon">
                                <div style={{minWidth: "90px"}} >Entrypoint</div>
                            </span>
                            <Select name="entrypoint" style={{ width: '100%' }} onChange={(value) => this.handleJobUpdate('entrypoint', value)}>
                            {
                                this.state.newJob.tasks.filter(task => task.name !== '').map(task => <Option key={task.name}>{task.name}</Option>) 
                            }
                            </Select>
                        </span>
                    </span>
                </Input.Group>
                <Input.Group size="large" style={{ marginBottom: 16 }}>
                    <Input name='duration' onChange={(e) => this.handleJobUpdate(e.target.name, e.target.value)} addonBefore={<div style={{minWidth: "90px"}}>Duration</div>}/>
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
                    onTableUpdate={(update) => this.handleJobUpdate('args', update)}
                    scroll={{x: true}}
                />
                <h2>Tasks</h2>
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