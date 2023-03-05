
import { User } from '@/common/models/user.model';
import { getLocalStoreByName } from '@/common/utils/store.service';
import { DatabaseOutlined, DeliveredProcedureOutlined, MenuFoldOutlined, PieChartOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, MenuProps, theme } from 'antd';
import router from 'next/router';
import React, { PropsWithChildren, ReactNode, useEffect, useState } from 'react';
type DashBoardProps = {
  selectedKeys: string[],
  children: ReactNode
}


function Dashboard(props: DashBoardProps) {
  const { Header, Content, Footer, Sider } = Layout;
  const [user, setUser] = useState<User>();
  type MenuItem = Required<MenuProps>['items'][number];

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    urlLink: string = "/",
    children?: MenuItem[]

  ): MenuItem {
    const onClick = () => { router.push(urlLink); }
    return { key, icon, children, label, onClick } as MenuItem;
  }

  const items: MenuItem[] = [ 
    getItem('Ürünler', '/products', <DatabaseOutlined />, "/products"),
    getItem('Ürün Ekle', '/products/productAdd', <DeliveredProcedureOutlined />, "/products/productAdd"),
    getItem("kullanıcı bilgileri",  '/auth/userInformation' , <UserOutlined />, "/auth/userInformation")
  ]; 
  
  useEffect(() => {
    if (getLocalStoreByName<User>("user"))
      setUser(getLocalStoreByName<User>("user"))
    else{
      router.push("/auth/login")
    }
  }, [])
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)',textAlign:"center" }}> 
        <img src="/img/icon.jpg" alt="me" width="%100" height="32" />
        </div> 
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
          items={items}
          selectedKeys={props.selectedKeys}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0 }} />
        <Content style={{ padding: '1%', margin: '1%' }}>
          <div className="site-layout-content" style={{ borderRadius: "25px", padding: "1%" }}>
            {props.children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>UGURCANGUDEN - 2023</Footer>
      </Layout>
    </Layout>

  )
}

export default Dashboard;