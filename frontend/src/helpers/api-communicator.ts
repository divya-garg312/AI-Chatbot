import axios from "axios";

// Helper to add the Authorization header to authenticated requests
const authHeader = () => {
  const token = localStorage.getItem("authToken"); // Ensure token is stored in localStorage
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const loginUser = async (email: string, password: string) => {
  const res = await axios.post("/user/login", { email, password });
  if (res.status !== 200) {
    throw new Error("Unable to login");
  }
  const data = res.data;
  localStorage.setItem("authToken", data.token); // Save token to localStorage
  return data.user;
};

export const signupUser = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await axios.post("/user/signup", { name, email, password });
  if (res.status !== 201) {
    throw new Error("Unable to Signup");
  }
  const data = res.data;
  localStorage.setItem("authToken", data.token); // Save token to localStorage
  return data.user;
};

export const checkAuthStatus = async () => {
  const res = await axios.get("/user/auth-status", { headers: authHeader() });
  if (res.status !== 200) {
    throw new Error("Unable to authenticate");
  }
  return res.data;
};

// export const sendChatRequest = async (message: string) => {
//   const res = await axios.post("/chat/new", { message }, { headers: authHeader() });
//   if (res.status !== 200) {
//     throw new Error("Unable to send chat");
//   }
//   return res.data;
// };
export const sendChatRequest = async (message: string) => {
  try {
      const res = await axios.post("/chat/new", { message }, { headers: authHeader() });
      return res.data; // Return only if successful
  } catch (error: any) {
      console.error("Error in sendChatRequest:", error.response?.data || error.message);
      throw new Error("Unable to send chat");
  }
};


export const getUserChats = async () => {
  const res = await axios.get("/chat/all-chats", { headers: authHeader() });
  if (res.status !== 200) {
    throw new Error("Unable to fetch chats");
  }
  return res.data;
};

export const deleteUserChats = async () => {
  const res = await axios.delete("/chat/delete", { headers: authHeader() });
  if (res.status !== 200) {
    throw new Error("Unable to delete chats");
  }
  return res.data;
};

export const logoutUser = async () => {
  const res = await axios.get("/user/logout", { headers: authHeader() });
  if (res.status !== 200) {
    throw new Error("Unable to logout");
  }
  localStorage.removeItem("authToken"); // Clear token on logout
  return res.data;
};
