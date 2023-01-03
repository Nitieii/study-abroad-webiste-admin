import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Outlet,
} from "react-router-dom";
import Register from "../../pages/Register"
import Login from "../../pages/Login"
import React from 'react'
import Navigation from "./Navigation";

const LayOut = () => {
    return (
        <>
            <Navigation/>
            <Outlet />
        </>
    )
}

const router = createBrowserRouter([

    {
        path: "/",
        element: <LayOut />,
        children: [
            {
                path:"/",
                element:<Login/>,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
        ]
    }


])



function AuthStackNavigate() {
    return (
        <>
            <div className="app-auth">
                {/* <NotistackProvider> */}
                <div className="container-auth">
                    <RouterProvider router={router} />
                </div>
                {/* </NotistackProvider> */}
            </div>
        </>
    )
}

export default AuthStackNavigate