import React, { useState } from 'react';
import Slider from 'react-slick';

const EditFoto = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length + selectedImages.length <= 5) {
      const newImages = files.map((file) => URL.createObjectURL(file));
      setSelectedImages([...selectedImages, ...newImages]);
    } else {
      alert('Maksimal 5 gambar!');
    }
  };

  const handleRemoveImage = (index) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    if (selectedImages.length > 0) {
      console.log('Title:', title);
      console.log('Description:', description);
      console.log('Images:', selectedImages);
      alert('Data berhasil diupload!');
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, // Menonaktifkan panah navigasi
  };

  return (
    <div className="absolute top-20 left-16 w-80 h-auto p-4 shadow rounded-lg z-50" style={{ left: '270px', backgroundColor: '#EEEEEE' }}>
      {/* Input untuk memilih file */}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        multiple
        className="mb-4 block w-full text-sm text-gray-600 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
      />

      {/* Preview Gambar dengan Slider */}
      {selectedImages.length > 0 && (
        <div className="mb-2" style={{ width: '300px', height: '200px' }}>
          <Slider {...settings}>
            {selectedImages.map((image, index) => (
              <div
                key={`slider-${index}`}
                className="relative"
                style={{ width: '300px', height: '150px' }}
              >
                {/* Tombol Silang Minimalis */}
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-2 right-2 text-white bg-black bg-opacity-50 hover:bg-opacity-80 rounded-full w-6 h-6 flex items-center justify-center text-sm"
                >
                  <span className="font-bold text-xs">×</span>
                </button>
                <img
                  src={image}
                  alt={`Preview ${index}`}
                  className="rounded-lg border mb-2"
                  style={{
                    maxHeight: '150px',
                    width: '300px',
                    objectFit: 'cover',
                  }}
                />
              </div>
            ))}
          </Slider>
        </div>
      )}

      {/* Kolom Judul */}
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Masukkan judul"
        />
      </div>

      {/* Kolom Deskripsi */}
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Masukkan deskripsi"
          rows={3}
        />
      </div>

      {/* Tombol Upload di sisi kanan */}
      <div className="flex justify-end">
        <button
          onClick={handleUpload}
          className="bg-black hover:bg-gray-400 text-white py-2 px-4 rounded-full"
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default EditFoto;
