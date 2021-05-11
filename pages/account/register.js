import Link from 'next/link';
import { FaUser } from 'react-icons/fa';
import { useState, useEffect, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from '@/components/Layout';
import styles from '@/styles/AuthForm.module.css';
import AuthContext from '@/context/AuthContext';

export default function RegisterPage() {
  const { error, register } = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  useEffect(() => error && toast.error(error));

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username) {
      toast.error('Username is required');
    } else if (password !== passwordConfirm) {
      toast.error('Password do not match');
    }

    register({ username, email, password });
  };
  return (
    <Layout title='User Registration'>
      <section className='text-gray-600 body-font overflow-hidden pt-12 pb-8 pb-12'>
        <div className='lg:w-3/5 mx-auto pl-4 mt-2'>
          <div className={styles.auth}>
            <h1 className='text-4xl font-bold flex text-black'>
              <FaUser /> <span className='ml-4'>Register</span>
            </h1>
            <ToastContainer />
            <form onSubmit={handleSubmit} autoComplete='off'>
              <div>
                <label htmlFor='username'>Username:</label>
                <input
                  type='text'
                  id='username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className='border border-black rounded'
                />
              </div>
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
                <label htmlFor='passwordConfirm'>Confirm Password:</label>
                <input
                  type='password'
                  id='passwordConfirm'
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  className='border border-black rounded'
                />
              </div>
              <div>
                <input
                  type='submit'
                  value='Register'
                  className='items-center bg-red-500 text-white text-xs border-0 py-1 px-3 focus:outline-none hover:bg-red-600 rounded text-base'
                />
              </div>
            </form>
            <p>
              Already have an account?{' '}
              <Link href='/account/login'>
                <a className='font-bold'>Login</a>
              </Link>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
