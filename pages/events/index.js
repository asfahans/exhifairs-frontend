import EventItem from '@/components/EventItem';
import Layout from '@/components/Layout';
import Pagination from '@/components/Pagination';
import { API_URL, PER_PAGE } from '@/config/index';

export default function EventsPage({ events, page, total }) {
  return (
    <Layout>
      <section className='text-gray-600 body-font overflow-hidden pt-12'>
        <div className='lg:w-4/5 mx-auto flex flex-wrap pl-4 mt-2'>
          <h1 className='text-4xl font-bold'>Events</h1>
          {events.length === 0 && <h3>No events to show</h3>}
        </div>

        {events.map((evt) => (
          <EventItem key={evt.id} evt={evt} />
        ))}
        <div className='lg:w-4/5 mx-auto flex flex-wrap pl-4 mb-10'>
          <Pagination page={page} total={total} />
        </div>
      </section>
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  // Calculate start page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  // Fetch total/count
  const totalRes = await fetch(`${API_URL}/events/count`);
  const total = await totalRes.json();

  // Fetch events
  const eventRes = await fetch(
    `${API_URL}/events?_sort=fromDate:ASC&_limit=${PER_PAGE}&_start=${start}`
  );
  const events = await eventRes.json();

  return {
    props: { events, page: +page, total },
  };
}
