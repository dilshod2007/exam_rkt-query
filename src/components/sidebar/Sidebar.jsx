import React from 'react';
import { Link } from 'react-router-dom';
import { AudioOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { useLocation } from 'react-router-dom';
import "../sidebar/sidebar.css"

const { Search } = Input;
const suffix = (
    <AudioOutlined
        style={{
            fontSize: 16,
            color: '#1677ff',
        }}
    />
);

const Sidebar = () => {
    const { pathname } = useLocation();

    if (pathname.includes("auth") || pathname.includes("dashboard")) return null;
    if (pathname.includes("/details")) return null;


    const onSearch = (value) => {
        console.log(value);
    };

    return (
        <div className=' sidebar flex items-center justify-between w-full p-4 shadow-lg sticky top-0 z-10'>
            <Link to='/'>
               <div>
                <span className='text-[40px] ml-[20px] ' > D</span>
                <span className='text-[40px] ml-[-15px] ' >U</span>
                <span className='text-[40px] ml-[-10px] ' >F</span>
               </div>
            </Link>

            <div className='w-full max-w-lg mx-4'>
                <Search
                    className='w-full'
                    placeholder="Search..."
                    enterButton="Search"
                    size="large"
                    suffix={suffix}
                    onSearch={onSearch}
                />
            </div>

            <ul className='flex space-x-6'>
                <li>
                    <Link className='text-blue-500 hover:text-blue-700' to='/auth/login'>Login</Link>
                </li>
                <li>
                    <Link className='text-blue-500 hover:text-blue-700' to='/auth/signup'>Signup</Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;