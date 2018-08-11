import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import EditableTable from './table/editable-table.component';
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
            {
                activation.type === 'remote' ?
                    (
                        <React.Fragment>
                                <h2 style={{marginTop: "15px"}}>Remote Arguments</h2>
                                <hr style={{marginBottom: '15px'}}/>
                                <EditableTable
                                    rowKey="name" 
                                    columns={[
                                        {
                                            title: 'Name',
                                            dataIndex: 'name',
                                            dataType: 'text',
                                            editable: true,
                                        }
                                    ]} 
                                    dataSource={activation.args}
                                    onTableUpdate={(update) => onChange('args', update)}
                                    scroll={{x: true}}
                                />
                        </React.Fragment>
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
