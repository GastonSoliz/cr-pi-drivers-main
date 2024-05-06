const { CLOUD_NAME, CLOUD_KEY, CLOUD_SECRET } = process.env;
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_KEY,
  api_secret: CLOUD_SECRET,
});

export const cloudController = async (img: string) => {
  const cloudInfo = await cloudinary.uploader.upload(img, {
    folder: "uploads",
  });
  console.log("cloudinfo:", cloudInfo);
  return cloudInfo;
};
