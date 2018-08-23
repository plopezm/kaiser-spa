import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import SelectComponent from './form/select.component';

const JobActivationForm = (props) => {
    const { activation, onChange } = props;

    return (
        <React.Fragment>
            <Input.Group size="large" style={{ marginBottom: 16 }}>
                <SelectComponent label="Type" data={['local', 'remote']} onChange={(value) => onChange('type', value)} />
            </Input.Group>
            {
                activation.type === 'local' ? 
                    (
                        <Input.Group size="large" style={{ marginBottom: 16 }}>
                            <Input name='duration' onChange={(e) => onChange(e.target.name, e.target.value)} addonBefore={<div style={{minWidth: "90px"}}>Duration</div>}/>
                        </Input.Group>
                    )
                :
                    ""
            }
        </React.Fragment>
    )

};

JobActivationForm.propTypes = {
    activation: PropTypes.object.isRequired,
    onChange: PropTypes.func
}

JobActivationForm.defaultTypes = {
    onChange: () => {}
}

export default JobActivationForm;
