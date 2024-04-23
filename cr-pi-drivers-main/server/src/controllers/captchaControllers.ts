import axios from "axios";

export const validateCaptcha = async (token: string) => {
  const secretKey = "6Le368MpAAAAAOaq294Kit3X4Rtw3ogrDAnuK0sE";
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

  const { data } = await axios.post(url);
  return data;
};
