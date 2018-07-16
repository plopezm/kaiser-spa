import React, { Component } from 'react';
import './App.css';
import { HashRouter, Link } from 'react-router-dom';
import AppRouter from './router';
import { Layout, Menu, Icon } from 'antd';
const { Header, Content, Sider } = Layout;

class App extends Component {
  render() {
    return (      
      <HashRouter>  
        <Layout className="App-main-layout">
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
          >
            <div className="App-logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <Icon type="user" />
                <span><Link to="/" style={{color: "white"}}>Home</Link></span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }} />
            <Content style={{ margin: '24px 16px 0' }}>
              <div style={{ padding: 24, background: '#fff' }}>            
                    <AppRouter/>
              </div>
            </Content>
            {/*
            <Footer style={{ textAlign: 'center' }}>
              Kaiser ©2018 Created by Pablo López
            </Footer>
            */}
          </Layout>
        </Layout>      
      </HashRouter>
    );
  }
}

export default App;
