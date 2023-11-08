import { useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import "./App.css";

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    internshipRole: "Web Developer", // Default value set to "Web Developer"
    joiningDate: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const createAndDownloadOfferLetter = () => {
    axios
      .post("https://pdf-generator-a0y2.onrender.com/create-pdf", formData)
      .then(() =>
        axios.get("https://pdf-generator-a0y2.onrender.com/fetch-pdf", {
          responseType: "blob",
        })
      )
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });
        saveAs(pdfBlob, "OfferLetter.pdf");
      });
  };

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <select
        name="internshipRole"
        value={formData.internshipRole}
        onChange={handleChange}
      >
        <option value="Web Developer">Web Developer</option>
        <option value="App Developer">App Developer</option>
      </select>
      <input
        type="date"
        placeholder="Joining Date"
        name="joiningDate"
        value={formData.joiningDate}
        onChange={handleChange}
      />
      <button onClick={createAndDownloadOfferLetter}>
        Generate Offer Letter
      </button>
    </div>
  );
};

export default App;
