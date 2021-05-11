import { API_URL } from '@/config/index';
import { useState } from 'react';
import styles from '@/styles/Form.module.css';

export default function ImageUpload({ evtId, imageUploaded, token }) {
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('files', image);
    formData.append('ref', 'events');
    formData.append('refId', evtId);
    formData.append('field', 'image');

    const res = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (res.ok) {
      imageUploaded();
    }
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className={styles.form}>
      <h1 className='text-xl font-bold flex text-black mb-4'>
        Upload Event Image
      </h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type='file' onChange={handleFileChange} />
        </div>
        <input
          type='submit'
          value='upload'
          className='items-center bg-red-500 text-white text-xs border-0 py-1 px-3 focus:outline-none hover:bg-red-600 rounded text-base'
        />
      </form>
    </div>
  );
}
