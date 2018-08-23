import React, { Component } from 'react';
import './joblist.container.css';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Table, Input, Icon, Spin, Alert, Menu, Dropdown } from 'antd';

const GET_JOBS = gql`
    query jobQuery {
        jobs {
            name
            status
            activation {
                type
                duration
            }
        }
    }
`;

class JobListContainer extends Component {
    
    constructor(props) {
        super(props);
        this.state = {            
            filteredInfo: null,
            sortedInfo: null,
            searchText: '',
            filterDropdownVisible: false,
            filtered: false,
            data: []
        }
    }

    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    }

    
    onSearchChange = (e) => {
        this.setState({ searchText: e.target.value });
    }
    
    onSearch = () => {
        const { searchText } = this.state;
        const reg = new RegExp(searchText, 'gi');
        this.setState({
          filterDropdownVisible: false,
          filtered: !!searchText,
          data: this.state.data.map((record) => {
            const match = record.name.match(reg);
            if (!match) {
              return null;
            }
            return {
              ...record,
              name: (
                <span>
                  {record.name.split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i')).map((text, i) => (
                    text.toLowerCase() === searchText.toLowerCase()
                      ? <span key={i} className="JobListContainer-filter-highlight">{text}</span> : text // eslint-disable-line
                  ))}
                </span>
              ),
            };
          }).filter(record => !!record),
        });
      }

    generateMenu = (record) => {
        return (
            <Menu>
                <Menu.Item key="0">
                    <Link to={`/jobs/${record.name}`}><Icon type="eye" />  Details</Link>
                </Menu.Item>
                <Menu.Item key="1" disabled={record.activation.type === 'local'}>
                    <Icon type="caret-right"/> Run
                </Menu.Item>
            </Menu>
        ); 
    }
    
    render() {
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};


        const columns = [
          {
            title: 'Name',
            dataIndex: 'name',
            filterDropdown: (
                <div className="JobListContainer-filter-dropdown">
                  <Input
                    ref={ele => this.searchInput = ele}
                    placeholder="Search name"
                    value={this.state.searchText}
                    onChange={this.onSearchChange}
                    onPressEnter={this.onSearch}
                  />
                </div>
              ),
              filterIcon: <Icon type="search" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
              filterDropdownVisible: this.state.filterDropdownVisible,
              onFilterDropdownVisibleChange: (visible) => {
                this.setState({
                  filterDropdownVisible: visible,
                }, () => this.searchInput && this.searchInput.focus());
              },
              fixed: 'left'
          }, {
            title: 'Status',
            dataIndex: 'status',
            filters: [
                { text: 'RUNNING', value: 'RUNNING' },
                { text: 'PAUSED', value: 'PAUSED' },
                { text: 'STOPPED', value: 'STOPPED' },
            ],
            filteredValue: filteredInfo.status || null,
            onFilter: (value, record) => record.status.includes(value),
            sorter: (a, b) => {
                if ( a.status > b.status ) {
                    return 1;
                } else if (a.status < b.status) {
                    return -1
                }
                return 0;
            },
            sortOrder: sortedInfo.columnKey === 'status' && sortedInfo.order
          },
          {
              title: 'Activation',
              dataIndex: 'activation.type'
          },
          {
              title: 'Duration',
              dataIndex: 'activation.duration'
          },
          {
              title: 'Actions',
              fixed: 'right',
              width: 85,
              render: (text, record, index) => {
                return  (
                    <Dropdown overlay={this.generateMenu(record)} trigger={['click']}>
                        <a className="ant-btn">
                            <Icon type="bars" />
                        </a>
                    </Dropdown>
                )
              }
          }
        ];

        return (
            <Query query={GET_JOBS} pollInterval={3000}>
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
                    const allJobs = [...data.jobs];
                    return (
                        <Table rowKey="name" dataSource={allJobs.sort(compareJobs)} columns={columns} onChange={this.handleChange} scroll={{x: true}}/>
                    )
                }}
            </Query>
        )
    }
}

function compareJobs(a, b) {
    if (a.name > b.name) {
        return 1;
    } else if (a.name < b.name) {
        return -1;
    }
    return 0;
}

export default JobListContainer;
