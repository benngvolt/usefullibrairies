import './AddOneCategoryForm.scss';
import { useState } from "react";
import { API_URL } from '../../utils/constants';
import axios from "axios";

function AddOneCategoryForm() {
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

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
    if (!file || !formData.name) return alert("Nom et image requis !");

    const formDataToSend = new FormData();
    formDataToSend.append("image", file); // "image" = .single("image") côté backend
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);

    try {
      const response = await axios.post(`${API_URL}/api/categories`, formDataToSend);
      alert("✅ Catégorie enregistrée !");
      setFormData({ name: "", description: "" });
      setFile(null);
      setPreviewURL(null);
    } catch (err) {
      console.error("❌ Erreur backend :", err.response?.data || err.message);
      alert("Erreur lors de l’upload.");
    }
  };

  return (
    <div className="edit">
      <form onSubmit={handleUpload}>
        <h2>Ajouter une catégorie</h2>

        <input
          type="text"
          name="name"
          placeholder="Nom de la catégorie"
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

        <input type="file" accept="image/*" onChange={handleFileChange} required /><br />

        {previewURL && (
          <div>
            <p>Prévisualisation :</p>
            <img src={previewURL} alt="Aperçu" style={{ maxWidth: "200px" }} />
          </div>
        )}

        <button type="submit">Uploader</button>
      </form>
    </div>
  );
}

export default AddOneCategoryForm;
