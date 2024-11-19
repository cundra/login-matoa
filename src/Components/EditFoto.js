import React, { useState } from 'react';
import Slider from 'react-slick';

const EditFoto = () => {
  const [containers, setContainers] = useState(
    Array.from({ length: 30 }, () => ({
      selectedImages: [],
      title: '',
      description: '',
    }))
  );

  const handleImageChange = (event, index) => {
    const files = Array.from(event.target.files);
    setContainers((prev) =>
      prev.map((container, i) => {
        if (i === index) {
          const newImages = files.map((file) => URL.createObjectURL(file));
          return {
            ...container,
            selectedImages: [
              ...container.selectedImages,
              ...newImages,
            ].slice(0, 5), // Maksimal 5 gambar
          };
        }
        return container;
      })
    );
  };

  const handleRemoveImage = (containerIndex, imageIndex) => {
    setContainers((prev) =>
      prev.map((container, i) => {
        if (i === containerIndex) {
          return {
            ...container,
            selectedImages: container.selectedImages.filter(
              (_, j) => j !== imageIndex
            ),
          };
        }
        return container;
      })
    );
  };

  const handleInputChange = (index, field, value) => {
    setContainers((prev) =>
      prev.map((container, i) => {
        if (i === index) {
          return { ...container, [field]: value };
        }
        return container;
      })
    );
  };

  const handleUpload = (index) => {
    const container = containers[index];
    if (container.selectedImages.length > 0) {
      console.log(`Container ${index + 1}`);
      console.log('Title:', container.title);
      console.log('Description:', container.description);
      console.log('Images:', container.selectedImages);
      alert(`Data container ${index + 1} berhasil diupload!`);
    } else {
      alert(`Container ${index + 1} belum memiliki gambar.`);
    }
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div
      className="grid grid-cols-3 gap-6 p-4"
      style={{ margin: '0 auto', maxWidth: '1200px' }}
    >
      {containers.map((container, index) => (
        <div
          key={`container-${index}`}
          className={`w-80 h-auto p-4 shadow rounded-lg bg-gray-100 ${
            index < 3 ? 'mt-20' : ''
          }`} 
        >
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, index)}
            multiple
            className="mb-4 block w-full text-sm text-gray-600 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
          />

          {container.selectedImages.length > 0 && (
            <div className="mb-2" style={{ width: '300px', height: '200px' }}>
              <Slider {...settings}>
                {container.selectedImages.map((image, imageIndex) => (
                  <div
                    key={`slider-${index}-${imageIndex}`}
                    className="relative"
                    style={{ width: '300px', height: '150px' }}
                  >
                    <button
                      onClick={() =>
                        handleRemoveImage(index, imageIndex)
                      }
                      className="absolute top-2 right-2 text-white bg-black bg-opacity-50 hover:bg-opacity-80 rounded-full w-6 h-6 flex items-center justify-center text-sm"
                    >
                      <span className="font-bold text-xs">×</span>
                    </button>
                    <img
                      src={image}
                      alt={`Preview ${imageIndex}`}
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

          <div className="mb-4">
            <input
              id={`title-${index}`}
              type="text"
              value={container.title}
              onChange={(e) =>
                handleInputChange(index, 'title', e.target.value)
              }
              className="block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Masukkan judul"
            />
          </div>

          <div className="mb-4">
            <textarea
              id={`description-${index}`}
              value={container.description}
              onChange={(e) =>
                handleInputChange(index, 'description', e.target.value)
              }
              className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Masukkan deskripsi"
              rows={3}
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => handleUpload(index)}
              className="bg-black hover:bg-gray-400 text-white py-2 px-4 rounded-lg"
            >
              Upload
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EditFoto;
