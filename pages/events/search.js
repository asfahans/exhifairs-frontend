import qs from 'qs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import EventItem from '@/components/EventItem';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';

export default function SearchPage({ events }) {
  const router = useRouter();

  return (
    <Layout title='Search results'>
      <section className='text-gray-600 body-font overflow-hidden pt-12'>
        <div className='lg:w-4/5 mx-auto pl-4 mt-2'>
          <Link href='/events'>Go Back</Link>
          <h1 className='text-4xl font-bold mt-4 mb-8'>
            Search Results for {router.query.term}
          </h1>
          {events.length === 0 && <h3 className='mb-96'>No events to show</h3>}
        </div>

        {events.map((evt) => (
          <EventItem key={evt.id} evt={evt} />
        ))}
      </section>
    </Layout>
  );
}

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    _where: {
      _or: [
        { name_contains: term },
        { organizer_contains: term },
        { description_contains: term },
        { venue_contains: term },
        { city_contains: term },
      ],
    },
  });

  const res = await fetch(`${API_URL}/events?${query}`);
  const events = await res.json();

  return {
    props: { events },
  };
}
