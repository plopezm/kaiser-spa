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
            args: []
        }
    }

    handleArgumentsTableUpdate = (argsTableData) => {
        this.setState({
            args: [...argsTableData]
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
                            editable: true,
                        },
                        {
                            title: 'Value',
                            dataIndex: 'value',
                            editable: true,
                        }
                    ]} 
                    dataSource={this.state.args}
                    onTableUpdate={this.handleArgumentsTableUpdate}
                    scroll={{x: true}}
                />
                <h2>Jobs</h2>
                <hr style={{marginBottom: '15px'}}/>
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