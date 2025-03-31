import './AddOneSoundForm.scss';
import { useState } from "react";
import { API_URL } from '../../utils/constants';
import axios from "axios";

function AddOneSoundForm( {categories} ) {
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    categoryId: "",
    price: "",
  });

  console.log(categories);

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreviewURL(URL.createObjectURL(selectedFile));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
  
    if (!file || !formData.name) return alert("Nom et fichier requis !");
  
    const formDataToSend = new FormData();
    formDataToSend.append("audio", file);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("categoryId", formData.categoryId);
    formDataToSend.append("price", formData.price);
  
    try {
      setUploadStatus("📤 Envoi du fichier...");
      setUploadProgress(0);
  
      let backendDone = false;
  
      const response = await axios.post(`${API_URL}/api/sounds`, formDataToSend, {
        onUploadProgress: (progressEvent) => {
          const frontendProgress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          // Ne dépasse pas 90% tant que le backend n’a pas répondu
          if (!backendDone) {
            setUploadProgress(Math.min(frontendProgress, 50));
          }
        },
      });
  
      // On est ici quand le backend a fini toute la chaîne :
      // - preview généré
      // - Firebase upload complet
      // - MongoDB save
  
      backendDone = true;
      setUploadProgress(100);
      setUploadStatus("✅ Upload terminé !");
  
      alert("Son enregistré avec succès !");
      setFormData({ name: "", description: "", categoryId: "", price: "" });
      setFile(null);
      setPreviewURL(null);
  
      // Reset tout après une pause
      setTimeout(() => {
        setUploadProgress(0);
        setUploadStatus("");
      }, 1000);
  
    } catch (err) {
      console.error("❌ Erreur backend :", err.response?.data || err.message);
      alert("Erreur lors de l’envoi au backend");
      setUploadStatus("❌ Échec de l'upload");
    }
  };

  return (
    <div className="edit">
      <form onSubmit={handleUpload}>
        <h2>Ajouter un son</h2>

        <input
          type="text"
          name="name"
          placeholder="Nom du son"
          value={formData.name}
          onChange={handleInputChange}
          required
        /><br />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
        /><br />

        <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleInputChange}
            required
            >
            <option value="">-- Choisir une catégorie --</option>
            {categories.map((cat) => (
                
                <option key={cat._id} value={cat._id}>
                {cat.name}
                </option>
            ))}
        </select>
        <br />

        <input
          type="number"
          name="price"
          placeholder="Prix (€)"
          value={formData.price}
          onChange={handleInputChange}
        /><br />

        <input type="file" accept="audio/*" onChange={handleFileChange} required /><br />

        {previewURL && (
          <div>
            <p>Pré-écoute :</p>
            <audio controls src={previewURL}></audio>
          </div>
        )}

        <button type="submit">Uploader</button>

        {uploadStatus && <p>{uploadStatus}</p>}

          {uploadProgress > 0 && (
            <div>
              <progress value={uploadProgress} max="100" />
              <p>{uploadProgress}%</p>
            </div>
          )}
      </form>
    </div>
  );
}

export default AddOneSoundForm;