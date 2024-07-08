import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const URL = import.meta.env.VITE_APP_BACKEND_URL;

const ListAlbum = () => {
  const [data, setData] = useState([]);

  const fetchAlbum = async () => {
    try {
      const response = await axios(`${URL}/api/v1/album/list`);
      if (response.status === 200) setData(response.data.albums);
    } catch (error) {
      toast.error("Error fetching album");
    }
  };

  useEffect(() => {
    fetchAlbum();
  }, []);

  const removeAlbum = async id => {
    try {
      const response = await axios.post(`${URL}/api/v1/album/remove/${id}`);
      if (response.status === 200) {
        toast.success("Album removed successfully");
        await fetchAlbum();
      }
    } catch (error) {
      toast.error("Error removing album");
    }
  };

  return (
    <div>
      <p>All Album List</p>
      <br />
      <div>
        <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
          <b>Image</b>
          <b>Name</b>
          <b>Description</b>
          <b>Album Colour</b>
          <b>Action</b>
        </div>
        {data.map((item, index) => (
          <div
            key={index}
            className='grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5'
          >
            <img className='w-12 h-12' src={item.image} alt='img' />
            <p>{item.name}</p>
            <p>{item.desc}</p>
            <input type='color' value={item.bgColor} disabled />
            <p className='cursor-pointer' onClick={() => removeAlbum(item._id)}>
              x
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListAlbum;
