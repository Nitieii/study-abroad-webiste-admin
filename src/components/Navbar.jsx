import React, { useContext } from "react";
import { Link } from "react-router-dom";
import useAuthentication from "../hooks/useAuthentication";

const Navbar = () => {
  const { isAuthenticated, handleLogout } = useAuthentication();

  React.useEffect(() => {
    // const access = localStorage.getItem()
  })

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/thong-tin-du-hoc-sinh">
            <img
              src={"https://todo-list-app-asdfasd.s3.amazonaws.com/logo.png"}
              alt=""
            />
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="/thong-tin-du-hoc-sinh">
            <h6>Thông tin du học</h6>
          </Link>
          <Link className="link" to="/tin-tuc">
            <h6>Tin tức</h6>
          </Link>
          <Link className="link" to="/goc-du-hoc-sinh">
            <h6>Góc du học sinh</h6>
          </Link>
          <Link className="link" to="/van-hoa-cac-nuoc">
            <h6>Văn hoá các nước</h6>
          </Link>

          {isAuthenticated ? (
            <Link to="/login" onClick={handleLogout}>
              Đăng xuất
            </Link>
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
