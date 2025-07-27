// src/reportanalyzer/ReportUploader.jsx
import React, { useState } from "react";
import axios from "axios";

const ReportUploader = ({ setAnalysisResult }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please upload a file");

    const formData = new FormData();
    formData.append("report", file);

    try {
      const res = await axios.post("http://localhost:5000/api/report/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setAnalysisResult(res.data.analysis);
    } catch (err) {
      setAnalysisResult("Error analyzing report. Make sure backend is running.");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="file" accept=".pdf,.png,.jpg" onChange={handleFileChange} className="block" />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Analyze</button>
    </form>
  );
};

export default ReportUploader;
