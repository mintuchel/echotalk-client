export type Chat = {
  chat_id: string;
  chat_name: string;
}

export type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
}