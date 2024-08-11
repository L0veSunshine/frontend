import React, { memo, useCallback, useMemo, useState } from 'react';
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
import './repo.less';
import type { ParamParseKey, PathMatch } from 'react-router-dom';
import { generatePath, Outlet, useMatch, useNavigate, } from 'react-router-dom';
import { useSelector } from '../store/store.ts';
import type { MenuInfo } from 'rc-menu/lib/interface';

const { Sider, Content } = Layout;

function getKeyFormMatch(match: PathMatch<ParamParseKey<'/:id/:repo/:subpage?/*'>> | null) {
  if (match && match.params.subpage) {
    return [match.params.subpage];
  }
  return ['/'];
}

function RepoPage() {
  const navigator = useNavigate();
  const match = useMatch('/:id/:repo/:subpage?/*');

  const { lang } = useSelector(state => state.global);

  const [collapsed, setCollapsed] = useState(false);
  const [selectKey, setSelectKey] = useState<string[]>(getKeyFormMatch(match));

  const menuOnClick = useCallback((item: MenuInfo) => {
    if (item.key !== '/') {
      navigator(item.key);
    } else if (match) {
      const currentParam = { id: match.params.id || '', repo: match.params.repo || '' };
      navigator(generatePath('/:id/:repo', currentParam));
    }
  }, [match]);


  const menuItems = useMemo<MenuProps['items']>(() => [
    { label: 'Code', key: '/', icon: <CodeOutlined /> },
    { label: 'Issues', key: 'issues', icon: <IssuesCloseOutlined /> },
    { label: 'Pull Request', key: 'pulls', icon: <PullRequestOutlined /> },
    { label: 'Action', key: 'action', icon: <CiOutlined /> },
    { label: 'Release', key: 'release', icon: <SyncOutlined /> },
    { label: 'Wiki', key: 'wiki', icon: <BookOutlined /> },
    { label: 'Activities', key: 'activities', icon: <CloudDownloadOutlined /> }
  ], [lang]);

  return (
    <>
      <Layout hasSider rootClassName="main-component-content">
        <Sider className="menu-sider" collapsedWidth="3rem" style={{ background: 'white' }} collapsible
          collapsed={collapsed} width="15rem" onCollapse={s => setCollapsed(s)} key={'sider'}
          trigger={collapsed ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}>
          <Menu mode="inline" items={menuItems} inlineIndent={16} onClick={menuOnClick} selectedKeys={selectKey}
            onSelect={({ key }) => setSelectKey([key])} />
        </Sider>
        <Content style={{ padding: '1.5rem' }}>
          <Outlet />
        </Content>
      </Layout>
    </>
  );
}

export default memo(RepoPage);