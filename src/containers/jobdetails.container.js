import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Spin, Alert, Input, Button, Icon, Table } from 'antd';
import TaskTreeComponent from '../components/taskstree.component';
import {Controlled as CodeMirror} from 'react-codemirror2';
require('codemirror/mode/javascript/javascript');

const GET_JOB_BY_NAME = gql`
    query getJobById($jobName: String!) {
        getJobById(jobName: $jobName) {
            version
            name
            status
            hash
            duration
            entrypoint
            args {
                name
                value
            }
            tasks {
                name
                script
                scriptFile
                onSuccess
                onFailure
            },
            log
        }
    }
`;

class JobDetailsContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTask: null,
            dataReceived: false
        };
    }

    onTaskSelected = (jobTasks, selectedKeys, info) => {
        jobTasks.forEach(element => {
            if (element.name === selectedKeys[0].split('#')[0]) {
                this.setState({
                    selectedTask: element
                });
                return;
            }
        });
    }

    render() {
        const { match: { params }} = this.props;
        return ( 
            <Query query={GET_JOB_BY_NAME} variables={{ jobName: params.jobId }} pollInterval={10000}>
                 {({ loading, error, data }) => {
                    if (loading) return (                        
                        <Spin tip="Loading...">
                            <Alert
                                message="Retrieving data"
                                description="Contacting with the server..."
                                type="info"
                            />
                        </Spin>
                    );
                    if (error) return `Error! ${error.message}`;
                    const job = data.getJobById;
                    const entryTask = job.tasks.filter(task => task.name === job.entrypoint)[0];
                    return (
                        <React.Fragment>
                            <h1>{job.name}</h1>
                            <hr style={{marginBottom: '15px'}}/>
                            <Input.Group size="large" style={{ marginBottom: 16 }}>
                                <Input defaultValue={job.version} readOnly={true} addonBefore={<div style={{minWidth: "90px"}}>Version</div>}/>
                            </Input.Group>
                            <Input.Group size="large" style={{ marginBottom: 16 }}>
                                <Input defaultValue={job.status} readOnly={true} addonBefore={<div style={{minWidth: "90px"}}>Status</div>}/>
                            </Input.Group>
                            <Input.Group size="large" style={{ marginBottom: 16 }}>
                                <Input defaultValue={job.entrypoint} readOnly={true} addonBefore={<div style={{minWidth: "90px"}}>Entrypoint</div>}/>
                            </Input.Group>
                            <Input.Group size="large" style={{ marginBottom: 16 }}>
                                <Input defaultValue={job.duration} readOnly={true} addonBefore={<div style={{minWidth: "90px"}}>Duration</div>}/>
                            </Input.Group>
                            <Input.Group size="large" style={{ marginBottom: 16 }}>
                                <Input defaultValue={job.hash} readOnly={true} addonBefore={<div style={{minWidth: "90px"}}>Hash</div>}/>
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
                                dataSource={job.args} scroll={{x: true}}/>
                            <h2>Tasks Tree</h2>
                            <hr style={{marginBottom: '15px'}}/>
                            <TaskTreeComponent entrypoint={job.entrypoint} tasks={job.tasks} onSelect={(selectedKeys, info) => this.onTaskSelected(job.tasks, selectedKeys, info)}/>
                            <div style={{marginTop: "12px"}}>
                                <h3>Code viewer</h3>
                                <CodeMirror 
                                    value={formatCodeString(this.state.selectedTask ? this.state.selectedTask.script : entryTask.script)}
                                    options={
                                        {
                                            lineNumbers: true, 
                                            mode: 'javascript',
                                            readOnly: true
                                        }
                                    } 
                                />
                            </div>
                            <div style={{marginTop: "12px"}}>
                                <h2>Output (Last 100 lines)</h2>
                                <hr style={{marginBottom: '15px'}}/>
                                <CodeMirror 
                                    value={job.log}
                                    autoFocus={true}
                                    onChange={() => {}} 
                                    options={
                                        {
                                            readOnly: true
                                        }
                                    } 
                                />
                            </div>
                            <hr style={{marginBottom: '15px'}}/>
                            <Button.Group style={{float: "right"}}>
                                <Button type="primary" onClick={() => this.props.history.push('/jobs')}>
                                    <Icon type="left" />Back
                                </Button>
                            </Button.Group>
                            <br style={{clear: "both"}} />
                        </React.Fragment>
                    )
                }}
            </Query>
        );
    }

}

function formatCodeString(code) {
    if(!code || code.length === 0) return;
    return code.split(";").join(';\n');
}

export default JobDetailsContainer;