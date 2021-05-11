import { parseCookies } from '@/helpers/index';
import Layout from '@/components/Layout';
import DashboardEvent from '@/components/DashboardEvent';
import { API_URL } from '@/config/index';

import { useRouter } from 'next/router';

export default function DashboardPage({ events, token }) {
  const router = useRouter();

  const deleteEvent = async (id) => {
    if (confirm('Are you sure?')) {
      const res = await fetch(`${API_URL}/events/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.push(`/events`);
      }
    }
  };
  return (
    <Layout title='Dashboard'>
      <section className='text-gray-600 body-font overflow-hidden pt-12 pb-8'>
        <div className='lg:w-3/5 mx-auto pl-4 mt-2'>
          <h1 className='text-4xl font-bold'>Dashboard</h1>
          <h3 className='text-2xl font-bold mt-8 mb-4 text-red-500'>
            My Events
          </h3>

          {events.map((evt) => (
            <DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent} />
          ))}
        </div>
      </section>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  const res = await fetch(`${API_URL}/events/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const events = await res.json();

  return {
    props: {
      events,
      token,
    },
  };
}
