import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img
              src={"https://todo-list-app-asdfasd.s3.amazonaws.com/logo.png"}
              alt=""
            />
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="/?cat=art">
            <h6>Thông tin du học</h6>
          </Link>
          <Link className="link" to="/?cat=science">
            <h6>Tin tức</h6>
          </Link>
          <Link className="link" to="/?cat=technology">
            <h6>Góc du học sinh</h6>
          </Link>
          <Link className="link" to="/?cat=cinema">
            <h6>Văn hoá các nước</h6>
          </Link>

          <span>{currentUser?.username}</span>
          {currentUser ? (
            <span onClick={logout}>Đăng xuất</span>
          ) : (
            <Link className="link" to="/login">
              Đăng nhập
            </Link>
          )}
          <span className="write">
            <Link className="link" to="/write">
              Tạo bài viết
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
