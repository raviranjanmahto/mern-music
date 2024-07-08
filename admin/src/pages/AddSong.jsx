import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const AddSong = () => {
  const [image, setImage] = useState(false);
  const [audio, setAudio] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [album, setAlbum] = useState("none");
  const [loading, setLoading] = useState(false);
  const [albumData, setAlbumData] = useState([]);

  const URL = import.meta.env.VITE_APP_BACKEND_URL;

  const onSubmitHandler = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", image);
      formData.append("audio", audio);
      formData.append("name", name);
      formData.append("desc", desc);
      formData.append("album", album);

      const response = await axios.post(`${URL}/api/v1/song/add`, formData);
      if (response.status === 201) {
        toast.success("Song added successfully.");
        setName("");
        setDesc("");
        setAlbum("none");
        setImage(false);
        setAudio(false);
      }
    } catch (error) {
      toast.error("Failed to add song. Please try again.");
    }
    setLoading(false);
  };

  useEffect(() => {
    const loadAlbumData = async () => {
      try {
        const response = await axios(`${URL}/api/v1/album/list`);
        if (response.status === 200) setAlbumData(response.data.albums);
      } catch (error) {
        toast.error("Failed to load albums. Please try again.");
      }
    };

    loadAlbumData();
  }, [URL]);

  if (loading)
    return (
      <div className='grid place-items-center min-h-[80vh]'>
        <div className='w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin' />
      </div>
    );

  return (
    <form
      onSubmit={onSubmitHandler}
      className='flex flex-col items-start gap-8 text-gray-800'
    >
      <div className='flex gap-8'>
        <div className='flex flex-col gap-4'>
          <p>Upload song*</p>
          <input
            onChange={e => setAudio(e.target.files[0])}
            type='file'
            id='song'
            accept='audio/*'
            hidden
            required
          />
          <label htmlFor='song'>
            <img
              src={audio ? assets.upload_added : assets.upload_song}
              className='w-24 cursor-pointer'
              alt='upload icon'
            />
          </label>
        </div>
        <div className='flex flex-col gap-4'>
          <p>Upload image*</p>
          <input
            onChange={e => setImage(e.target.files[0])}
            type='file'
            id='image'
            accept='image/*'
            hidden
            required
          />
          <label htmlFor='image'>
            <img
              src={
                image ? window.URL.createObjectURL(image) : assets.upload_area
              }
              className='w-24 cursor-pointer'
              alt='upload icon'
            />
          </label>
        </div>
      </div>

      <div className='flex flex-col gap-2.5'>
        <p>Song name*</p>
        <input
          onChange={e => setName(e.target.value)}
          value={name}
          className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]'
          placeholder='Enter song name here'
          required
          type='text'
        />
      </div>

      <div className='flex flex-col gap-2.5'>
        <p>Song description*</p>
        <input
          onChange={e => setDesc(e.target.value)}
          value={desc}
          className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]'
          placeholder='Enter song description here'
          required
          type='text'
        />
      </div>

      <div className='flex flex-col gap-2.5'>
        <p>Album*</p>
        <select
          onChange={e => setAlbum(e.target.value)}
          defaultValue={album}
          className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]'
          required
        >
          <option value=''>Select from below</option>
          {albumData?.map((item, index) => (
            <option key={index} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type='submit'
        className='text-base bg-green-800 text-white py-2.5 w-[max(40vw,250px)] hover:bg-green-700 ease-in-out duration-200 hover:border-gray-400 border-2'
      >
        Add
      </button>
    </form>
  );
};

export default AddSong;
