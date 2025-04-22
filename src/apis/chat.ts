import axios from "axios";
import { Chat } from "@/types/models";

export const getChatList = async (): Promise<Chat[]> => {
    const response = await axios.get("http://localhost:8000/chat", {
    withCredentials: true,
  });
  return response.data;
};

export const createChat = async (): Promise<{ id: string }> => {
    const response = await axios.post("http://localhost:8000/chat", {}, {
    withCredentials: true,
  });
  return response.data;
};

export const getChatMessages = async (id: string) => {
  const response = await axios.get(`http://localhost:8000/chat/${id}`, {
    withCredentials: true,
  });
  return response.data.messages;
};