import axios from "axios";

export const sendMessageToBot = async (chat_id: string, question: string) => {
    const response = await axios.post("http://localhost:8000/message",
        {
            chat_id,
            question
        },
    );

    return response.data.answer;
}