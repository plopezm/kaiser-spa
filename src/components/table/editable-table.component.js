import React from 'react';
import PropTypes from 'prop-types';
import { Table, Input, InputNumber, Form, Icon, Select } from 'antd';
import './editable-table.css';
const { TextArea } = Input;

const Option = Select.Option;

const data = [];
for (let i = 0; i < 5; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}
const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />;
    }
    if (this.props.inputType === 'select') {
      return (
        <Select style={{ width: 90 }}>
          {
            this.props.selectOptions.filter(option => option !== '').map(option => <Option key={option}>{option}</Option>) 
          }
        </Select>
      )
    }
    if (this.props.inputType === 'script') {
      return (
        <TextArea rows={4} />
      )
    }
    return <Input />;
  };

  render() {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      selectOptions,
      record,
      index,
      ...restProps
    } = this.props;
    return (
      <EditableContext.Consumer>
        {(form) => {
          const { getFieldDecorator } = form;
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {
                    rules: [{
                      required: true,
                      message: `Please Input ${title}!`,
                    }],
                    initialValue: record[dataIndex],
                  })(this.getInput())}
                </FormItem>
              ) : restProps.children}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: this.props.dataSource, editingKey: '', lastNewId: this.props.dataSource.length};
    this.columns = [
      ...this.props.columns,
      {
        title: 'Actions',
        dataIndex: 'operation',
        render: (text, record) => {
          const editable = this.isEditing(record);
          return (
            <div>
              {editable ? (
                <span>
                  <EditableContext.Consumer>
                    {form => (
                      <button
                        onClick={() => this.save(form, record.key)}
                      >
                        <Icon type="save" />
                      </button>
                    )}
                  </EditableContext.Consumer>
                  <button onClick={() => this.cancel(record.key)}><Icon type="close" /></button>
                </span>
              ) : (
                <React.Fragment>
                  <button onClick={() => this.edit(record.key)}><Icon type="edit" /> </button>
                  <button onClick={() => this.delete(record.key)}><Icon type="delete" /> </button>
                </React.Fragment>
              )}
            </div>
          );
        },
      },
    ];
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.columns = [
      ...nextProps.columns,
      {
        title: 'Actions',
        dataIndex: 'operation',
        render: (text, record) => {
          const editable = this.isEditing(record);
          return (
            <div>
              {editable ? (
                <span>
                  <EditableContext.Consumer>
                    {form => (
                      <button
                        onClick={() => this.save(form, record.key)}
                      >
                        <Icon type="save" />
                      </button>
                    )}
                  </EditableContext.Consumer>
                  <button onClick={() => this.cancel(record.key)}><Icon type="close" /></button>
                </span>
              ) : (
                <React.Fragment>
                  <button onClick={() => this.edit(record.key)}><Icon type="edit" /> </button>
                  <button onClick={() => this.delete(record.key)}><Icon type="delete" /> </button>
                </React.Fragment>
              )}
            </div>
          );
        },
      },
    ];
  }

  isEditing = (record) => {
    return record.key === this.state.editingKey;
  };

  edit(key) {
    this.setState({ editingKey: key });
  }

  delete(key) {
    const data = [...this.state.data];
    const newData = data.filter(item => item.key !== key);
    this.setState({
      data: newData
    });
    if (this.props.onTableUpdate) {
      this.props.onTableUpdate(newData);
    }
  }

  createEmpty() {
    const data = [...this.state.data];
    let dataLen = this.state.lastNewId.toString();
    const emptyRecord = {};
    this.columns.forEach(column => {
      if (column.dataIndex !== 'operation') {
        emptyRecord[column.dataIndex] = '';
      }
    });
    emptyRecord.key = dataLen.toString();
    data.push(emptyRecord);
    this.setState({
      data: data,
      lastNewId: ++dataLen
    });
    if (this.props.onTableUpdate) {
      this.props.onTableUpdate(data);
    }
  }

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ data: newData, editingKey: '' });
      } else {
        newData.push(row);
        this.setState({ data: newData, editingKey: '' });
      }
      if (this.props.onTableUpdate) {
        this.props.onTableUpdate(newData);
      }
    });
  }

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  render() {
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };

    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataType,
          selectOptions: col.selectOptions,
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });

    return (
      <React.Fragment>
        <button onClick={() => this.createEmpty()} type="button" style={{marginBottom: '15px'}}><Icon type="plus" /></button>
        <Table
          components={components}
          bordered
          dataSource={this.state.data}
          columns={columns}
          rowClassName="editable-row"
        />
      </React.Fragment>
    );
  }
}

EditableTable.propTypes = {
    columns: PropTypes.array.isRequired,
    dataSource: PropTypes.array.isRequired,
    onTableUpdate: PropTypes.func
}

export default EditableTable;