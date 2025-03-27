import axios from "axios";

const openAI_key = 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

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