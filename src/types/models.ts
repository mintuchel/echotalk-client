export type Chat = {
  id: string;
  name: string;
}

export type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
}