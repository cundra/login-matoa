import React, { useState, useEffect } from "react";
import axios from "axios";

const EditAbout = () => {
  const [description, setDescription] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [clients, setClients] = useState("");

  // Fetch data saat komponen dimuat
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token"); // Ambil token dari localStorage
        const response = await axios.get("http://localhost:8000/api/get-about", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("API Response:", response.data); // Debug log respons API

        const fetchedData = response.data.data;
        if (fetchedData && fetchedData.length > 0) {
          const data = fetchedData[0]; // Ambil data pertama dari respons

          // Isi state dengan data yang diambil dari API
          setDescription(data.description || ""); // Isi deskripsi
          setWhatsappUrl(data.whatsapp || ""); // Isi URL WhatsApp
          setInstagramUrl(data.instagram || ""); // Isi URL Instagram
          setClients(data.clients || ""); // Isi clients sebagai string
        } else {
          console.warn("Data tidak ditemukan dalam respons API");
        }
      } catch (error) {
        console.error("Error fetching data:", error); // Debug log jika terjadi kesalahan
        alert("Gagal mengambil data dari server.");
      }
    };

    fetchData(); // Panggil fungsi fetch data
  }, []);

  // Fungsi untuk upload data ke API
  const handleUpload = async () => {
    const clientsArray = clients
      .split(",")
      .map((client) => client.trim())
      .filter(Boolean); // Pecah string clients menjadi array

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8000/api/about/update-desc",
        {
          description,
          whatsapp: whatsappUrl,
          instagram: instagramUrl,
          clients: clientsArray,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Data berhasil diupload!");
      }
    } catch (error) {
      console.error("Error uploading data:", error);
      alert("Gagal mengupload data.");
    }
  };

  return (
    <div
      className="p-8 w-full flex flex-col justify-start border-30 rounded-lg"
      style={{
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        marginTop: "70px",
      }}
    >
      <div className="w-full">
        {/* Form untuk Deskripsi */}
        <div className="mb-4 w-full">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Deskripsi
          </label>
          <textarea
            id="description"
            value={description} // Terhubung ke state
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Masukkan deskripsi"
            rows={4}
          />
        </div>

        {/* Input URL WhatsApp */}
        <div className="mb-4 w-full">
          <label
            htmlFor="whatsapp"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            URL WhatsApp
          </label>
          <input
            id="whatsapp"
            type="text"
            value={whatsappUrl} // Terhubung ke state
            onChange={(e) => setWhatsappUrl(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Masukkan URL WhatsApp"
          />
        </div>

        {/* Input URL Instagram */}
        <div className="mb-4 w-full">
          <label
            htmlFor="instagram"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            URL Instagram
          </label>
          <input
            id="instagram"
            type="text"
            value={instagramUrl} // Terhubung ke state
            onChange={(e) => setInstagramUrl(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Masukkan URL Instagram"
          />
        </div>

        {/* Input Clients */}
        <div className="mb-4 w-full">
          <label
            htmlFor="clients"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Client (pisahkan dengan koma)
          </label>
          <input
            id="clients"
            type="text"
            value={clients} // Terhubung ke state
            onChange={(e) => setClients(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Masukkan nama client, pisahkan dengan koma"
          />
        </div>
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
