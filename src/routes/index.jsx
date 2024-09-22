import { useRoutes } from "react-router-dom";
import { Suspense, lazy, useState, useEffect } from "react";
const User = lazy(() => import("../routes/user/User"));
const Auth = lazy(() => import("../routes/auth/Auth"));
const Login = lazy(() => import("../routes/auth/login/Login"));
const Signup = lazy(() => import("../routes/auth/signup/Signup"));
const Dashboard = lazy(() => import("../routes/dashboard/Dashboard"));
import { Spin } from 'antd';
import { Link } from "react-router-dom";
const Details = lazy(() => import("../routes/details/Details"));

const SuspenseWithDelay = ({ children }) => {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false); 
    }, 2500);  

    return () => clearTimeout(timer);
  }, []);

  return (
    <Suspense fallback={showLoading ? <Spin size="large" className="flex justify-center items-center h-screen w-screen" /> : null}>
      {children}
    </Suspense>
  );
};

const RouteController = () => {
  return useRoutes([
    {
      path: "/",
      element: (
        <SuspenseWithDelay>
          <User />
        </SuspenseWithDelay>
      ),
    },
    {
      path: "/auth",
      element: (
        <SuspenseWithDelay>
          <Auth />
        </SuspenseWithDelay>
      ),
      children: [
        {
          path: "/auth/login",
          element: (
            <SuspenseWithDelay>
              <Login />
            </SuspenseWithDelay>
          ),
        },
        {
          path: "/auth/signup",
          element: (
            <SuspenseWithDelay>
              <Signup />
            </SuspenseWithDelay>
          ),
        },
      ],
    },
    {
      path: "/dashboard",
      element: (
        <SuspenseWithDelay>
          <Dashboard />
        </SuspenseWithDelay>
      ),
    },
    {
 path: "/details/:id",
 element: (
   <SuspenseWithDelay>
     <Details />
   </SuspenseWithDelay>
 )
    },
    {
      path: "*",
      element: (
        <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
          <h1 className="text-6xl font-bold text-red-500">404</h1>
          <p className="text-2xl text-gray-700 mt-4">Oops! Page Not Found</p>
          <p className="text-md text-gray-500 mt-2">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/">
            <button className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
              Go to Homepage
            </button>
          </Link>
        </div>
      ),
    }
    
  ]);
};

export default RouteController;
