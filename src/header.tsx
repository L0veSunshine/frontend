import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIntl } from './utils/i18n/intl.tsx';
import type { MenuProps } from 'antd';
import { Avatar, Button, Dropdown, Input, Space } from 'antd';
import { SearchOutlined, TranslationOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from './store/store.ts';
import { changeLang } from './store/appSlice.ts';

import './header.less';
import { saveLocaleToBrowser } from './utils/i18n/utils.ts';

type NavBarStatus = {
  login: boolean
  enableSearch: boolean,
  enableI18n: boolean,
}

const UserDropDown = ({ children }: { children: React.ReactNode }) => {
  const { trans } = useIntl();
  const items: MenuProps['items'] = [
    { key: '1', label: trans('index') },
    { key: '2', label: trans('logout') }
  ];
  return <Dropdown menu={{ items: items }} placement={'bottom'} trigger={['click']}>{children}</Dropdown>;
};

const I18nSwitcher = () => {
  const dispatch = useDispatch();
  const { lang } = useSelector(state => state.global);
  const [selectKey, setSelectKey] = useState(lang);
  const langMapping = {
    'zh-CN': '中文',
    'en-US': '英文'
  };

  const handleLangChange = (newLang: string) => {
    dispatch(changeLang(newLang));
    setSelectKey(newLang);
    saveLocaleToBrowser(newLang);
  };

  const items: MenuProps['items'] = Object.entries(langMapping).map(([key, value]) =>
    ({ key: key, label: <div onClick={() => handleLangChange(key)}>{value}</div> }));
  return <Dropdown menu={{ items: items, selectedKeys: [selectKey] }}
    placement={'bottom'} trigger={['click']}><TranslationOutlined /></Dropdown>;
};

function AppHeader(props: Partial<NavBarStatus>) {
  const { login = false, enableSearch = false, enableI18n = true } = props;
  const { trans } = useIntl();
  const navigator = useNavigate();

  return (
    <div className="app-header">
      <div className="app-header-content">
        <div className="left-btn">
          <Space direction="horizontal" size="small" onClick={() => navigator('/')}>
            <img className="app-logo" src="../assets/img/logo.png" alt="logo" />
            <div>XGit</div>
          </Space>
        </div>
        <div className="right-btn">
          <Space direction="horizontal" size="middle">
            {enableSearch &&
              <Input placeholder="input search text" style={{ width: '15rem' }} suffix={<SearchOutlined />} />
            }
            {enableI18n && <I18nSwitcher />}
            {
              login ? <div style={{ cursor: 'pointer', userSelect: 'none' }}>
                  <UserDropDown><Avatar>Xuan</Avatar></UserDropDown></div> :
                <>
                  <Button onClick={() => navigator('/signup')}>{trans('signup')}</Button>
                  <Button onClick={() => navigator('/login')}>{trans('login')}</Button>
                </>
            }
          </Space>
        </div>
      </div>
    </div>
  );
}

const Header = React.memo(AppHeader);

export default Header;