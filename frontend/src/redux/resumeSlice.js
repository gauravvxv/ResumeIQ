import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { analyzeResume } from "../api/openAI";

export const fetchResume = createAsyncThunk(
    "resume/analyze",
    async(resumeText) =>{
   return await analyzeResume(resumeText)
    }
);

const resumeSlice = createSlice({
    name: "resume",
    initialState:{
        analysis: "",
        score: "",
        atsFriendly: "",
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(fetchResume.pending , (state)=>{
            state.loading = true,
            state.error =  null
        }),
        builder.addCase(fetchResume.fulfilled, (state,action) =>{
            state.loading = false,
            state.analysis = action.payload.analysis,
            state.score = action.payload.score,
            state.atsFriendly = action.payload.atsFriendly
        }),
        builder.addCase(fetchResume.rejected, (state)=>{
            state.loading = false,
            state.error = "Failed to analyze resume."
        })
    }
})

export default resumeSlice.reducer;