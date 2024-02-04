import { Button, Layout } from "antd";
const { Header, Content } = Layout;

import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/authSlice";

const MainLayout = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <Layout style={{ minHeight: "100vh", height: "100%" }}>
        <Sidebar />
        <Layout>
          <Header
            style={{
              padding: 0,
              position: "sticky",
              top: 0,
              right: 0,
              zIndex: 9,
            }}
          >
            <Button onClick={handleLogout}>Logout</Button>
          </Header>
          <Content style={{ margin: "24px 16px 0" }}>
            <div
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default MainLayout;
