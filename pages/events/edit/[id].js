import { parseCookies } from '@/helpers/index';
import Layout from '@/components/Layout';
import Modal from '@/components/Modal';
import styles from '@/styles/Form.module.css';
import { API_URL } from '@/config/index';
import ImageUpload from '@/components/ImageUpload';

import { FaImage } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';

export default function EditEventPage({ evt, token }) {
  const router = useRouter();

  const [values, setValues] = useState({
    name: evt.name,
    organizer: evt.organizer,
    venue: evt.venue,
    address: evt.address,
    fromDate: evt.fromDate,
    toDate: evt.toDate,
    city: evt.city,
    website: evt.website,
    description: evt.description,
  });

  const [imagePreview, setImagePreview] = useState(
    evt.image ? evt.image.formats.thumbnail.url : null
  );

  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ''
    );

    if (hasEmptyFields) {
      toast.error('Please fill in all fields');
    }

    const res = await fetch(`${API_URL}/events/${evt.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        toast.error('Unauthorized');
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

  const imageUploaded = async (e) => {
    const res = await fetch(`${API_URL}/events/${evt.id}`);
    const data = await res.json();
    setImagePreview(data.image.formats.thumbnail.url);
    setShowModal(false);
  };

  return (
    <Layout title='Edit Event'>
      <section className='text-gray-600 body-font overflow-hidden pt-12 pb-8 pb-12'>
        <div className='lg:w-3/5 mx-auto pl-4 mt-2'>
          <Link href='/events'>Go Back</Link>
          <h1 className='text-4xl font-bold flex text-black mt-4 mb-8'>
            Edit Event
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
                  value={moment(values.fromDate).format('yyyy-MM-DD')}
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
                  value={moment(values.toDate).format('yyyy-MM-DD')}
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
              value='Edit Event'
              className='items-center bg-red-500 text-white text-xs border-0 py-1 px-3 focus:outline-none hover:bg-red-600 rounded text-base'
            />
          </form>

          <h2 className='text-2xl font-bold flex text-black my-4'>
            Event Image
          </h2>
          {imagePreview ? (
            <Image src={imagePreview} height={100} width={170} />
          ) : (
            <div>
              <p>No Image uploaded</p>
            </div>
          )}
          <div>
            <button
              onClick={() => setShowModal(true)}
              className='flex items-center bg-black text-white text-xs border-0 mt-2 py-1 px-3 focus:outline-none hover:bg-gray-600 rounded text-base'
            >
              <FaImage />
              <span className='ml-2'>Set Image</span>
            </button>
          </div>

          <Modal show={showModal} onClose={() => setShowModal(false)}>
            <ImageUpload
              evtId={evt.id}
              imageUploaded={imageUploaded}
              token={token}
            />
          </Modal>
        </div>
      </section>
    </Layout>
  );
}

export async function getServerSideProps({ params: { id }, req }) {
  const res = await fetch(`${API_URL}/events/${id}`);
  const evt = await res.json();

  const { token } = parseCookies(req);

  return {
    props: { evt, token },
  };
}
