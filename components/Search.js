import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Search() {
  const [term, setTerm] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/events/search?term=${term}`);
    setTerm('');
  };

  return (
    <div className='w-full'>
      <form onSubmit={handleSubmit} autoComplete='off'>
        <input
          type='text'
          name='hero-field'
          placeholder='Search by Event name, Company name or City'
          className='w-full bg-white rounded-full border border-gray-300 focus:ring-1 focus:ring-gray-300 focus:bg-gray-100 focus:border-gray-300 text-base outline-none text-gray-500 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out text-center search-box'
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
      </form>
    </div>
  );
}
