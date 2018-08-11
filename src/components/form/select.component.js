import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
const Option = Select.Option;

const SelectComponent = (props) => {

    const {label, dataIndex, data, onChange} = props;

    return (
        <span className="ant-input-group-wrapper">
            <span className="ant-input-wrapper ant-input-group">
                <span className="ant-input-group-addon">
                    <div style={{minWidth: "90px"}} >{label}</div>
                </span>
                <Select style={{ width: '100%' }} onChange={onChange}>
                {
                    data.map(item => <Option key={item[dataIndex] || item}>{item[dataIndex] || item}</Option>) 
                }
                </Select>
            </span>
        </span>
    )


}

SelectComponent.propTypes = {
    label: PropTypes.string.isRequired,
    dataIndex: PropTypes.string,
    data: PropTypes.array.isRequired,
    onChange: PropTypes.func
}

SelectComponent.defaultTypes = {
    onChange: () => {}
}

export default SelectComponent;