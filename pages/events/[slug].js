import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import styles from '@/styles/Event.module.css';

import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';

export default function EventPage({ evt }) {
  const router = useRouter();

  return (
    <Layout>
      <section className='text-gray-600 body-font overflow-hidden pt-12'>
        <div className='container-2xl px-5 py-12 mx-auto'>
          <div className='lg:w-4/5 mx-auto'>
            <h1 className='text-3xl font-bold text-black mb-1'>{evt.name}</h1>
            <p className='mb-8'>
              {moment(evt.fromDate).format('D MMM YYYY')} -{' '}
              {moment(evt.toDate).format('D MMM YYYY')}
            </p>
            <ToastContainer />
            {evt.image && (
              <div className={styles.image}>
                <Image
                  src={evt.image.formats.medium.url}
                  height={600}
                  width={960}
                />
              </div>
            )}

            <h3 className='text-xl font-bold text-black mb-2'>Organizer:</h3>
            <p className='text-black mb-8'>{evt.organizer}</p>

            <h3 className='text-xl font-bold text-black mb-2'>
              Event Description:
            </h3>
            <p className='text-black mb-8'>{evt.description}</p>

            <h3 className='text-xl font-bold text-black mb-2'>
              Venue: {evt.venue}
            </h3>
            <p className='text-black mb-8'>{evt.address}</p>

            <h3 className='text-xl font-bold text-black mb-2'>City:</h3>
            <p className='text-black mb-8'>{evt.city}</p>

            <h3 className='text-xl font-bold text-black mb-2'>Website:</h3>
            <p className='text-black mb-8'>
              <a target='_blank' href={`http://${evt.website}`}>
                {evt.website}
              </a>
            </p>

            <Link href='/events'>
              <a className={styles.back}>{'<'} Go Back</a>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

// FOR STATIC WEBSITE
// export async function getStaticPaths() {
//   const res = await fetch(`${API_URL}/events`);
//   const events = await res.json();

//   const paths = events.map((evt) => ({
//     params: { slug: evt.slug },
//   }));

//   return {
//     paths,
//     fallback: true,
//   };
// }

// export async function getStaticProps({ params: { slug } }) {
//   const res = await fetch(`${API_URL}/events?slug=${slug}`);
//   const events = await res.json();

//   return {
//     props: { evt: events[0] },
//     revalidate: 1,
//   };
// }

export async function getServerSideProps({ query: { slug } }) {
  const res = await fetch(`${API_URL}/events?slug=${slug}`);
  const events = await res.json();

  return {
    props: { evt: events[0] },
  };
}
