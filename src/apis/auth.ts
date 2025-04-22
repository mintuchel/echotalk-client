import axios from "axios";

export const login = async (email: string, password: string) => {
  const response = await axios.post("http://localhost:8000/auth/login",
    { email, password },
    { withCredentials: true }
  );
  
  return response.data;
};

export const signup = async (name: string, email: string, password: string) => {
  const response = await axios.post("http://localhost:8000/auth/signup", {
    name,
    email,
    password,
  });

  return response.data;
};
