import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Outlet,
} from "react-router-dom";

import Write from "../../pages/Write";
import Home from "../../pages/Home";
import Single from "../../pages/Single";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Information from "../../pages/Information";
import News from "../../pages/News";
import "../../style/style.css";
import Students from "../../pages/Student";
import Culture from "../../pages/Culture"

const Layout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Information />,
            },
            {
                path: "/post/:id",
                element: <Single />,
            },
            {
                path: "/write",
                element: <Write />,
                children: [{ path: ":id", element: <Write /> }],
            },
            {
                path: "/thong-tin-du-hoc-sinh",
                element: <Information />,
            },
            {
                path: "/tin-tuc",
                element: <News />,
            },
            {
                path:"/goc-du-hoc-sinh",
                element:<Students/>
            },
            {
                path:"/van-hoa-cac-nuoc",
                element: <Culture/>
            }
        ],
    },
]);


export default function StackNavigate() {
    return (
        <div className="app">
            {/* <NotistackProvider> */}
            <div className="container">
                <RouterProvider router={router} />
            </div>
            {/* </NotistackProvider> */}
        </div>
    )
}
