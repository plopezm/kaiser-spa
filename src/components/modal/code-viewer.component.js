import React from 'react';
import { Modal } from 'antd';

class CodeViewerModal extends React.Component {
  state = { visible: false }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    console.log(e);
  }

  handleCancel = (e) => {
    console.log(e);
  }

  render() {
    return (
      <div>
        <Modal
          title="Basic Modal"
          visible={this.props.show || false}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    );
  }
}

export default CodeViewerModal;