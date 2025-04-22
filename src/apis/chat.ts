import axios from "axios";
import { Chat } from "@/types/models";

export const createChat = async (): Promise<{ id: string }> => {
  const response = await axios.post("http://localhost:8000/chat",
    { withCredentials: true, }
  );
  return response.data;
};

export const updateChatName = async (id: string, name: string) => {
    const response = await axios.patch("http://localhost:8000/chat",
        {
            id: id,
            name: name,
        },
        { withCredentials: true, }
    );

    return response;
}

export const deleteChat = async (id: string) => {
  const response = await axios.delete(`http://localhost:8000/chat/${id}`,
    { withCredentials: true, }
  );

  return response.data;
}

export const getChatList = async (): Promise<Chat[]> => {
  const response = await axios.get("http://localhost:8000/chat",
    { withCredentials: true, }
  );
  return response.data;
};

export const getChatMessages = async (id: string) => {
  const response = await axios.get(`http://localhost:8000/chat/${id}`,
    { withCredentials: true, }
  );
  return response.data.messages;
};