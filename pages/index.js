import Link from 'next/link';
import EventItem from '@/components/EventItem';
import { API_URL } from '@/config/index';
import Search from '@/components/Search';
import Footer from '@/components/Footer';
import AuthContext from '@/context/AuthContext';
import { useContext } from 'react';

export default function HomePage({ events }) {
  const { user, logout } = useContext(AuthContext);
  return (
    <>
      <header className='text-gray-600 bg-white body-font pt-6 header-bg'>
        <div className='container-2xl mx-auto flex flex-wrap px-10 p-5 flex-col md:flex-row items-center'>
          <Link href='/'>
            <a className='flex title-font font-medium items-center text-white mb-4 md:mb-0'>
              <span className='ml-3 text-3xl font-bold'>ExhiFairs</span>
            </a>
          </Link>

          <div className='md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center md:w-1/2 lg:w-2/5 xl:w-1/4 w-4/5'>
            <Search />
          </div>

          {user ? (
            <>
              <button
                onClick={() => logout()}
                className='inline-flex items-center bg-red-500 text-white text-xs border-0 py-1 px-3 focus:outline-none hover:bg-red-600 ml-4 rounded text-base mt-4 md:mt-0'
              >
                <span className='text-sm'>Logout</span>
              </button>
            </>
          ) : (
            <Link href='/account/login'>
              <a className='inline-flex items-center bg-red-500 text-white text-xs border-0 py-1 px-3 focus:outline-none hover:bg-red-600 ml-4 rounded text-base mt-4 md:mt-0 text-sm'>
                <span className='text-sm'>Login</span>
              </a>
            </Link>
          )}
        </div>

        <div className='mx-auto w-min mt-32'>
          <div className='text-6xl font-bold text-white'>
            Connecting Researcher, Building Communities
          </div>

          <div className='bg-black text-white p-4 mt-6'>
            Get upcoming details of conferences, events, seminars & workshops in
            India
          </div>
        </div>
      </header>

      <section className='text-gray-600 body-font overflow-hidden pt-12'>
        <div className='lg:w-4/5 mx-auto flex flex-wrap pl-4 mt-2'>
          <h1 className='text-4xl font-bold'>Upcoming Events</h1>
          {events.length === 0 && <h3>No events to show</h3>}
        </div>

        {events.map((evt) => (
          <EventItem key={evt.id} evt={evt} />
        ))}
        {events.length > 0 && (
          <div class='lg:w-4/5 mx-auto flex flex-wrap pl-4 mb-10'>
            <Link href='/events'>
              <a className='flex text-white bg-black border-0 py-1 px-6 focus:outline-none hover:bg-red-600 rounded'>
                View All Events
              </a>
            </Link>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/events?_sort=fromDate:ASC&_limit=3`);
  const events = await res.json();

  return {
    props: { events },
    revalidate: 1,
  };
}
