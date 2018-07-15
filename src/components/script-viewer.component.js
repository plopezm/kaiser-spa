import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ScriptViewerComponent extends Component {

    render() {
        return (
            <div>{this.props.script}</div>
        );
    }

} 

ScriptViewerComponent.propTypes = {
    script: PropTypes.string.isRequired
}

export default ScriptViewerComponent;