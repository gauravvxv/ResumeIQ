import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchResume } from "../redux/resumeSlice"
import PdfParse from "pdf-parse"

const Resume = () => {
    const dispatch = useDispatch();
    const {analysis , score, atsFriendly, loading , error} = useSelector((state)=>state.resume);
    const [resumeText , setResumeText] = useState("");

    const handleAnalyze = () => {
      if(resumeText.trim()==="") return;
      dispatch(fetchResume(resumeText));

    }

    const handleFileUpload = async(e)=>{
   const file = e.target.files[0];
   if(!file || file.type !== "application/pdf"){
    alert("Please upload a pdg file");
    return;
   }
   
   const reader = new FileReader();
   reader.onload = async() => {
     const pdfFile = await PdfParse(reader.result);
     setResumeText(pdfFile.text) 
    }

    reader.readAsArrayBuffer(file);
  }

  return (
    <div>
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-2xl font-bold text-center text-blue-600">Resume Analyzer</h1>

      {/* File Upload */}
      <input type="file" accept="application/pdf" onChange={handleFileUpload} className="mt-4 w-full p-2 border rounded-md" />

      {/* Textarea for Manual Input */}
      <textarea
        className="w-full p-3 mt-4 border rounded-md"
        rows="6"
        placeholder="Paste your resume here or upload a file..."
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
      />

      <button
        onClick={handleAnalyze}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>

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
    </div>
  )
}

export default Resume
