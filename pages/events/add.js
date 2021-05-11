import { parseCookies } from '@/helpers/index';
import Layout from '@/components/Layout';
import styles from '@/styles/Form.module.css';
import { API_URL } from '@/config/index';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddEventPage({ token }) {
  const router = useRouter();

  const [values, setValues] = useState({
    name: '',
    organizer: '',
    venue: '',
    address: '',
    fromDate: '',
    toDate: '',
    city: '',
    website: '',
    description: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ''
    );

    if (hasEmptyFields) {
      toast.error('Please fill in all fields');
    }

    const res = await fetch(`${API_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        toast.error('No token included');
        return;
      }
      toast.error('Something Went Wrong');
    } else {
      const evt = await res.json();
      router.push(`/events/${evt.slug}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <Layout title='Add New Event'>
      <section className='text-gray-600 body-font overflow-hidden pt-12 pb-8 pb-12'>
        <div className='lg:w-3/5 mx-auto pl-4 mt-2'>
          <Link href='/events'>Go Back</Link>
          <h1 className='text-4xl font-bold flex text-black mt-4 mb-8'>
            Add Event
          </h1>
          <ToastContainer />
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.grid}>
              <div>
                <label htmlFor='name'>Event Name</label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  value={values.name}
                  onChange={handleInputChange}
                  className='border border-black rounded'
                />
              </div>
              <div>
                <label htmlFor='organizer'>Organizer</label>
                <input
                  type='text'
                  name='organizer'
                  id='organizer'
                  value={values.organizer}
                  onChange={handleInputChange}
                  className='border border-black rounded'
                />
              </div>
              <div>
                <label htmlFor='fromDate'>From Date</label>
                <input
                  type='date'
                  name='fromDate'
                  id='fromDate'
                  value={values.fromDate}
                  onChange={handleInputChange}
                  className='border border-black rounded'
                />
              </div>
              <div>
                <label htmlFor='toDate'>To Date</label>
                <input
                  type='date'
                  name='toDate'
                  id='toDate'
                  value={values.toDate}
                  onChange={handleInputChange}
                  className='border border-black rounded'
                />
              </div>
              <div>
                <label htmlFor='venue'>Venue</label>
                <input
                  type='text'
                  name='venue'
                  id='venue'
                  value={values.venue}
                  onChange={handleInputChange}
                  className='border border-black rounded'
                />
              </div>
              <div>
                <label htmlFor='address'>Address</label>
                <input
                  type='text'
                  name='address'
                  id='address'
                  value={values.address}
                  onChange={handleInputChange}
                  className='border border-black rounded'
                />
              </div>
              <div>
                <label htmlFor='city'>City</label>
                <input
                  type='text'
                  name='city'
                  id='city'
                  value={values.city}
                  onChange={handleInputChange}
                  className='border border-black rounded'
                />
              </div>
              <div>
                <label htmlFor='website'>Website</label>
                <input
                  type='text'
                  name='website'
                  id='website'
                  value={values.website}
                  onChange={handleInputChange}
                  className='border border-black rounded'
                />
              </div>
            </div>

            <div>
              <label htmlFor='description'>Event Description</label>
              <textarea
                type='text'
                name='description'
                id='description'
                value={values.description}
                onChange={handleInputChange}
                className='border border-black rounded p-2'
              ></textarea>
            </div>

            <input
              type='submit'
              value='Add Event'
              className='items-center bg-red-500 text-white text-xs border-0 py-1 px-3 focus:outline-none hover:bg-red-600 rounded text-base'
            />
          </form>
        </div>
      </section>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  return {
    props: {
      token,
    },
  };
}
