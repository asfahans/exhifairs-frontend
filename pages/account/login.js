import Link from 'next/link';
import { FaUser } from 'react-icons/fa';
import { useState, useEffect, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from '@/components/Layout';
import styles from '@/styles/AuthForm.module.css';
import AuthContext from '@/context/AuthContext';

export default function LoginPage() {
  const { error, login } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => error && toast.error(error));

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };
  return (
    <Layout title='User Login'>
      <section className='text-gray-600 body-font overflow-hidden pt-12 pb-64'>
        <div className='lg:w-3/5 mx-auto pl-4 mt-2'>
          <div className={styles.auth}>
            <h1 className='text-4xl font-bold flex text-black'>
              <FaUser /> <span className='ml-4'>Login</span>
            </h1>
            <ToastContainer />
            <form onSubmit={handleSubmit} autoComplete='off'>
              <div>
                <label htmlFor='email'>Email Address:</label>
                <input
                  type='email'
                  id='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='border border-black rounded'
                />
              </div>
              <div>
                <label htmlFor='password'>Password:</label>
                <input
                  type='password'
                  id='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='border border-black rounded'
                />
              </div>
              <div>
                <input
                  type='submit'
                  value='Login'
                  className='items-center bg-red-500 text-white text-xs border-0 py-1 px-3 focus:outline-none hover:bg-red-600 rounded text-base'
                />
              </div>
            </form>
            <p>
              Don't have an account?{' '}
              <Link href='/account/register'>
                <a className='font-bold'>Register</a>
              </Link>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
