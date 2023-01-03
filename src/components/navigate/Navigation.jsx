import React from 'react'
import { Link } from "react-router-dom";
import "../../style/style.css"

function Navigation() {
  return (
    <div className='AuthNavigation'>
        <div className='link-container'>
            <div className='links'>
                <Link className='link' to="/login">
                    <h2>Đăng Nhập</h2>
                </Link>
                <Link className='link' to="/register">
                    <h2>Đăng ký</h2>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Navigation