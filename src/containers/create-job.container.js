import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Spin, Alert, Input, Button, Icon, Table } from 'antd';
import {Controlled as CodeMirror} from 'react-codemirror2';
require('codemirror/mode/javascript/javascript');

class CreateJobContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            args: []
        }
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
                <Table rowKey="name" 
                    columns={[
                        {
                            title: 'Name',
                            dataIndex: 'name'
                        },
                        {
                            title: 'Value',
                            dataIndex: 'value'
                        }
                    ]} 
                    dataSource={this.state.args} scroll={{x: true}}/>
                <hr style={{marginBottom: '15px', visibility: 'hidden'}}/>
                <Button.Group style={{float: "right"}}>
                    <Button type="primary" onClick={() => this.props.history.push('/')}>
                        <Icon type="left" />Back
                    </Button>
                </Button.Group>
                <br style={{clear: "both"}} />
            </React.Fragment>
        );
    }

}

export default CreateJobContainer;