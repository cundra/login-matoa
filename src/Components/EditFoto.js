import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import axios from 'axios';

const EditFoto = () => {
  const [containers, setContainers] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);


  // Fetch data dari API saat komponen dimuat
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/api/get-content', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const fetchedData = response.data.data;
        if (Array.isArray(fetchedData)) {
          const updatedData = fetchedData.map((item) => ({
            ...item,
            selectedImages: (item.images || []).map((img) => ({
              file: null, // Gambar dari API tidak memiliki file
              preview: `http://localhost:8000${img.url}`, // URL gambar
              id: img.id, // Tambahkan ID gambar
            })),
          }));
          setContainers(updatedData);
        } else {
          console.warn('Fetched data is not an array:', fetchedData);
          setContainers([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setContainers([]);
      }
    };

    fetchData();
  }, []);

  // Fungsi untuk menangani upload gambar
  const handleImageChange = (event, index) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => ({
      file, // Simpan objek file asli
      preview: URL.createObjectURL(file), // Buat URL sementara untuk preview
    }));

    setContainers((prev) =>
      prev.map((container, i) => {
        if (i === index) {
          return {
            ...container,
            selectedImages: [...container.selectedImages, ...newImages].slice(0, 5), // Maksimal 5 gambar
          };
        }
        return container;
      })
    );
  };

  // Fungsi untuk menghapus gambar
  const handleRemoveImage = async (containerIndex, imageIndex) => {
    const removedImage = containers[containerIndex].selectedImages[imageIndex];
    console.log('Removing image:', removedImage);
    
    // Periksa apakah itu gambar dari API
    if (removedImage.file === null && removedImage.id) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`http://localhost:8000/api/content/image/${removedImage.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.status === 200) {
          alert(response.data.message);
          
          // Hapus dari state lokal setelah berhasil dari backend
          setContainers((prev) =>
            prev.map((container, i) => {
              if (i === containerIndex) {
                return {
                  ...container,
                  selectedImages: container.selectedImages.filter((_, j) => j !== imageIndex),
                };
              }
              return container;
            })
          );
        }
        console.log('Response:', response.data);
      } catch (error) {
        console.error('Error deleting image:', error);
        alert('Gagal menghapus gambar.');
      }
    } else {
      // Jika itu gambar baru (belum ada di backend), cukup hapus dari state lokal
      setContainers((prev) =>
        prev.map((container, i) => {
          if (i === containerIndex) {
            return {
              ...container,
              selectedImages: container.selectedImages.filter((_, j) => j !== imageIndex),
            };
          }
          return container;
        })
      );
    }
  };
  
  
  
  
  

  // Fungsi untuk menangani perubahan input
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

  // Fungsi untuk mengirim data ke API
  const handleUpload = async (index) => {
    const container = containers[index];
    if (!container.title || !container.description) {
      alert('Title dan Description harus diisi.');
      return;
    }
  
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('title', container.title);
    formData.append('description', container.description);
  
    // Tambahkan file asli ke FormData
    container.selectedImages.forEach(({ file }) => {
      if (file) {
        formData.append('image[]', file);
      }
    });
  
    // Tambahkan daftar gambar yang dihapus
    deletedImages.forEach((deletedImage) => {
      formData.append('deleted_images[]', deletedImage); // Gunakan key `deleted_images[]`
    });
  
    try {
      console.log('Deleted Images:', deletedImages); // Debug log
      const response = await axios.post(
        `http://localhost:8000/api/content/submit/${container.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200) {
        alert(`Data container ${index + 1} berhasil diupload!`);
        setDeletedImages([]); // Reset daftar gambar yang dihapus
      }
    } catch (error) {
      console.error('Error uploading data:', error);
      alert('Gagal mengupload data. Pastikan Anda sudah login.');
    }
  };
  
  
  
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (!Array.isArray(containers) || containers.length === 0) {
    return <div>Loading or no data available...</div>;
  }

 
  

  return (
    <div className="grid grid-cols-3 gap-6 p-4" style={{ margin: '0 auto', maxWidth: '1200px' }}>
      {containers.map((container, index) => (
        <div key={`container-${index}`} className="w-80 h-auto p-4 shadow rounded-lg bg-gray-100 mt-20">
          {/* Input File */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, index)}
            multiple
            className="mb-4 block w-full text-sm text-gray-600 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
          />

          {/* Slider Gambar */}
          {container.selectedImages.length > 0 && (
            <div className="mb-2" style={{ width: '300px', height: '200px' }}>
              <Slider {...settings}>
                {container.selectedImages.map(({ preview }, imageIndex) => (
                  <div
                    key={`slider-${index}-${imageIndex}`}
                    className="relative"
                    style={{ width: '300px', height: '150px' }}
                  >
                    <button
                      onClick={() => handleRemoveImage(index, imageIndex)}
                      className="absolute top-2 right-2 text-white bg-black bg-opacity-50 hover:bg-opacity-80 rounded-full w-6 h-6 flex items-center justify-center text-sm"
                    >
                      <span className="font-bold text-xs">×</span>
                    </button>
                    <img
                      src={preview}
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

          {/* Input Title */}
          <div className="mb-4">
            <input
              id={`title-${index}`}
              type="text"
              value={container.title || ''}
              onChange={(e) => handleInputChange(index, 'title', e.target.value)}
              className="block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Masukkan judul"
            />
          </div>

          {/* Input Description */}
          <div className="mb-4">
            <textarea
              id={`description-${index}`}
              value={container.description || ''}
              onChange={(e) => handleInputChange(index, 'description', e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Masukkan deskripsi"
              rows={3}
            />
          </div>

          {/* Tombol Submit */}
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
