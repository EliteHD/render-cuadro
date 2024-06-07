import { useState, useEffect } from "react";
import { Layout } from "antd";
import SiderCustom from "@components/Dashboard/SiderCustom";
import NavBarCustom from "@components/Dashboard/NavBarCustom";
import { ItemsMenuDashboard } from "@constants/ItemsMenuDashboard";
import DashboardRouter from "../../router/DashboardRouter";
import BannerComponent from "./BannerComponent";

const { Header, Content, Footer, Sider } = Layout;

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const getSelectedKey = () => {
    const path = location.pathname;
    if (path === "/Dashboard/CuadroNecesidades") return "1";

    if (path === "/Dashboard/Users" || path === "/Dashboard/AddUser") return "2";
    return "1";
  };


  useEffect(() => {
    document.title = "Dashboard";
  }, []);


  
  return (
    <Layout style={{ minHeight: "100vh" }} >
      <Layout hasSider >

        <SiderCustom

          collapsed={collapsed}
          toggleCollapsed={toggleCollapsed}
          getSelectedKey={getSelectedKey}
          items={ItemsMenuDashboard}
        />
        <Layout
          style={{
            marginLeft: 200,
          }}
        >
          <div className="bg-white "
            style={{
              position: 'sticky',
              top: 0,
              zIndex: 1,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
            }}>

            <Header
              className=" w-full bg-white mb-9"
            >
              <BannerComponent />

            </Header>
          </div>
          <Content>
            <DashboardRouter />
          </Content>
        </Layout>
      </Layout>
    </Layout>

  );
};

export default DashboardLayout;
