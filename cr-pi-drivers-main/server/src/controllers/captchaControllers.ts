import axios from "axios";
import { CaptchaRequest } from "../types/types";
const { SECRET_KEY } = process.env;

export const validateCaptcha = async (token: string) => {
  console.log("aca", SECRET_KEY);
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${token}`;

  const { data } = await axios.post(url);
  console.log("controller:", data);
  return data;
};
