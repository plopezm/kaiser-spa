import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Spin, Alert, Input, Button, Icon } from 'antd';
import TextArea from '../../node_modules/antd/lib/input/TextArea';

const GET_JOB_BY_NAME = gql`
    query getJobById($jobName: String!) {
        getJobById(jobName: $jobName) {
            version
            name
            status
            hash
            duration
            entrypoint
        }
    }
`;

class JobDetailsContainer extends Component {

    render() {
        const { match: { params }} = this.props;
        return ( 
            <Query query={GET_JOB_BY_NAME} variables={{ jobName: params.jobId }} pollInterval={3000}>
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
                    return (
                        <React.Fragment>
                            <Input.Group size="large" style={{ marginBottom: 16 }}>
                                <Input defaultValue={job.version} readOnly={true} addonBefore={<div style={{minWidth: "90px"}}>Version</div>}/>
                            </Input.Group>
                            <Input.Group size="large" style={{ marginBottom: 16 }}>
                                <Input defaultValue={job.name} readOnly={true} addonBefore={<div style={{minWidth: "90px"}}>Name</div>}/>
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

export default JobDetailsContainer;