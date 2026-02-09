// Replaced direct SDK call with Backend API call
const API_URL = 'http://localhost:8080/api/ai';

export const evaluateCodeWithAI = async (problemTitle, problemDesc, code) => {
    try {
        const response = await fetch(`${API_URL}/evaluate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                problemTitle,
                problemDesc,
                userCode: code
            })
        });

        if (!response.ok) {
            throw new Error('Backend service error');
        }

        return await response.json();
    } catch (error) {
        console.error("Evaluation Error:", error);
        return {
            status: 'Runtime Error',
            message: 'Evaluation service unavailable',
            feedback: 'Please ensure the Java backend is running on port 8080. Error: ' + error.message
        };
    }
};

export const getAIHint = async (problemTitle, problemDesc, userCode) => {
    try {
        const response = await fetch(`${API_URL}/hint`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                problemTitle,
                problemDesc,
                userCode
            })
        });

        if (!response.ok) {
            throw new Error('Backend service error');
        }

        const text = await response.text();
        return text;
    } catch (error) {
        return "Please ensure the Java backend is running. " + error.message;
    }
};

export const sendChatMessage = async (message, context = {}) => {
    try {
        const response = await fetch(`${API_URL}/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message,
                problemTitle: context.problemTitle,
                problemDesc: context.problemDesc
            })
        });

        if (!response.ok) {
            throw new Error('Backend service error');
        }

        const data = await response.json();
        return data.response;
    } catch (error) {
        return "Error connecting to AI Bot: " + error.message;
    }
};
