import React, { useMemo, useState } from 'react';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import {
  BookOutlined,
  CiOutlined,
  CloudDownloadOutlined,
  CodeOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
  IssuesCloseOutlined,
  PullRequestOutlined,
  SyncOutlined
} from '@ant-design/icons';
import './index.less';
import { Outlet, useNavigate } from 'react-router-dom';
import { useIntl } from './utils/intl.tsx';
import { useSelector } from './store/store.ts';

const { Sider, Content } = Layout;

function Index() {
  const navigator = useNavigate();
  const lang = useSelector(state => state.global);
  const [collapsed, setCollapsed] = useState(false);
  const { trans } = useIntl();

  const menuItems: MenuProps['items'] = useMemo(() => [
    { label: 'Code', key: '1', icon: <CodeOutlined/> },
    { label: 'Issues', key: '2', icon: <IssuesCloseOutlined/> },
    { label: 'Pull Request', key: '3', icon: <PullRequestOutlined/> },
    { label: 'Action', key: '4', icon: <CiOutlined/> },
    { label: 'Release', key: '5', icon: <SyncOutlined/> },
    { label: 'Wiki', key: '6', icon: <BookOutlined/> },
    { label: 'Activities', key: '7', icon: <CloudDownloadOutlined/> }
  ], [lang]);

  return (
    <>
      <Layout hasSider rootClassName="main-component-content">
        <Sider collapsedWidth={'4rem'} style={{ background: 'white' }} collapsible collapsed={collapsed} width={'14rem'}
               trigger={collapsed ? <DoubleRightOutlined/> :
                 <DoubleLeftOutlined/>} onCollapse={(s) => setCollapsed(s)}>
          <Menu mode="inline" items={menuItems} inlineIndent={20}/>
        </Sider>
        <Content>
          <Outlet/>
        </Content>
      </Layout>
    </>
  );
}

export default Index;