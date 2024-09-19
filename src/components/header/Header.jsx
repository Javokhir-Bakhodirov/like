import React, { useState } from "react";

import { IoLogoBuffer } from "react-icons/io";
import { Layout, Menu, Breadcrumb, AutoComplete, theme } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSearchProductMutation } from "../../redux/api/productsApi";
import { useGetProfileQuery } from "../../redux/api/userApi";
import DropDownCart from "../dropdown/DropDownCart";

const { Header, Content, Sider } = Layout;

const App = () => {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState("");
    const { pathname } = useLocation();
    const [searchProduct, { data }] = useSearchProductMutation();
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const { data: profile } = useGetProfileQuery();
    const user = profile?.payload;

    const handleSearch = e => {
        e.preventDefault();
        if (searchValue) {
            navigate(`/search?q=${searchValue}`);
        }
    };

    const items1 = [];

    const items2 = [
        {
            label: <Link to="/profile">Profile</Link>,
            key: "1",
        },
        {
            label: <Link to="/profile/users">Users</Link>,
            key: "2",
        },
    ];

    const menuItems = [
        {
            label: <Link to="/">Home</Link>,
            key: "1",
        },
        {
            label: (
                <Link to="/cart">
                    <DropDownCart />
                </Link>
            ),
        },
        {
            label: localStorage.getItem("token") ? (
                <Link to="/profile">
                    <img
                        width={45}
                        height={45}
                        className="rounded-full ring-1 ring-white ring-inset p-2 bg-zinc-300"
                        src={user?.photo_url}
                        alt=""
                    />
                </Link>
            ) : (
                <Link to="/auth/login">Login</Link>
            ),
            key: "3",
        },
    ];

    return (
        <header className="sticky inset-x-0 top-0 z-40">
            <Layout>
                <Header
                    style={{
                        position: "sticky",
                        top: 0,
                        zIndex: 1,
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 10,
                    }}>
                    <div className="demo-logo">
                        <Link to="/">
                            <IoLogoBuffer className="text-3xl text-white" />
                        </Link>
                    </div>
                    <form onSubmit={handleSearch}>
                        <AutoComplete
                            options={data?.payload?.map(product => ({
                                label: (
                                    <Link
                                        key={product._id}
                                        to={`/products/${product._id}`}>
                                        {product.product_name}
                                    </Link>
                                ),
                            }))}
                            style={{ width: 200 }}
                            onKeyDown={e => {
                                if (e.code === "Enter") {
                                    navigate(`/search?q=${searchValue}`);
                                }
                            }}
                            onChange={value => setSearchValue(value)}
                            onSearch={text => searchProduct(text)}
                            placeholder="Search products"
                        />
                    </form>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={["2"]}
                        items={menuItems}
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            flex: 1,
                        }}
                    />
                </Header>
            </Layout>
        </header>
    );
};

export default App;
