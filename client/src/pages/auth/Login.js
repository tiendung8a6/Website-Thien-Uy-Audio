import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
// import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrUpdateUser } from "../../functions/auth";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';

const Login = ({ history }) => {
  const [email, setEmail] = useState("tiendung8a6@gmail.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    let intended = history.location.state;
    if (intended) {
      return;
    } else {
      if (user && user.token) history.push("/");
    }
  }, [user, history]);

  let dispatch = useDispatch();

  const roleBasedRedirect = (res) => {
    // check if intended
    let intended = history.location.state;
    if (intended) {
      history.push(intended.from);
    } else {
      if (res.data.role === "admin") {
        history.push("/admin/product");
      } else {
        history.push("/user/history");
      }
    }
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    setLoading(true);
    // console.table(email, password);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      console.log(result);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            },
          });
          roleBasedRedirect(res);
        })
        .catch((err) => console.log(err));

      // history.push("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
            roleBasedRedirect(res);
          })
          .catch((err) => console.log(err));
        // history.push("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  // const loginForm = () => (
  //   <form onSubmit={handleSubmit}>
  //     <div className="form-group">
  //       <input
  //         type="email"
  //         className="form-control"
  //         value={email}
  //         onChange={(e) => setEmail(e.target.value)}
  //         placeholder="Your email"
  //         autoFocus
  //       />
  //     </div>

  //     <div className="form-group">
  //       <input
  //         type="password"
  //         className="form-control"
  //         value={password}
  //         onChange={(e) => setPassword(e.target.value)}
  //         placeholder="Your password"
  //       />
  //     </div>

  //     <br />
  //     <Button
  //       onClick={handleSubmit}
  //       type="primary"
  //       className="mb-3"
  //       block
  //       shape="round"
  //       icon={<MailOutlined />}
  //       size="large"
  //       disabled={!email || password.length < 6}
  //     >
  //       Login with Email/Password
  //     </Button>
  //   </form>
  // );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <></>
          )}
          {/* {loginForm()} */}






          <section className="background-radial-gradient overflow-hidden">
            <style dangerouslySetInnerHTML={{ __html: "\n    .background-radial-gradient {background-color: hsl(218, 41%, 15%);   background-image: radial-gradient(650px circle at 0% 0%, hsl(218, 41%, 35%) 15%, hsl(218, 41%, 30%) 35%, hsl(218, 41%, 20%) 75%, hsl(218, 41%, 19%) 80%, transparent 100%), radial-gradient(1250px circle at 100% 100%, hsl(218, 41%, 45%) 15%,   hsl(218, 41%, 30%) 35%,   hsl(218, 41%, 20%) 75%,   hsl(218, 41%, 19%) 80%,   transparent 100%);\n    }\n\n    #radius-shape-1 {\n      height: 220px;\n      width: 220px;\n      top: -60px;\n      left: -130px;\n      background: radial-gradient(#44006b, #ad1fff);\n      overflow: hidden;\n    }\n\n    #radius-shape-2 {\n      border-radius: 38% 62% 63% 37% / 70% 33% 67% 30%;\n      bottom: -60px;\n      right: -110px;\n      width: 300px;\n      height: 300px;\n      background: radial-gradient(#44006b, #ad1fff);\n      overflow: hidden;\n    }\n\n    .bg-glass {\n      background-color: hsla(0, 0%, 100%, 0.9) !important;\n      backdrop-filter: saturate(200%) blur(25px);\n    }\n  " }} />
            <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
              <div className="row gx-lg-5 align-items-center mb-5">
                <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
                  <h1 className="my-5 display-5 fw-bold ls-tight" style={{ color: 'hsl(218, 81%, 95%)' }}>
                    Đăng nhập <br />
                    <span style={{ color: 'hsl(218, 81%, 75%)' }}>Mang đến lựa chọn tốt nhất cho bạn</span>
                  </h1>
                  <p className="mb-4 opacity-70" style={{ color: 'hsl(218, 81%, 85%)' }}>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Temporibus, expedita iusto veniam atque, magni tempora mollitia
                    dolorum consequatur nulla, neque debitis eos reprehenderit quasi
                    ab ipsum nisi dolorem modi. Quos?
                  </p>
                </div>
                <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
                  <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong" />
                  <div id="radius-shape-2" className="position-absolute shadow-5-strong" />
                  <div className=" bg-glass">
                    <div className=" px-4 py-5 px-md-5">
                      <Form
                        // onSubmit={handleSubmit}
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                          remember: true,
                        }}
                        onFinish={handleSubmit}
                      >
                        {/* 2 column grid layout with text inputs for the first and last names */}

                        {/* Email input */}
                        {/* <div className="form-outline mb-4">
                            <input type="email" id="form3Example3" className="form-control"
                              // value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="Nhập Email email"
                              autoFocus
                            />
                            
                          </div> */}

                        <Form.Item
                          name="username"
                          rules={[
                            {
                              required: true,
                              message: 'Please input your Username!',
                            },
                          ]}
                        >
                          <Input prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="Username"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email} />
                        </Form.Item>
                        {/* Password input */}
                        {/* <div className="form-outline mb-4">
                            <input type="password" id="form3Example4" className="form-control"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="Your password"

                            />
                            
                          </div> */}
                        <Form.Item
                          name="password"
                          rules={[
                            {
                              required: true,
                              message: 'Please input your Password!',
                            },
                          ]}
                        >
                          <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                          />
                        </Form.Item>

                        {/* Submit button */}
                        <button type="primary" htmlType="submit" className="btn btn-primary btn-block mb-4">
                          Đăng nhập
                        </button>
                        {/* Register buttons */}
                        <div className="text-center">
                          <p>hoặc đăng nhập bằng:</p>
                          <Button
                            onClick={googleLogin}
                            type="danger"
                            className="mb-3"
                            block
                            shape="round"
                            icon={<GoogleOutlined />}
                            size="large"
                          >
                            Đăng nhập bằng Google
                          </Button>
                        </div>
                      </Form>
                      <div className="d-flex justify-content-between">
                        <Link to="/forgot/password" className=" text-danger">
                          Quên Mật Khẩu
                        </Link>
                        <Link to="/register" className=" text-primary">
                          Tạo Tài Khoản
                        </Link>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>


        </div>
      </div>
    </div>
  );
};

export default Login;
