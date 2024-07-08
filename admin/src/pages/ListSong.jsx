import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const URL = import.meta.env.VITE_APP_BACKEND_URL;

const ListSong = () => {
  const [data, setData] = useState([]);

  const fetchSong = async () => {
    try {
      const response = await axios(`${URL}/api/v1/song/list`);
      if (response.status === 200) setData(response.data.songs);
    } catch (error) {
      toast.error("Error fetching song");
    }
  };

  useEffect(() => {
    fetchSong();
  }, []);

  const removeSong = async id => {
    try {
      const response = await axios.post(`${URL}/api/v1/song/remove/${id}`);
      if (response.status === 200) {
        toast.success("Song removed successfully");
        await fetchSong();
      }
    } catch (error) {
      toast.error("Failed to remove song");
    }
  };

  return (
    <div onClick={fetchSong}>
      <p>All Songs List</p>
      <br />
      <div>
        <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
          <b>Image</b>
          <b>Name</b>
          <b>Album</b>
          <b>Duration</b>
          <b>Action</b>
        </div>
        {data.map((item, index) => (
          <div
            key={index}
            className='grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] gap-2.5 p-3 items-center border border-gray-300 text-sm mr-5'
          >
            <img className='w-12 h-12' src={item.image} alt='img' />
            <p>{item.name}</p>
            <p>{item.album}</p>
            <p>{item.duration}</p>
            <p onClick={() => removeSong(item._id)} className='cursor-pointer'>
              x
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListSong;
