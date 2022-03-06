const env = "dev";

const url = env === "dev" ? "http://localhost:8000/api/v1" : "";
export const api = {
  baseURL: url,
  getChat: "/chat",
  signUp: "/auth/register",
  signIn: "/auth/login",
  getUserDetail: "/user/userDetails",
};
