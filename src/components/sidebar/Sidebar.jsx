import React from 'react';
import { Link } from 'react-router-dom';
import { AudioOutlined, LoginOutlined, UserAddOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { useLocation } from 'react-router-dom';

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
        <div className='sidebar flex items-center justify-between w-full p-4 shadow-md sticky top-0 z-10 bg-[rgba(238,230,230,0.218)]'>
            <Link to='/' className='flex items-center'>
                <div className='text-[40px] ml-4 flex items-center'>
                    <span className='text-blackml-4'>D</span>
                    <span className='text-black ml-[-10px]'>U</span>
                    <span className='text-black ml-[-10px]'>F</span>
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
                    <Link className='flex items-center text-blue-500 hover:text-blue-700' to='/auth/login'>
                        <LoginOutlined className='mr-1' />
                        Login
                    </Link>
                </li>
                <li>
                    <Link className='flex items-center text-blue-500 hover:text-blue-700' to='/auth/signup'>
                        <UserAddOutlined className='mr-1' />
                        Signup
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
