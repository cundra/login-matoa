import React, { useState } from 'react';

const EditAbout = () => {
  const [description, setDescription] = useState('');
  const [whatsappUrl, setWhatsappUrl] = useState(''); // State untuk URL WhatsApp
  const [instagramUrl, setInstagramUrl] = useState(''); // State untuk URL Instagram
  const [columns, setColumns] = useState([{ client: '' }]); 

  const handleColumnChange = (index, value) => {
    const newColumns = [...columns];
    newColumns[index].client = value;
    setColumns(newColumns);

    // Menambahkan kolom baru hanya jika kolom client diisi
    if (value && !newColumns[index + 1]) {
      newColumns.push({ client: '' });
      setColumns(newColumns);
    }
  };

  const handleRemoveColumn = (index) => {
    if (columns.length > 1) {
      const newColumns = columns.filter((_, i) => i !== index);
      setColumns(newColumns);
    }
  };

  const handleUpload = () => {
    console.log('Form Data:', { description, whatsappUrl, instagramUrl, columns });
    alert('Data berhasil diupload!');
  };

  return (
    <div className="p-8 w-full flex flex-col justify-start border-30 rounded-lg" style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', marginTop: '70px' }}>
      <div className="w-full">
        {/* Form untuk Deskripsi */}
        <div className="mb-4 w-full">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Deskripsi
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Masukkan deskripsi"
            rows={4}
          />
        </div>

        {/* Input URL WhatsApp */}
        <div className="mb-4 w-full">
          <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-2">
            URL WhatsApp
          </label>
          <input
            id="whatsapp"
            type="text"
            value={whatsappUrl}
            onChange={(e) => setWhatsappUrl(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Masukkan URL WhatsApp"
          />
        </div>

        {/* Input URL Instagram */}
        <div className="mb-4 w-full">
          <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 mb-2">
            URL Instagram
          </label>
          <input
            id="instagram"
            type="text"
            value={instagramUrl}
            onChange={(e) => setInstagramUrl(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Masukkan URL Instagram"
          />
        </div>

        {/* Label untuk Client */}
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Client
        </label>

        {/* Loop untuk render kolom client */}
        {columns.map((column, index) => (
          <div key={index} className="mb-4 w-full">
            <div className="flex items-center">
              {/* Kolom Client */}
              <div className="mr-2 w-full">
                <input
                  id={`client-${index}`}
                  type="text"
                  value={column.client}
                  onChange={(e) => handleColumnChange(index, e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Masukkan nama client"
                />
              </div>

              {/* Tombol X untuk menghapus kolom */}
              {index > 0 && column.client && (
                <button
                  onClick={() => handleRemoveColumn(index)}
                  className="text-red-500 ml-2"
                  style={{ fontSize: '20px' }}
                >
                  ×
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Tombol Upload */}
      <div className="flex justify-end mt-8 w-full">
        <button
          onClick={handleUpload}
          className="bg-black text-white py-2 px-6 rounded-lg hover:bg-gray-700"
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default EditAbout;
