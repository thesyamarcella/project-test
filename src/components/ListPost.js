import React from 'react';

const ListPost = ({ ideasData }) => {
  return (
    <div className="grid grid-cols-4 gap-4 justify-start">
      {ideasData.map(data => (
        <div key={data.id} className="w-80 h-[23rem] bg-white rounded-xl drop-shadow-xl mb-4">
          <div className="rounded-t-xl overflow-hidden">
            <img src={data.medium_image[0]?.url} alt="Article" className="w-full h-48 object-cover" />
          </div>
          <div className="px-6 py-5">
            <h6 className="text-gray-500 mt-2">{data.created_at}</h6>
            <h4 className="font-semibold mt-1 overflow-hidden line-clamp-3">{data.title}</h4>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListPost;
