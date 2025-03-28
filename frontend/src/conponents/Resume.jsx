import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchResume } from "../redux/resumeSlice";
import { extractTextFromPDF } from "./Pdf";

const Resume = () => {
  const dispatch = useDispatch();
  const { analysis, score, atsFriendly, loading, error } = useSelector((state) => state.resume);
  
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "application/pdf") {
      alert("Please upload a valid PDF file.");
      return;
    }

    try {
      const text = await extractTextFromPDF(file);
      console.log("Extracted Resume Text:", text);
      dispatch(fetchResume(text)); // Dispatch extracted text for analysis
    } catch (error) {
      console.error("Error extracting text:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-2xl font-bold text-center text-blue-600">Resume Analyzer</h1>

      {/* File Upload */}
      <input type="file" accept="application/pdf" onChange={handleFileUpload} className="mt-4 w-full p-2 border rounded-md" />

      {loading && <p className="text-blue-500 mt-2">Analyzing...</p>}
      {error && <p className="text-red-500 mt-2">{error}</p>}

      {analysis && (
        <div className="mt-6 p-4 border rounded-md bg-gray-100">
          <h2 className="text-lg font-semibold">Analysis Report:</h2>
          <p className="mt-2 text-gray-700">{analysis}</p>
        </div>
      )}

      {score && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Score: <span className="text-green-600">{score}/10</span></h2>
        </div>
      )}

      {atsFriendly && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">
            ATS Friendly: <span className={atsFriendly === "Yes" ? "text-green-600" : "text-red-600"}>{atsFriendly}</span>
          </h2>
        </div>
      )}
    </div>
  );
};

export default Resume;
