import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'antd';
import ImageCard from '../components/cards/image-card.component';
import WheelPlusIcon from '../components/icons/wheelplus.icon';

class HomeContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }

    render() {
        return (
            <React.Fragment>
                <Row gutter={15} type="flex" justify="center">       
                    <Col>
                        <ImageCard onClick={() => this.props.history.push('/jobs')} image={<img alt="Job List" src="/images/icon-work-programs-03.png" />} title="My Jobs" desc="Manage your jobs" />
                    </Col>      
                    <Col>
                        <ImageCard image={<WheelPlusIcon />} title="Create Job" desc="Create new jobs" />
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

export default withRouter(HomeContainer);