import { jwtDecode } from "jwt-decode";

interface ExtendedJwtPayload {
  role: string;
  // include other properties if needed
}

export const verifyToken = (token: string): ExtendedJwtPayload  => {
  return jwtDecode<ExtendedJwtPayload>(token);
};
