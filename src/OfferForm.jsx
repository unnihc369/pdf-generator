import { useState } from "react";
import axios from "axios";

const OfferForm = () => {
  const [name, setName] = useState("");

  const generatePDF = () => {
    axios
      .post("https://offer-letter-generator-b5io.onrender.com/generate-pdf", {
        name,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Download Your Offerletter</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={generatePDF} 
        >Generate PDF
      </button>
    </div>
  );
};

export default OfferForm;
