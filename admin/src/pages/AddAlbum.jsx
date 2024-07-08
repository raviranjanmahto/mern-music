import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { useState } from "react";
import axios from "axios";

const URL = import.meta.env.VITE_APP_BACKEND_URL;

const AddAlbum = () => {
  const [image, setImage] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(e.target);
      const response = await axios.post(`${URL}/api/v1/album/add`, formData);
      if (response.status === 200) {
        toast.success("Album added successfully");
        setImage(false);
      }
    } catch (error) {
      toast.error("Failed to add album. Please try again.");
    }
    setLoading(false);
  };

  if (loading)
    return (
      <div className='grid place-items-center min-h-[80vh]'>
        <div className='w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin' />
      </div>
    );

  return (
    <form
      onSubmit={handleFormSubmit}
      className='flex flex-col items-start gap-8 text-gray-600'
    >
      <div className='flex flex-col gap-4'>
        <p>Upload image*</p>
        <input
          onChange={e => setImage(e.target.files[0])}
          type='file'
          id='image'
          accept='image/*'
          hidden
          name='image'
          required
        />
        <label htmlFor='image'>
          <img
            className='w-24 cursor-pointer'
            src={image ? window.URL.createObjectURL(image) : assets.upload_area}
            alt=''
          />
        </label>
      </div>

      <div className='flex flex-col gap-2.5'>
        <p>Album name*</p>
        <input
          className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]'
          type='text'
          name='name'
          placeholder='Enter album name here'
          required
        />
      </div>

      <div className='flex flex-col gap-2.5'>
        <p>Album description*</p>
        <input
          className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]'
          type='text'
          name='desc'
          placeholder='Enter album description here'
          required
        />
      </div>

      <div className='flex flex-col gap-2.5'>
        <p>Background color</p>
        <input
          className='w-[max(40vw,250px)] h-12 border-gray-400 border-2 cursor-pointer'
          type='color'
          name='bgColor'
          defaultValue='#00FF5B'
        />
      </div>

      <button
        className='w-[max(40vw,250px)] p-2.5 border-2 bg-green-800 text-white hover:bg-green-700
        hover:border-gray-400 ease-in-out duration-200'
        type='submit'
      >
        Add
      </button>
    </form>
  );
};

export default AddAlbum;
