import React, { Component } from 'react';
import './joblist.container.css';
import { Table, Input, Icon } from 'antd';

const mockedData = [{
        key: 0,
        name: 'Job1',
        status: 'RUNNING'
    },{
        key: 1,
        name: 'Job2',
        status: 'STOPPED'
    }
];

class JobListContainer extends Component {
    
    constructor(props) {
        super(props);
        this.state = {            
            filteredInfo: null,
            sortedInfo: null,
            searchText: '',
            filterDropdownVisible: false,
            filtered: false,
            data: mockedData
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
          data: mockedData.map((record) => {
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
    
    render() {
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};

        const columns = [
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
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
          }, {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
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
          }
        ];

        return (
            <Table dataSource={this.state.data} columns={columns} onChange={this.handleChange}/>
        )
    }
}

export default JobListContainer;
