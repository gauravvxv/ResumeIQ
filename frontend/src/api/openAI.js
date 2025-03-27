import axios from "axios";

const openAI_key = import.meta.env.openAI_key;
export const analyzeResume = async(resumeText) => {
    try {
        const res = await axios.post(`https://api.openai.com/v1/chat/completions`,{
            model: 'gpt-4',
            message: [
                {role: "system", content: "You are an expert resume reviewer."},
                {role: 'user', content: `Analyze this resume:\n${resumeText}`},
                { role: "user", content: "Give a score from 1 to 10 based on resume quality." },
                { role: "user", content: "Check if this resume is ATS-friendly. Answer with 'Yes' or 'No'." }
            ]
        },
        {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${openAI_key}`
            }
        }
    );

    const analysis = res.data.choices[0].message.content;

    const scoreMatch = analysis.match(/Score: (\d+)/i);
    const atsMatch = analysis.match(/ATS-friendly:\s*(Yes|No)/i);

    return {
        analysis: analysis,
        score: scoreMatch? parseInt(scoreMatch[1]): "N/A",
        atsFriendly: atsMatch ? atsMatch[1]: 'Unknown'
    }
    } catch (error) {
        console.error("Error analyzing resume:", error);
        return "An error occurred while analyzing the resume.";
    }
}