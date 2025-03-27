import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { analyzeResume } from "../api/openAI";

export const fetchResume = createAsyncThunk(
    "resume/analyze",
    async(resumeText) =>{
   return await analyzeResume(resumeText)
    }
);

