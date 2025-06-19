import {jwtDecode} from "jwt-decode";


export const getUserIdFromToken = (): string | null => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode<any>(token);
    return decoded;
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};
