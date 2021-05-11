import Link from 'next/link';
import styles from '@/styles/Header.module.css';
import Search from './Search';
import AuthContext from '@/context/AuthContext';
import { useContext } from 'react';

import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

export default function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className='text-gray-600 bg-white body-font shadow-lg mb-2'>
      <div className='container-2xl mx-auto flex flex-wrap px-10 p-5 flex-col md:flex-row items-center'>
        <Link href='/'>
          <a className='flex title-font font-medium items-center text-red-600 mb-4 md:mb-0'>
            <span className='ml-3 text-3xl font-bold'>ExhiFairs</span>
          </a>
        </Link>

        <div className='md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center md:w-1/2 lg:w-2/5 xl:w-1/4 w-4/5'>
          <Search />
        </div>

        <Link href='/events'>
          <a className='px-2 mx-2 hover:text-red-600'>Events</a>
        </Link>

        {user ? (
          <>
            <Link href='/events/add'>
              <a className='px-2 mx-2 hover:text-red-600'>Add Event</a>
            </Link>

            <Link href='/account/dashboard'>
              <a className='px-2 mx-2 hover:text-red-600'>Dashboard</a>
            </Link>
            <button
              onClick={() => logout()}
              className='inline-flex items-center bg-red-500 text-white text-xs border-0 py-1 px-3 focus:outline-none hover:bg-red-600 ml-4 rounded text-base mt-4 md:mt-0'
            >
              <span className='text-sm'>Logout</span>
            </button>
          </>
        ) : (
          <>
            <Link href='/account/login'>
              <a className='inline-flex items-center bg-red-500 text-white text-xs border-0 py-1 px-3 focus:outline-none hover:bg-red-600 ml-4 rounded text-base mt-4 md:mt-0 text-sm'>
                <span className='text-sm'>Login</span>
              </a>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
