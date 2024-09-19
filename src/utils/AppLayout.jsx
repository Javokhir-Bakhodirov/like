import React from "react";
import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";

const { Sider, Content } = Layout;

const AppLayout = ({ children }) => {
    const { pathname } = useLocation();

    const isProfilePage = pathname.includes("/profile");

    return (
        <Layout style={{ minHeight: "100vh" }}>
            {isProfilePage && (
                <Sider>
                    <Menu theme="dark" mode="inline">
                        <Menu.Item key="1">
                            <Link to="/profile">Profile</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
            )}
            <Layout>
                <Content>{children}</Content>
            </Layout>
        </Layout>
    );
};

export default AppLayout;
