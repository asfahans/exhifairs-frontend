import Link from 'next/link';
import Image from 'next/image';

export default function EventItem({ evt }) {
  return (
    <div className='container-2xl px-5 py-12 mx-auto'>
      <div className='lg:w-4/5 mx-auto flex flex-wrap'>
        <Image
          className='lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded'
          src={
            evt.image
              ? evt.image.formats.small.url
              : '/images/event-default.png'
          }
          width={650}
          height={350}
        />
        <div className='lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0'>
          <h1 className='text-gray-900 text-3xl title-font font-medium mb-1'>
            {evt.name}
          </h1>
          <h2 class='text-sm title-font text-gray-500 tracking-widest mb-4'>
            {evt.city}
          </h2>

          <p className='leading-relaxed'>{evt.description}</p>

          <Link href={`/events/${evt.slug}`}>
            <a className='flex text-white bg-red-500 border-0 mt-6 py-2 px-6 focus:outline-none hover:bg-red-600 rounded w-min'>
              Details
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
