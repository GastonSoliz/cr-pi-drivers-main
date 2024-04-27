import axios from "axios";
const { SECRET_KEY } = process.env;

export const validateCaptcha = async (token: string) => {
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${token}`;

  const { data } = await axios.post(url);
  return data;
};
