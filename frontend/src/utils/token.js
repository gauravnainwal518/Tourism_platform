import { jwtDecode } from "jwt-decode";


export const getToken = () => localStorage.getItem("token");

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const removeToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("userData");
};

export const setUserData = (user) => {
  if (user) {
    localStorage.setItem("userData", JSON.stringify(user));
    if (user.role) {
      localStorage.setItem("role", user.role);
    }
  }
};

export const getUserData = () => {
  const data = localStorage.getItem("userData");
  return data ? JSON.parse(data) : null;
};

export const isTokenExpired = () => {
  const token = getToken();
  if (!token) return true;

  try {
    const { exp } = jwtDecode(token);
    return Date.now() >= exp * 1000;
  } catch (err) {
    console.error("Token decode failed:", err);
    return true;
  }
};
