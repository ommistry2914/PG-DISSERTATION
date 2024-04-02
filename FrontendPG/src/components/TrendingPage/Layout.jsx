import React, { Suspense } from 'react';
import 'antd/dist/antd';
import './Layout.css';
import { Layout, Menu, Input } from 'antd'; // Import Input component
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  StockOutlined,
  SearchOutlined, // Import SearchOutlined icon
} from '@ant-design/icons';
import { fetchSources, searchNews } from '../../api'; // Assuming you have an API function for searching news

const NewsSection = React.lazy(() => import('./NewsSection'));
const News = React.lazy(() => import('./News'));

const { Header, Sider, Content } = Layout;
const { Search } = Input; // Destructure Search component from Ant Design

class MainLayout extends React.Component {
  state = {
    collapsed: false,
    sources: [],
    homePage: true,
    query: '', // Add query state
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  async componentDidMount() {
    const sources = await fetchSources();
    this.setState({ sources });
  }

  // Method to handle search
  handleSearch = async (value) => {
    // Fetch news based on the search query
    const news = await searchNews(value);
    this.setState({ homePage: false, query: value });
  };

  render() {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={!this.state.collapsed}>
          <div className="logo">
            <h2>{!this.state.collapsed ? 'N' : 'Newsio'}</h2>
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['-1']}>
            <Menu.Item onClick={() => this.setState({ homePage: true })} key="-1" icon={<StockOutlined />}>
              Top News
            </Menu.Item>
            {/* Sidebar search input */}
            <Menu.Item key="search">
              <Search
                placeholder="Search news"
                allowClear
                enterButton={<SearchOutlined />}
                onSearch={this.handleSearch} // Call handleSearch on search
              />
            </Menu.Item>
            {/* {this.state.sources.map((source) =>
              <Menu.Item onClick={() => this.loadNews(source.name)} key={source.name}>
                {source.name}
              </Menu.Item>
            )} */}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(!this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              paddingRight: 0,
              minHeight: 280,
            }}
          >
            <Suspense fallback={<h1 style={{ fontSize: '30px' }}>Loading...</h1>}>
              {this.state.homePage === true ? <News /> : <NewsSection category='everything' query={'q=' + this.state.query} topHeading={this.state.query} results='100' />}
            </Suspense>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default MainLayout;
