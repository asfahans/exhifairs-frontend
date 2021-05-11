import Link from 'next/link';
import { PER_PAGE } from '@/config/index';

export default function Pagination({ page, total }) {
  const lastPage = Math.ceil(total / PER_PAGE);
  return (
    <>
      {page > 1 && (
        <Link href={`/events?page=${page - 1}`}>
          <a className='flex text-white bg-black border-0 py-1 px-6 focus:outline-none hover:bg-red-600 rounded'>
            Prev
          </a>
        </Link>
      )}

      {page < lastPage && (
        <Link href={`/events?page=${page + 1}`}>
          <a className='flex text-white bg-black border-0 py-1 px-6 focus:outline-none hover:bg-red-600 rounded'>
            Next
          </a>
        </Link>
      )}
    </>
  );
}
