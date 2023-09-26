import React, { useState, useEffect } from "react";
import { Badge } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Search from "../forms/Search";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { getCategories } from "../../functions/category";
import './header.css'

const Header = () => {
  const [current, setCurrent] = useState("home");

  let dispatch = useDispatch();
  let { user, cart } = useSelector((state) => ({ ...state }));

  let history = useHistory();

  const handleClick = (e) => {
    setCurrent(e.key);
  };
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategories().then((c) => {
      setCategories(c.data);
      setLoading(false);
    });
  }, []);

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push("/login");
  };

  const handleCategoryClick = (slug) => {
    history.push(`/category/${slug}`);
    window.location.reload()
  };



  return (
    <Navbar className="shadow-lg p-3  bg-body rounded   p-3 mb-1 " expand="lg">
      <Container className="" style={{ fontSize: '18px', fontWeight: '900' }}>
        <Navbar.Brand as={Link} to="/">Navbar with text</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="m-auto d-flex ">

            <Nav.Link to="/" onClick={() => setCurrent("home")} className=" ">
              Trang chủ
            </Nav.Link>

            <Nav.Link as={Link} to="/" onClick={() => setCurrent("home")} className=" ">
              Blog
            </Nav.Link>


            <NavDropdown title="Danh mục" id="basic-nav-dropdown" >
              {categories.map((c) => (
                <NavDropdown.Item key={c._id} onClick={() => handleCategoryClick(c.slug)} >
                  {c.name}
                </NavDropdown.Item>
              ))}
            </NavDropdown>

            <Nav.Link as={Link} to="/sendcontact" onClick={() => setCurrent("home")} className=" ">
              Liên Hệ
            </Nav.Link>

            <Nav.Link as={Link} to="/" onClick={() => setCurrent("home")} className=" ">
              Page
            </Nav.Link>


          </Nav>

          <Nav className="">

            <Nav.Link as={Link} to="/cart" onClick={() => setCurrent("cart")} className="d-flex align-items-center" style={{ fontSize: '18px', marginRight: '10px' }}>
              <ShoppingCartOutlined />

              <Badge count={cart.length} offset={[9, 0]} >
                <span style={{ fontSize: '18px', }}>Cart</span>
              </Badge>
            </Nav.Link>

            {!user && (
              <Nav.Link as={Link} to="/register" className="d-flex align-items-center  ">
                <UserAddOutlined /> Register
              </Nav.Link>
            )}

            {!user && (
              <Nav.Link as={Link} to="/login" className="d-flex align-items-center ">
                <UserOutlined /> Login
              </Nav.Link>
            )}

            {user && (
              <NavDropdown
                // title={<SettingOutlined />}
                title={user.email && user.email.split("@")[0]}
                id="basic-nav-dropdown"
                className=""
              >
                {user && user.role === "subscriber" && (
                  <NavDropdown.Item as={Link} to="/user/history">
                    Dashboard
                  </NavDropdown.Item>
                )}

                {user && user.role === "admin" && (
                  <NavDropdown.Item as={Link} to="/admin/dashboard">
                    Dashboard
                  </NavDropdown.Item>
                )}

                <NavDropdown.Item onClick={logout} className="d-flex align-items-center " >
                  <LogoutOutlined /> Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}

          </Nav>


        </Navbar.Collapse>



      </Container>
    </Navbar >
  );
};

export default Header;
