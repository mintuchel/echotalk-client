import axios from "axios";

export const sendMessageToBot = async (id: string, question: string) => {
    const response = await axios.post("http://localhost:8000/message",
        {
            id,
            question
        },
    );

    return response.data.answer;
}