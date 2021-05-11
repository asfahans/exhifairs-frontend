import Link from 'next/link';
import styles from '../styles/Footer.module.css';

export default function Footer() {
  return (
    <>
      <hr />

      <footer className='text-gray-600 body-font'>
        <div className='container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col'>
          <a className='flex title-font font-medium items-center md:justify-start justify-center text-gray-900'>
            <span className='ml-3 text-xl font-bold'>ExhiFairs</span>
          </a>
          <p className='text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4'>
            Copyright © 2021 ExhiFairs
          </p>
          <span className='inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start'>
            <Link href='/terms'>
              <a className='font-bold text-sm text-red-500'>Terms of service</a>
            </Link>
          </span>
        </div>
      </footer>
    </>
  );
}
